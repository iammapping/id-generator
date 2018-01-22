import { BigNumber } from "bignumber.js";
import * as leftPad from "left-pad";
import { Id } from "./Id";


export class SnowFlakeId extends Id<BigNumber> {
  public toString(): string {
    return this.getId().toString(10);
  }

  public toBinaryString(): string {
    return leftPad(this.getId().toString(2), 64, 0);
  }
}
