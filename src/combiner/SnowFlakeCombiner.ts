import { IdRedisResponse } from './../redis/IdRedisResponse';
import * as RawBigNumber from "bignumber.js";
import { Id } from "../ids/Id";
import { SnowFlakeId } from "../ids/SnowFlakeId";
import { Combiner, BaseCombiner } from "./Combiner";

let BigNumber = RawBigNumber;

export class SnowFlakeCombiner extends BaseCombiner implements Combiner<SnowFlakeId> {
  // We specify an custom epoch that we will use to fit our timestamps within the bounds of the 41 bits we have
  // available. This gives us a range of ~69 years within which we can generate IDs.
  //
  // This timestamp must be in milliseconds.
  private static readonly DEFAULT_CUSTOM_EPOCH: number = 1455788600316;

  public constructor(private customEpoch: number = SnowFlakeCombiner.DEFAULT_CUSTOM_EPOCH) {
    super();
  }

  public toIds(response: IdRedisResponse): Array<SnowFlakeId> {
    // We get the timestamp from Redis in seconds, but we get microseconds too, so we can make a timestamp in
    // milliseconds (losing some precision in the meantime for the sake of keeping things in 41 bits) using both of
    // these values.
    let timestamp = response.getTimeMilliSeconds();
    
    // shift to left 22 bit
    let shiftedTimestamp = new BigNumber(timestamp).minus(this.customEpoch).times(Math.pow(2, this.TIMESTAMP_SHIFT));

    let logicalShardId = response.getLogicalShardId();
    let shiftedLogicalShardId = logicalShardId << this.LOGICAL_SHARD_ID_SHIFT;

    let ids: Array<SnowFlakeId> = [];
    for (let sequence = response.getStartSequence(); sequence <= response.getEndSequence(); sequence++) {
      // Here's the fun bit-shifting. The purpose of this is to get a 64-bit ID of the following
      // format:
      //
      //  ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDDDD
      //
      // Where:
      //   * A is the reserved signed bit of a Java long.
      //   * B is the timestamp in milliseconds since custom epoch bits, 41 in total.
      //   * C is the logical shard ID, 10 bits in total.
      //   * D is the sequence, 12 bits in total.
      let id = shiftedTimestamp.plus(shiftedLogicalShardId).plus(sequence);

      ids.push(new SnowFlakeId(id, timestamp));
    }

    return ids;
  }
}