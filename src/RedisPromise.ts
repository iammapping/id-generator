import * as Promise from 'bluebird';
import { createClient, RedisClient } from 'redis';
import { Redis } from './redis/Redis';
import { IdRedisResponse } from './redis/IdRedisResponse';

export class RedisPromise implements Redis {
    private redis: RedisClient;

    public constructor(redisConfig?: any) {
        this.redis = createClient(redisConfig);
    }

    public loadLuaScript(luaScript: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.redis.script('load', luaScript, (err, sha) => {
                if (err) {
                    return reject(err);
                }

                resolve(sha);
            });
        });
    }

    public evalLuaScript(luaScriptSha: string, keys: Array<string>, args: Array<string>): Promise<IdRedisResponse> {
        return new Promise<IdRedisResponse>((resolve, reject) => {
            this.redis.evalsha(luaScriptSha, [keys.length, ...keys, ...args], (err, res) => {
                if (err) {
                    return reject(err);
                }

                resolve(new IdRedisResponse(res));
            });
        });
    }

    public time(): Promise<Array<string>> {
        return new Promise<Array<string>>((resolve, reject) => {
            this.redis.time((err, time) => {
                if (err) {
                    return reject(err);
                }

                resolve(time);
            })
        });
    }
}