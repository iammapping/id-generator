import { SnowFlakeId } from "./SnowFlakeId";

export class ThirtyOneDecimalId extends SnowFlakeId​​ {
  public static readonly THIRTY_ONE_ALPHABET = '0123456789abcdefhkmnpqrstuvwxyz';

  public getCode(): string {
    let code = '';
    let dec = this.getId();

		do {
			code = ThirtyOneDecimalId.THIRTY_ONE_ALPHABET[dec.mod(31).toNumber()] + code;
			dec = dec.divToInt(31);
		} while (dec.gt(0));

		return code;
  }

  public toString(): string {
    return this.getCode();
  }
}