import { IdRedisResponse } from '../redis/IdRedisResponse';
import { Combiner, BaseCombiner } from "./Combiner";
import { ONE_DAY_IN_MILLIS } from '../Consts';
import * as leftPad from "left-pad";
import { StringId } from '../ids/StringId';


export abstract class DateNumberCombiner extends BaseCombiner implements Combiner<StringId> {
  protected seqPad: number;

  public constructor(keyPrefix: string = '0:ymd', interval: number = ONE_DAY_IN_MILLIS, seqPad: number = 3) {
    super(keyPrefix, interval);
    this.seqPad = seqPad;
  }

  protected abstract toTimePrefix(datetime: Date): string;

  public toIds(response: IdRedisResponse): Array<StringId> {
    const timestamp = response.getTimeMilliSeconds();
    const datetime = new Date(timestamp + (new Date().getTimezoneOffset() * 60 * 1000 + response.getTimezoneOffset()));
    let idPrefix = this.toTimePrefix(datetime);

    idPrefix = idPrefix + response.getLogicalShardId();

    let ids: Array<StringId> = [];
    for (let sequence = response.getStartSequence(); sequence <= response.getEndSequence(); sequence++) {
      let id = idPrefix + leftPad(sequence, this.seqPad, '0');

      ids.push(new StringId(id, timestamp));
    }

    return ids;
  }

  public get MAX_SEQUENCE(): number {
    return 9999999;
  }
}