/// <reference types="bluebird" />
import * as Promise from 'bluebird';
import { Redis } from './redis/Redis';
import { IdRedisResponse } from './redis/IdRedisResponse';
export declare class RedisPromise implements Redis {
    private redis;
    constructor(redisConfig?: any);
    loadLuaScript(luaScript: string): Promise<string>;
    evalLuaScript(luaScriptSha: string, keys: Array<string>, args: Array<string>): Promise<IdRedisResponse>;
    time(): Promise<Array<string>>;
}
