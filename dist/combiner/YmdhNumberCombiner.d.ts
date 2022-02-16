import { IdRedisResponse } from '../redis/IdRedisResponse';
import { Combiner } from "./Combiner";
import { YmdhNumberId } from '../ids/YmdhNumberId';
import { DateNumberCombiner } from './DateNumberCombiner';
export declare class YmdhNumberCombiner extends DateNumberCombiner implements Combiner<YmdhNumberId> {
    constructor(keyPrefix?: string);
    protected toTimePrefix(datetime: Date): string;
    toIds(response: IdRedisResponse): Array<YmdhNumberId>;
}
