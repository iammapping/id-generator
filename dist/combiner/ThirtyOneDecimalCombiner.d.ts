import { Combiner } from "./Combiner";
import { SnowFlakeCombiner } from "./SnowFlakeCombiner";
import { ThirtyOneDecimalId } from "../ids/ThirtyOneDecimalId";
import { IdRedisResponse } from "../redis/IdRedisResponse";
export declare class ThirtyOneDecimalCombiner extends SnowFlakeCombiner implements Combiner<ThirtyOneDecimalId> {
    protected static readonly KEY_PREFIX: string;
    protected static readonly LOGICAL_SHARD_ID_BITS: number;
    protected static readonly SEQUENCE_BITS: number;
    toIds(response: IdRedisResponse): Array<ThirtyOneDecimalId>;
}
