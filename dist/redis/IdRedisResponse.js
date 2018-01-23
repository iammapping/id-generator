"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The response from the Icicle ID generation script.
 *
 * It has four fields, all equally important to generate an ID:
 *
 *   * Where sequence generation starts from
 *   * Where sequence generation ends
 *   * The logical shard ID
 *   * The current time in seconds
 *   * The current time in microseconds
 *
 * Create an instance of this by passing the result you get back from executing the Lua script with your chosen Redis
 * library.
 */
var IdRedisResponse = (function () {
    /**
     * Create an instance of the response from the ID generation Lua script.
     * @param results The list of long values returned by the Lua script. If this param is null, a NullPointerException
     *                will be thrown.
     */
    function IdRedisResponse(results) {
        this.startSequence = results[IdRedisResponse.START_SEQUENCE_INDEX];
        this.endSequence = results[IdRedisResponse.END_SEQUENCE_INDEX];
        this.hasHitTheTop = !!results[IdRedisResponse.HIT_THE_TOP_INDEX];
        this.logicalShardId = results[IdRedisResponse.LOGICAL_SHARD_ID_INDEX];
        this.timeMilliSeconds = results[IdRedisResponse.TIME_MILLISECONDS_INDEX];
        this.timezoneOffset = results[IdRedisResponse.TIMEZONE_OFFSET_INDEX];
    }
    IdRedisResponse.prototype.getStartSequence = function () {
        return this.startSequence;
    };
    IdRedisResponse.prototype.getEndSequence = function () {
        return this.endSequence;
    };
    IdRedisResponse.prototype.getHitTheTop = function () {
        return this.hasHitTheTop;
    };
    IdRedisResponse.prototype.getLogicalShardId = function () {
        return this.logicalShardId;
    };
    IdRedisResponse.prototype.getTimeMilliSeconds = function () {
        return this.timeMilliSeconds;
    };
    IdRedisResponse.prototype.getTimezoneOffset = function () {
        return this.timezoneOffset;
    };
    IdRedisResponse.START_SEQUENCE_INDEX = 0;
    IdRedisResponse.END_SEQUENCE_INDEX = 1;
    IdRedisResponse.HIT_THE_TOP_INDEX = 2;
    IdRedisResponse.LOGICAL_SHARD_ID_INDEX = 3;
    IdRedisResponse.TIME_MILLISECONDS_INDEX = 4;
    IdRedisResponse.TIMEZONE_OFFSET_INDEX = 5;
    return IdRedisResponse;
}());
exports.IdRedisResponse = IdRedisResponse;
