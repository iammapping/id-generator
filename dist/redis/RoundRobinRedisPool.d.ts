import { Redis } from './Redis';
/**
 * A wrapper around a list of redis instances to provide round robin behaviour for a group of servers.
 *
 * This is useful when you don't need to scale writes, but instead just need to use redis in a reliable,
 * distributed manner. An example is to use the redis servers for ID generation and timestamp oracle
 * behaviour.
 */
export declare class RoundRobinRedisPool {
    private redisServers;
    private index;
    /**
     * Creates a new round robin redis pool from the given list of servers.
     *
     * @param redisServers A list of redis servers to use.
     */
    constructor(redisServers: Array<Redis>);
    /**
     * Returns the next instance of Redis from the pool, moving the iterator forward or looping back to the start if the
     * iterator is at the end.
     *
     * @return The instance of Redis as pulled from the pool.
     */
    getNextRedis(): Redis;
}
