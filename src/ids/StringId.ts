import { Id } from "./Id";


export class StringId extends Id<string> {
  public toString(): string {
    return this.getId();
  }
}
