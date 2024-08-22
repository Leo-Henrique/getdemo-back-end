import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Slug } from "./slug";

const text = " Example text 123 ";
const slug = "example-text-123";

describe("[Value Object] Slug", () => {
  it("should be able to create an slug", async () => {
    const { value } = new Slug(text);

    expect(value).toEqual(slug);
  });

  it("should be able to remove input containing special characters", async () => {
    const symbols = faker.string.symbol(50);
    const { value } = new Slug(`${symbols} ${text} ${symbols} ${text}`);

    expect(value).toEqual(`${slug}-${slug}`);
  });

  it("should be able to remove input containing emojis", async () => {
    const emojis = faker.internet.emoji();
    const { value } = new Slug(`${emojis} ${text} ${emojis} ${text}`);

    expect(value).toEqual(`${slug}-${slug}`);
  });
});
