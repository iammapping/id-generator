import * as Promise from 'bluebird';
import { RoundRobinRedisPool } from './redis/RoundRobinRedisPool';
import { Combiner } from "./combiner/Combiner";
export declare class IdGenerator<T> {
    private static readonly LUA_SCRIPT_RESOURCE_PATH;
    private static readonly DEFAULT_MAX_ATTEMPTS;
    private roundRobinRedisPool;
    private combiner;
    private maximumAttempts;
    private luaScript;
    private luaScriptSha;
    constructor(roundRobinRedisPool: RoundRobinRedisPool, combiner?: Combiner<T>, maximumAttempts?: number);
    private loadLuaScript;
    private getLuaScriptSha;
    /**
     * Generate an ID. It will try to generate an ID, retrying up to `maximumAttempts` times.
     *
     * @return An optional ID. It will be present if it was successful, and absent if for any reason the ID generation
     * failed even after the retries.
     */
    generateId(): Promise<T>;
    /**
     * Generate a batch of IDs. It will try to generate a list of IDs, retrying up to `maximumAttempts` times.
     *
     * @param batchSize The number IDs to return.
     * @return An optional list of IDs. It will be present if it was successful, and absent if for any reason the ID generation
     * failed even after the retries. The number of IDs may be less than or equal to the batch size depending on if the
     * sequence needs to roll in Redis.
     */
    generateIdBatch(batchSize?: number): Promise<Array<T>>;
    /**
     * Generate an ID using the given redis instance.
     *
     * @param redis The redis instance to use to generate an ID with.
     * @param batchSize The number IDs to return.
     * @return An optional list of IDs. It will be present if it was successful, and absent if for any reason the response was
     * null. The number of IDs may be less than or equal to the batch size depending on if the sequence needs to roll in Redis.
     */
    private generateIdsUsingRedis;
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
    private executeOrLoadLuaScript;
    /**
     * Execute the ID generation Lua script on the given redis instance, returning the results.
     *
     * @param redis The redis instance to use to execute the Lua script with.
     * @param batchSize The number to increment the sequence by in Redis.
     * @return The optional result of executing the Lua script. Absent if the Lua script referenced by the SHA was missing
     * when it was attempted to be executed.
     */
    private executeLuaScript;
}
