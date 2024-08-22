import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity.id";
import { OverrideProperties } from "type-fest";
import { Slug } from "./value-objects/slug";

export type DemoData = {
  id: UniqueEntityId;
  slug: Slug;
  name: string;
};

export type DemoDataCreate = OverrideProperties<
  DemoData,
  {
    id?: string;
    slug?: string;
  }
>;

export class DemoEntity extends Entity<DemoData> {
  public get id() {
    return this.data.id;
  }

  public get slug() {
    return this.data.slug;
  }

  public set slug(slug: Slug) {
    this.data.slug = slug;
  }

  public get name() {
    return this.data.name;
  }

  public set name(name: string) {
    this.data.name = name;
    this.data.slug = new Slug(name);
  }

  static create(input: DemoDataCreate): DemoEntity {
    return new DemoEntity({
      ...input,
      id: new UniqueEntityId(input.id),
      slug: new Slug(input.name),
    });
  }
}
