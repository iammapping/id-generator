import { Id } from "./Id";


export class YmdNumberId extends Id<string> {
  public toString(): string {
    return this.getId();
  }
}
