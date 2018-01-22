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
}
export declare class BaseCombiner {
    protected keyPrefix: string;
    protected interval: number;
    protected logicalShardIdBits: number;
    protected sequenceBits: number;
    protected minLogicalShardId: number;
    constructor(keyPrefix?: string, interval?: number, logicalShardIdBits?: number, sequenceBits?: number, minLogicalShardId?: number);
    readonly KEY_PREFIX: string;
    readonly LOGICAL_SHARD_ID_BITS: number;
    readonly SEQUENCE_BITS: number;
    readonly TIMESTAMP_SHIFT: number;
    readonly LOGICAL_SHARD_ID_SHIFT: number;
    readonly MAX_SEQUENCE: number;
    readonly MAX_LOGICAL_SHARD_ID: number;
    readonly MIN_LOGICAL_SHARD_ID: number;
    readonly MAX_BATCH_SIZE: number;
    readonly INTERVAL: number;
}
