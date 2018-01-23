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
export class IdRedisResponse {
  private static readonly START_SEQUENCE_INDEX: number = 0;
  private static readonly END_SEQUENCE_INDEX: number = 1;
  private static readonly HIT_THE_TOP_INDEX: number = 2;
  private static readonly LOGICAL_SHARD_ID_INDEX: number = 3;
  private static readonly TIME_MILLISECONDS_INDEX: number = 4;
  private static readonly TIMEZONE_OFFSET_INDEX: number = 5;

  private startSequence: number;
  private endSequence: number;
  private hasHitTheTop: boolean;
  private logicalShardId: number;
  private timeMilliSeconds: number;
  private timezoneOffset: number;

  /**
   * Create an instance of the response from the ID generation Lua script.
   * @param results The list of long values returned by the Lua script. If this param is null, a NullPointerException
   *                will be thrown.
   */
  public constructor(results: Array<number>) {
    this.startSequence = results[IdRedisResponse.START_SEQUENCE_INDEX];
    this.endSequence = results[IdRedisResponse.END_SEQUENCE_INDEX];
    this.hasHitTheTop = !!results[IdRedisResponse.HIT_THE_TOP_INDEX];
    this.logicalShardId = results[IdRedisResponse.LOGICAL_SHARD_ID_INDEX];
    this.timeMilliSeconds = results[IdRedisResponse.TIME_MILLISECONDS_INDEX];
    this.timezoneOffset = results[IdRedisResponse.TIMEZONE_OFFSET_INDEX];
  }

  public getStartSequence(): number {
    return this.startSequence;
  }

  public getEndSequence(): number {
    return this.endSequence;
  }

  public getHitTheTop(): boolean {
    return this.hasHitTheTop;
  }

  public getLogicalShardId(): number {
    return this.logicalShardId;
  }

  public getTimeMilliSeconds(): number {
    return this.timeMilliSeconds;
  }

  public getTimezoneOffset(): number {
    return this.timezoneOffset;
  }
}
