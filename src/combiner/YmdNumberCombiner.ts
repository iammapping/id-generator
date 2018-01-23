import { IdRedisResponse } from './../redis/IdRedisResponse';
import * as RawBigNumber from "bignumber.js";
import { Id } from "../ids/Id";
import { Combiner, BaseCombiner } from "./Combiner";
import { YmdNumberId } from '../ids/YmdNumberId';
import { ONE_DAY_IN_MILLIS } from '../Consts';
import * as leftPad from "left-pad";

let BigNumber = RawBigNumber;

export class YmdNumberCombiner extends BaseCombiner implements Combiner<YmdNumberId> {
  protected seqPad: number = 3;

  public constructor(keyPrefix: string = '0:ymd') {
    super(keyPrefix, ONE_DAY_IN_MILLIS);
  }

  public toIds(response: IdRedisResponse): Array<YmdNumberId> {
    let timestamp = response.getTimeMilliSeconds();
    let datetime = new Date(timestamp + (new Date().getTimezoneOffset() * 60 * 1000 + response.getTimezoneOffset()));
    let idPrefix = String(datetime.getFullYear()).substr(2) + 
      leftPad(datetime.getMonth() + 1, 2, 0) +
      leftPad(datetime.getDate(), 2, 0);

    idPrefix = idPrefix + response.getLogicalShardId();

    let ids: Array<YmdNumberId> = [];
    for (let sequence = response.getStartSequence(); sequence <= response.getEndSequence(); sequence++) {
      let id = idPrefix + leftPad(sequence, this.seqPad, '0');

      ids.push(new YmdNumberId(id, timestamp));
    }

    return ids;
  }

  public get MAX_SEQUENCE(): number {
    return 9999999;
  }
}