import { SnowFlakeId } from "./SnowFlakeId";
export declare class ThirtyOneDecimalId extends SnowFlakeId {
    static readonly THIRTY_ONE_ALPHABET: string;
    getCode(): string;
    toString(): string;
}
