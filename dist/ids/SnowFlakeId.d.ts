/// <reference types="bignumber.js" />
import { BigNumber } from "bignumber.js";
import { Id } from "./Id";
export declare class SnowFlakeId extends Id<BigNumber> {
    toString(): string;
    toBinaryString(): string;
}
