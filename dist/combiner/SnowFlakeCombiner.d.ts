import { IdRedisResponse } from './../redis/IdRedisResponse';
import { SnowFlakeId } from "../ids/SnowFlakeId";
import { Combiner, BaseCombiner } from "./Combiner";
export declare class SnowFlakeCombiner extends BaseCombiner implements Combiner<SnowFlakeId> {
    private customEpoch;
    private static readonly DEFAULT_CUSTOM_EPOCH;
    constructor(customEpoch?: number);
    toIds(response: IdRedisResponse): Array<SnowFlakeId>;
}
