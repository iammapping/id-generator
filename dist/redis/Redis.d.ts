/// <reference types="bluebird" />
import * as Promise from 'bluebird';
import { IdRedisResponse } from './IdRedisResponse';
export interface Redis {
    loadLuaScript(luaScript: string): Promise<string>;
    evalLuaScript(luaScriptSha: string, keys: Array<string>, args: Array<string>): Promise<IdRedisResponse>;
    time(): Promise<Array<string>>;
}
