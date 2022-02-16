import { SnowFlakeId } from "./SnowFlakeId";
export declare class SixtyTwoDecimalId extends SnowFlakeId {
    static readonly SIXTY_TWO_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    getCode(): string;
    toString(): string;
}
