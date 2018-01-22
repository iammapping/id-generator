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
export declare class IdRedisResponse {
    private static readonly START_SEQUENCE_INDEX;
    private static readonly END_SEQUENCE_INDEX;
    private static readonly HIT_THE_TOP_INDEX;
    private static readonly LOGICAL_SHARD_ID_INDEX;
    private static readonly TIME_MILLISECONDS_INDEX;
    private startSequence;
    private endSequence;
    private hasHitTheTop;
    private logicalShardId;
    private timeMilliSeconds;
    /**
     * Create an instance of the response from the ID generation Lua script.
     * @param results The list of long values returned by the Lua script. If this param is null, a NullPointerException
     *                will be thrown.
     */
    constructor(results: Array<number>);
    getStartSequence(): number;
    getEndSequence(): number;
    getHitTheTop(): boolean;
    getLogicalShardId(): number;
    getTimeMilliSeconds(): number;
}
