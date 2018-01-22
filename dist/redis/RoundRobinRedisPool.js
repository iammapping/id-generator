"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A wrapper around a list of redis instances to provide round robin behaviour for a group of servers.
 *
 * This is useful when you don't need to scale writes, but instead just need to use redis in a reliable,
 * distributed manner. An example is to use the redis servers for ID generation and timestamp oracle
 * behaviour.
 */
var RoundRobinRedisPool = (function () {
    /**
     * Creates a new round robin redis pool from the given list of servers.
     *
     * @param redisServers A list of redis servers to use.
     */
    function RoundRobinRedisPool(redisServers) {
        if (!redisServers.length) {
            throw new Error("Given list of redis servers is empty.");
        }
        this.redisServers = redisServers;
        this.index = -1;
    }
    /**
     * Returns the next instance of Redis from the pool, moving the iterator forward or looping back to the start if the
     * iterator is at the end.
     *
     * @return The instance of Redis as pulled from the pool.
     */
    RoundRobinRedisPool.prototype.getNextRedis = function () {
        this.index++;
        if (this.index === this.redisServers.length) {
            this.index = 0;
        }
        return this.redisServers[this.index];
    };
    return RoundRobinRedisPool;
}());
exports.RoundRobinRedisPool = RoundRobinRedisPool;
