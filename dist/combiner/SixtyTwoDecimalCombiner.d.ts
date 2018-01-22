import { SixtyTwoDecimalId } from './../ids/SixtyTwoDecimalId';
import { Combiner } from "./Combiner";
import { SnowFlakeCombiner } from "./SnowFlakeCombiner";
import { IdRedisResponse } from "../redis/IdRedisResponse";
export declare class SixtyTwoDecimalCombiner extends SnowFlakeCombiner implements Combiner<SixtyTwoDecimalId> {
    protected static readonly KEY_PREFIX: string;
    protected static readonly LOGICAL_SHARD_ID_BITS: number;
    protected static readonly SEQUENCE_BITS: number;
    toIds(response: IdRedisResponse): Array<SixtyTwoDecimalId>;
}
