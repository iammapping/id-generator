import { ONE_HOUR_IN_MILLIS } from './../Consts';
import { IdRedisResponse } from '../redis/IdRedisResponse';
import { Combiner } from "./Combiner";
import { YmdhNumberId } from '../ids/YmdhNumberId';
import * as leftPad from "left-pad";
import { DateNumberCombiner } from './DateNumberCombiner';


export class YmdhNumberCombiner extends DateNumberCombiner implements Combiner<YmdhNumberId> {
  public constructor(keyPrefix: string = '0:ymdh') {
    super(keyPrefix, ONE_HOUR_IN_MILLIS, 2);
  }

  protected toTimePrefix(datetime: Date): string {
    return String(datetime.getFullYear()).substring(2) + 
      leftPad(datetime.getMonth() + 1, 2, 0) +
      leftPad(datetime.getDate(), 2, 0) +
      leftPad(datetime.getHours(), 2, 0);
  }

  public toIds(response: IdRedisResponse): Array<YmdhNumberId> {
    return super.toIds(response).map(id => new YmdhNumberId(id.getId(), id.getTime()));
  }
}