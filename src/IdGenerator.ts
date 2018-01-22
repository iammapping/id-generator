import { SnowFlakeCombiner } from './combiner/SnowFlakeCombiner';
import { resolve, join } from 'path';
import { readFile } from 'fs';
import * as crypto from 'crypto';
import * as Promise from 'bluebird';
// import * as RawBigNumber from "bignumber.js";
// import BigNum from "bignum";
import { Redis } from './redis/Redis';
import { IdRedisResponse } from './redis/IdRedisResponse';
import { RoundRobinRedisPool } from './redis/RoundRobinRedisPool';
import { Combiner } from "./combiner/Combiner";
import { Id } from "./ids/Id";
import { ONE_SECOND_IN_MILLIS, ONE_MILLI_IN_MICRO_SECS } from './Consts';

export class IdGenerator<T> {

  private static readonly LUA_SCRIPT_RESOURCE_PATH: string = resolve(__dirname, "../lua/id-generator.lua");
  private static readonly DEFAULT_MAX_ATTEMPTS: number = 5;

  private roundRobinRedisPool: RoundRobinRedisPool;
  private combiner: Combiner<T>;
  private maximumAttempts: number;

  private luaScript: string;
  private luaScriptSha: string;

  public constructor(roundRobinRedisPool: RoundRobinRedisPool, combiner: Combiner<T> = <Combiner<T>><any>(new SnowFlakeCombiner()), maximumAttempts: number = IdGenerator.DEFAULT_MAX_ATTEMPTS) {
    this.roundRobinRedisPool = roundRobinRedisPool;
    this.combiner = combiner;
    this.maximumAttempts = maximumAttempts;
  }

  private loadLuaScript(): Promise<string> {
    if (this.luaScript) {
      return Promise.resolve(this.luaScript);
    } else {
      return new Promise<string>((resolve, reject) => {
        readFile(IdGenerator.LUA_SCRIPT_RESOURCE_PATH, 'utf8', (err, data) => {
          if (err) {
            return reject(err);
          }
          this.luaScript = data;
          resolve(data);
        });
      });
    }
  }

  private getLuaScriptSha(): Promise<string> {
    if (this.luaScriptSha) {
      return Promise.resolve(this.luaScriptSha);
    } else {
      return this.loadLuaScript().then(luaScript => {
        this.luaScriptSha = crypto.createHash('sha1').update(luaScript).digest('hex');
        return this.luaScriptSha;
      });
    }
  }

  /**
   * Generate an ID. It will try to generate an ID, retrying up to `maximumAttempts` times.
   *
   * @return An optional ID. It will be present if it was successful, and absent if for any reason the ID generation
   * failed even after the retries.
   */
  public generateId(): Promise<T> {
    return this.generateIdBatch(1).then((ids) => ids[0]);
  }

  /**
   * Generate a batch of IDs. It will try to generate a list of IDs, retrying up to `maximumAttempts` times.
   *
   * @param batchSize The number IDs to return.
   * @return An optional list of IDs. It will be present if it was successful, and absent if for any reason the ID generation
   * failed even after the retries. The number of IDs may be less than or equal to the batch size depending on if the
   * sequence needs to roll in Redis.
   */
  public generateIdBatch(batchSize: number = this.combiner.MAX_BATCH_SIZE): Promise<Array<T>> {
    let retries = 0;
    let ids: Array<T> = [];

    let exec = () => {
      return this.generateIdsUsingRedis(this.roundRobinRedisPool.getNextRedis(), batchSize, ids).catch(e => {
        retries++;
        if (retries <= this.maximumAttempts) {
          console.warn('Failed to generate ID. Underlying exception was: ', e);
          return Promise.delay(retries * retries).then(exec);
        } else {
          console.error('No ID generated. ID generation failed after %d retries.', this.maximumAttempts);
          ids = [];
          throw e;
        }
      });
    }

    return exec();
  }

  /**
   * Generate an ID using the given redis instance.
   *
   * @param redis The redis instance to use to generate an ID with.
   * @param batchSize The number IDs to return.
   * @return An optional list of IDs. It will be present if it was successful, and absent if for any reason the response was
   * null. The number of IDs may be less than or equal to the batch size depending on if the sequence needs to roll in Redis.
   */
  private generateIdsUsingRedis(redis: Redis, batchSize: number, ids: Array<T>): Promise<Array<T>> {
    let generated = 0;

    let exec = (remainingBatchSize: number) => {
      return this.executeOrLoadLuaScript(redis, remainingBatchSize).then(response => {
        if (!response) {
          throw new Error('No response returned from redis');
        }

        ids = ids.concat(this.combiner.toIds(response));
        let remaining = batchSize - ids.length;
        if (remaining > 0) {
          return exec(remaining);
        }

        return ids;
      });
    }

    return exec(batchSize);
  }

  /**
   * Try executing the Lua script using the SHA of its contents.
   *
   * If the Lua script hasn't been loaded before, we'll load it first and then try executing it again. This should
   * only need to be done once per version of the given Lua script. This guards against a Redis server being added
   * into the pool to help increase capacity, as the script will just be loaded again if missing.
   *
   * This also gives a performance gain:
   *
   *   * If the Lua script is already loaded, it's already parsed, tokenised and in memory. This is MUCH faster
   *     than loading it again every time using eval instead of evalsha.
   *   * If the script with this SHA was already loaded by another process, we can use it instead of loading it
   *     again, giving us a small performance gain.
   *
   * @param redis The redis instance to use to execute or load the Lua script with.
   * @param batchSize The number to increment the sequence by in Redis.
   * @return The result of executing the Lua script.
   */
  private executeOrLoadLuaScript(redis: Redis, batchSize: number): Promise<IdRedisResponse> {
    return this.executeLuaScript(redis, batchSize).catch((e) => {
      if (e.code != 'NOSCRIPT') {
        throw e;
      }

      // Load the lua script, if the script is not found
      return this.loadLuaScript().then(luaScript => {
        return redis.loadLuaScript(luaScript);
      }).then((sha) => {
        return this.executeLuaScript(redis, batchSize);
      });
    });
  }

  /**
   * Execute the ID generation Lua script on the given redis instance, returning the results.
   *
   * @param redis The redis instance to use to execute the Lua script with.
   * @param batchSize The number to increment the sequence by in Redis.
   * @return The optional result of executing the Lua script. Absent if the Lua script referenced by the SHA was missing
   * when it was attempted to be executed.
   */
  private executeLuaScript(redis: Redis, batchSize: number): Promise<IdRedisResponse> {
    return this.getLuaScriptSha().then(luaScriptSha => {
      return redis.time().then(time => {
        let millitimestamps: number = parseInt(time[0]) * ONE_SECOND_IN_MILLIS + Math.ceil(parseInt(time[1]) / ONE_MILLI_IN_MICRO_SECS)
        return redis.evalLuaScript(
          luaScriptSha, 
          [this.combiner.KEY_PREFIX],
          [String(millitimestamps), String(this.combiner.INTERVAL), String(this.combiner.MAX_SEQUENCE), String(batchSize)]
        );
      });
    });
  }
}