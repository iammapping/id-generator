import { IdRedisResponse } from '../redis/IdRedisResponse';
import { Combiner, BaseCombiner } from "./Combiner";
import { StringId } from '../ids/StringId';
export declare abstract class DateNumberCombiner extends BaseCombiner implements Combiner<StringId> {
    protected seqPad: number;
    constructor(keyPrefix?: string, interval?: number, seqPad?: number);
    protected abstract toTimePrefix(datetime: Date): string;
    toIds(response: IdRedisResponse): Array<StringId>;
    get MAX_SEQUENCE(): number;
}
