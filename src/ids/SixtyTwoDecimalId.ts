import { SnowFlakeId } from "./SnowFlakeId";

export class SixtyTwoDecimalId extends SnowFlakeId​​ {
  public static readonly SIXTY_TWO_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  public getCode(): string {
    let code = '';
    let dec = this.getId();

		do {
			code = SixtyTwoDecimalId.SIXTY_TWO_ALPHABET[dec.mod(62).toNumber()] + code;
			dec = dec.divToInt(62);
		} while (dec.gt(0));

		return code;
  }

  public toString(): string {
    return this.getCode();
  }
}