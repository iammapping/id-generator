"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var redis_1 = require("redis");
var IdRedisResponse_1 = require("./redis/IdRedisResponse");
var RedisPromise = (function () {
    function RedisPromise(redisConfig) {
        this.redis = redis_1.createClient(redisConfig);
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
            _this.redis.evalsha(luaScriptSha, [keys.length].concat(keys, args), function (err, res) {
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
    return RedisPromise;
}());
exports.RedisPromise = RedisPromise;
