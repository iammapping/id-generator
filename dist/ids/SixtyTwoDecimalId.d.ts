import { SnowFlakeId } from "./SnowFlakeId";
export declare class SixtyTwoDecimalId extends SnowFlakeId {
    static readonly SIXTY_TWO_ALPHABET: string;
    getCode(): string;
    toString(): string;
}
