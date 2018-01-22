import { SixtyTwoDecimalId } from './../ids/SixtyTwoDecimalId';
import { Combiner } from "./Combiner";
import { SnowFlakeCombiner } from "./SnowFlakeCombiner";
import { IdRedisResponse } from "../redis/IdRedisResponse";

export class SixtyTwoDecimalCombiner extends SnowFlakeCombiner implements Combiner<SixtyTwoDecimalId> {
  protected static readonly KEY_PREFIX: string = 'thirty-one-generator';
  protected static readonly LOGICAL_SHARD_ID_BITS: number = 4;
  protected static readonly SEQUENCE_BITS: number = 12;

  public toIds(response: IdRedisResponse): Array<SixtyTwoDecimalId> {
    return super.toIds(response).map(id => new SixtyTwoDecimalId(id.getId(), id.getTime()));
  }
}