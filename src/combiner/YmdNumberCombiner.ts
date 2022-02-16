import { IdRedisResponse } from './../redis/IdRedisResponse';
import { Combiner } from "./Combiner";
import { YmdNumberId } from '../ids/YmdNumberId';
import * as leftPad from "left-pad";
import { DateNumberCombiner } from './DateNumberCombiner';


export class YmdNumberCombiner extends DateNumberCombiner implements Combiner<YmdNumberId> {
  protected toTimePrefix(datetime: Date): string {
    return String(datetime.getFullYear()).substring(2) + 
      leftPad(datetime.getMonth() + 1, 2, 0) +
      leftPad(datetime.getDate(), 2, 0);
  }

  public toIds(response: IdRedisResponse): Array<YmdNumberId> {
    return super.toIds(response).map(id => new YmdNumberId(id.getId(), id.getTime()));
  }
}