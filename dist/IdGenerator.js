"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
var SnowFlakeCombiner_1 = require("./combiner/SnowFlakeCombiner");
var path_1 = require("path");
var fs_1 = require("fs");
var crypto = require("crypto");
var Promise = require("bluebird");
var Consts_1 = require("./Consts");
var IdGenerator = /** @class */ (function () {
    function IdGenerator(roundRobinRedisPool, combiner, maximumAttempts) {
        if (combiner === void 0) { combiner = (new SnowFlakeCombiner_1.SnowFlakeCombiner()); }
        if (maximumAttempts === void 0) { maximumAttempts = IdGenerator.DEFAULT_MAX_ATTEMPTS; }
        this.roundRobinRedisPool = roundRobinRedisPool;
        this.combiner = combiner;
        this.maximumAttempts = maximumAttempts;
    }
    IdGenerator.prototype.loadLuaScript = function () {
        var _this = this;
        if (this.luaScript) {
            return Promise.resolve(this.luaScript);
        }
        else {
            return new Promise(function (resolve, reject) {
                (0, fs_1.readFile)(IdGenerator.LUA_SCRIPT_RESOURCE_PATH, 'utf8', function (err, data) {
                    if (err) {
                        return reject(err);
                    }
                    _this.luaScript = data;
                    resolve(data);
                });
            });
        }
    };
    IdGenerator.prototype.getLuaScriptSha = function () {
        var _this = this;
        if (this.luaScriptSha) {
            return Promise.resolve(this.luaScriptSha);
        }
        else {
            return this.loadLuaScript().then(function (luaScript) {
                _this.luaScriptSha = crypto.createHash('sha1').update(luaScript).digest('hex');
                return _this.luaScriptSha;
            });
        }
    };
    /**
     * Generate an ID. It will try to generate an ID, retrying up to `maximumAttempts` times.
     *
     * @return An optional ID. It will be present if it was successful, and absent if for any reason the ID generation
     * failed even after the retries.
     */
    IdGenerator.prototype.generateId = function () {
        return this.generateIdBatch(1).then(function (ids) { return ids[0]; });
    };
    /**
     * Generate a batch of IDs. It will try to generate a list of IDs, retrying up to `maximumAttempts` times.
     *
     * @param batchSize The number IDs to return.
     * @return An optional list of IDs. It will be present if it was successful, and absent if for any reason the ID generation
     * failed even after the retries. The number of IDs may be less than or equal to the batch size depending on if the
     * sequence needs to roll in Redis.
     */
    IdGenerator.prototype.generateIdBatch = function (batchSize) {
        var _this = this;
        if (batchSize === void 0) { batchSize = this.combiner.MAX_BATCH_SIZE; }
        var retries = 0;
        var ids = [];
        var exec = function () {
            return _this.generateIdsUsingRedis(_this.roundRobinRedisPool.getNextRedis(), batchSize, ids).catch(function (e) {
                retries++;
                if (retries <= _this.maximumAttempts) {
                    console.warn('Failed to generate ID. Underlying exception was: ', e);
                    return Promise.delay(retries * retries).then(exec);
                }
                else {
                    console.error('No ID generated. ID generation failed after %d retries.', _this.maximumAttempts);
                    ids = [];
                    throw e;
                }
            });
        };
        return exec();
    };
    /**
     * Generate an ID using the given redis instance.
     *
     * @param redis The redis instance to use to generate an ID with.
     * @param batchSize The number IDs to return.
     * @return An optional list of IDs. It will be present if it was successful, and absent if for any reason the response was
     * null. The number of IDs may be less than or equal to the batch size depending on if the sequence needs to roll in Redis.
     */
    IdGenerator.prototype.generateIdsUsingRedis = function (redis, batchSize, ids) {
        var _this = this;
        var generated = 0;
        var exec = function (remainingBatchSize) {
            return _this.executeOrLoadLuaScript(redis, remainingBatchSize).then(function (response) {
                if (!response) {
                    throw new Error('No response returned from redis');
                }
                ids = ids.concat(_this.combiner.toIds(response));
                var remaining = batchSize - ids.length;
                if (remaining > 0) {
                    return exec(remaining);
                }
                return ids;
            });
        };
        return exec(batchSize);
    };
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
    IdGenerator.prototype.executeOrLoadLuaScript = function (redis, batchSize) {
        var _this = this;
        return this.executeLuaScript(redis, batchSize).catch(function (e) {
            if (e.code != 'NOSCRIPT') {
                throw e;
            }
            // Load the lua script, if the script is not found
            return _this.loadLuaScript().then(function (luaScript) {
                return redis.loadLuaScript(luaScript);
            }).then(function (sha) {
                return _this.executeLuaScript(redis, batchSize);
            });
        });
    };
    /**
     * Execute the ID generation Lua script on the given redis instance, returning the results.
     *
     * @param redis The redis instance to use to execute the Lua script with.
     * @param batchSize The number to increment the sequence by in Redis.
     * @return The optional result of executing the Lua script. Absent if the Lua script referenced by the SHA was missing
     * when it was attempted to be executed.
     */
    IdGenerator.prototype.executeLuaScript = function (redis, batchSize) {
        var _this = this;
        return this.getLuaScriptSha().then(function (luaScriptSha) {
            return redis.time().then(function (time) {
                var millitimestamps = parseInt(time[0]) * Consts_1.ONE_SECOND_IN_MILLIS + Math.ceil(parseInt(time[1]) / Consts_1.ONE_MILLI_IN_MICRO_SECS);
                return redis.evalLuaScript(luaScriptSha, [_this.combiner.KEY_PREFIX], [
                    String(millitimestamps),
                    String(_this.combiner.INTERVAL),
                    String(_this.combiner.OFFSET),
                    String(_this.combiner.MAX_SEQUENCE),
                    String(batchSize)
                ]);
            });
        });
    };
    IdGenerator.LUA_SCRIPT_RESOURCE_PATH = (0, path_1.resolve)(__dirname, "../lua/id-generator.lua");
    IdGenerator.DEFAULT_MAX_ATTEMPTS = 5;
    return IdGenerator;
}());
exports.IdGenerator = IdGenerator;
