"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisPromise = void 0;
var Promise = require("bluebird");
var redis_1 = require("redis");
var IdRedisResponse_1 = require("./redis/IdRedisResponse");
var RedisPromise = /** @class */ (function () {
    function RedisPromise(redisConfig) {
        this.redis = (0, redis_1.createClient)(redisConfig);
    }
    RedisPromise.prototype.loadLuaScript = function (luaScript) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.redis.script('load', luaScript, function (err, sha) {
                if (err) {
                    return reject(err);
                }
                resolve(sha);
            });
        });
    };
    RedisPromise.prototype.evalLuaScript = function (luaScriptSha, keys, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.redis.evalsha(luaScriptSha, __spreadArray(__spreadArray([keys.length], keys, true), args, true), function (err, res) {
                if (err) {
                    return reject(err);
                }
                resolve(new IdRedisResponse_1.IdRedisResponse(res));
            });
        });
    };
    RedisPromise.prototype.time = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.redis.time(function (err, time) {
                if (err) {
                    return reject(err);
                }
                resolve(time);
            });
        });
    };
    RedisPromise.prototype.end = function () {
        this.redis.end(true);
    };
    return RedisPromise;
}());
exports.RedisPromise = RedisPromise;
