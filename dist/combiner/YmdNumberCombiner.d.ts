import { IdRedisResponse } from './../redis/IdRedisResponse';
import { Combiner, BaseCombiner } from "./Combiner";
import { YmdNumberId } from '../ids/YmdNumberId';
export declare class YmdNumberCombiner extends BaseCombiner implements Combiner<YmdNumberId> {
    protected seqPad: number;
    constructor(keyPrefix?: string);
    toIds(response: IdRedisResponse): Array<YmdNumberId>;
    readonly MAX_SEQUENCE: number;
}
