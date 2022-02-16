import { IdRedisResponse } from './../redis/IdRedisResponse';
import { Combiner } from "./Combiner";
import { YmdNumberId } from '../ids/YmdNumberId';
import { DateNumberCombiner } from './DateNumberCombiner';
export declare class YmdNumberCombiner extends DateNumberCombiner implements Combiner<YmdNumberId> {
    protected toTimePrefix(datetime: Date): string;
    toIds(response: IdRedisResponse): Array<YmdNumberId>;
}
