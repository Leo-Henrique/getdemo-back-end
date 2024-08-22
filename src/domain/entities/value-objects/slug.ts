import { ValueObject } from "@/core/entities/value-object";

export class Slug extends ValueObject<string> {
  public readonly value: string;

  public constructor(text: string) {
    super();

    const slugText = text
      .normalize("NFKD")
      .replace(/[^\w\s]+|_+/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    this.value = slugText;
  }
}
