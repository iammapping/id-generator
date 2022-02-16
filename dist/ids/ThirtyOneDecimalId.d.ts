import { SnowFlakeId } from "./SnowFlakeId";
export declare class ThirtyOneDecimalId extends SnowFlakeId {
    static readonly THIRTY_ONE_ALPHABET = "0123456789abcdefhkmnpqrstuvwxyz";
    getCode(): string;
    toString(): string;
}
