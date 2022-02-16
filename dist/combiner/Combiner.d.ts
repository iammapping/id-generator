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
export declare class BaseCombiner {
    protected keyPrefix: string;
    protected interval: number;
    protected offset: number;
    protected logicalShardIdBits: number;
    protected sequenceBits: number;
    protected minLogicalShardId: number;
    constructor(keyPrefix?: string, interval?: number, offset?: number, logicalShardIdBits?: number, sequenceBits?: number, minLogicalShardId?: number);
    get KEY_PREFIX(): string;
    get LOGICAL_SHARD_ID_BITS(): number;
    get SEQUENCE_BITS(): number;
    get TIMESTAMP_SHIFT(): number;
    get LOGICAL_SHARD_ID_SHIFT(): number;
    get MAX_SEQUENCE(): number;
    get MAX_LOGICAL_SHARD_ID(): number;
    get MIN_LOGICAL_SHARD_ID(): number;
    get MAX_BATCH_SIZE(): number;
    get INTERVAL(): number;
    get OFFSET(): number;
}
