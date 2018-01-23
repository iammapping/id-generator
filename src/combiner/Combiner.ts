
import { IdRedisResponse } from "../redis/IdRedisResponse";

export interface Combiner<T> {
  toIds(response: IdRedisResponse): Array<T>;

  KEY_PREFIX: string;
  LOGICAL_SHARD_ID_BITS: number;
  SEQUENCE_BITS: number;
  TIMESTAMP_SHIFT: number;
  LOGICAL_SHARD_ID_SHIFT: number;
  MAX_SEQUENCE: number;
  MAX_LOGICAL_SHARD_ID: number;
  MIN_LOGICAL_SHARD_ID: number;
  MAX_BATCH_SIZE: number;
  INTERVAL: number;
  OFFSET: number;
}

export class BaseCombiner {
  public constructor(
    protected keyPrefix: string = 'id-generator',
    protected interval: number = 1,
    protected offset: number = -(new Date().getTimezoneOffset() * 60 * 1000),
    protected logicalShardIdBits: number = 10,
    protected sequenceBits: number = 12,
    protected minLogicalShardId: number = 0
  ) {}

  public get KEY_PREFIX() {
    return this.keyPrefix;
  }

  public get LOGICAL_SHARD_ID_BITS() {
    return this.logicalShardIdBits;
  }

  public get SEQUENCE_BITS() {
    return this.sequenceBits;
  }

  public get TIMESTAMP_SHIFT() {
    return this.logicalShardIdBits + this.sequenceBits;
  }

  public get LOGICAL_SHARD_ID_SHIFT() {
    return this.sequenceBits;
  }

  public get MAX_SEQUENCE() {
    return ~(-1 << this.sequenceBits);
  }

  public get MAX_LOGICAL_SHARD_ID() {
    return ~(-1 << this.logicalShardIdBits);
  }

  public get MIN_LOGICAL_SHARD_ID() {
    return this.minLogicalShardId;
  }

  public get MAX_BATCH_SIZE() {
    return ~(-1 << this.sequenceBits);
  }

  public get INTERVAL() {
    return this.interval;
  }

  public get OFFSET() {
    return this.offset;
  }
}