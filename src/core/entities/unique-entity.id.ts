import { randomUUID } from "node:crypto";
import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {
  public constructor(public readonly value: string = randomUUID()) {
    super();
  }
}
