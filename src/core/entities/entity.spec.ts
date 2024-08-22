import { faker } from "@faker-js/faker";
import { OverrideProperties } from "type-fest";
import { describe, expect, it, vi } from "vitest";
import { Entity } from "./entity";
import { UniqueEntityId } from "./unique-entity.id";

type FakeUserData = {
  id: UniqueEntityId;
  name: string;
};

type FakeUserDataCreate = OverrideProperties<
  FakeUserData,
  {
    id?: string;
  }
>;

export class FakeUser extends Entity<FakeUserData> {
  public get id() {
    return this.data.id;
  }

  public get name() {
    return this.data.name;
  }

  public set name(name: string) {
    this.data.name = name.trim();
  }

  static create(input: FakeUserDataCreate): FakeUser {
    return new FakeUser({
      ...input,
      id: new UniqueEntityId(input.id),
    });
  }
}

describe("[Core] Domain Entity", () => {
  it("should be able to create a entity", () => {
    const name = faker.person.fullName();
    const sut = FakeUser.create({ name });

    expect(sut).toMatchObject({
      id: new UniqueEntityId(sut.id.value),
      name,
    });
  });

  it("should be able to call field setters on creation entity", () => {
    // @ts-expect-error: method "executeSetters" is private
    const executeSetters = vi.spyOn(FakeUser.prototype, "executeSetters");

    const name = `  ${faker.person.fullName()}  `;
    const sut = FakeUser.create({ name });

    expect(sut).toMatchObject({
      id: new UniqueEntityId(sut.id.value),
      name: name.trim(),
    });
    expect(executeSetters).toHaveBeenCalledTimes(1);
  });

  it("should be able to get the raw data of the entity", () => {
    const sut = FakeUser.create({ name: faker.person.fullName() });
    const rawData = sut.getRawData();

    expect(rawData).toEqual({
      id: sut.id.value,
      name: sut.name,
    });
    expect(rawData).not.toBeInstanceOf(Entity);
  });
});
