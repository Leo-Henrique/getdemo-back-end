import { WritableKeysOf } from "type-fest";
import { Entity } from "../entities/entity";
import { ValueObject } from "../entities/value-object";

export type EntityData = object;

export type EntityRawData<T extends EntityData> = {
  [K in keyof T]: T[K] extends ValueObject<unknown> ? T[K]["value"] : T[K];
};

export type InferWritableEntityFields<T extends Entity<object>> = Partial<
  Pick<T, WritableKeysOf<T>>
>;
