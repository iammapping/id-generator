import { Combiner } from "./Combiner";
import { SnowFlakeCombiner } from "./SnowFlakeCombiner";
import { ThirtyOneDecimalId } from "../ids/ThirtyOneDecimalId";
import { IdRedisResponse } from "../redis/IdRedisResponse";

export class ThirtyOneDecimalCombiner extends SnowFlakeCombiner implements Combiner<ThirtyOneDecimalId​​> {
  protected static readonly KEY_PREFIX: string = 'thirty-one-generator';
  protected static readonly LOGICAL_SHARD_ID_BITS: number = 4;
  protected static readonly SEQUENCE_BITS: number = 12;

  public toIds(response: IdRedisResponse): Array<ThirtyOneDecimalId> {
    return super.toIds(response).map(id => new ThirtyOneDecimalId(id.getId(), id.getTime()));
  }
}