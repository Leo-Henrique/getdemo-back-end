import { EntityData, EntityRawData } from "../@types/entity";
import { ValueObject } from "./value-object";

export abstract class Entity<Data extends EntityData> {
  protected constructor(protected readonly data: Data) {
    this.executeSetters();
  }

  private executeSetters() {
    const propertyNames = Object.getOwnPropertyNames(
      this.constructor.prototype,
    );
    const setterNames = propertyNames.filter(method => {
      const descriptor = Object.getOwnPropertyDescriptor(
        this.constructor.prototype,
        method,
      );

      return descriptor && typeof descriptor.set === "function";
    });

    for (const setterName of setterNames) {
      // @ts-expect-error: inference is unknown
      this[setterName as unknown] = this.data[setterName];
    }

    return setterNames;
  }

  public getRawData() {
    const dataFieldNames = Object.keys(this.data) as (keyof Data)[];
    const rawData = dataFieldNames.reduce((rawData, fieldName) => {
      const fieldValue = this.data[fieldName];

      if (fieldValue instanceof ValueObject) {
        rawData[fieldName] = fieldValue.value;
      } else {
        rawData[fieldName] = fieldValue;
      }

      return rawData;
    }, {} as EntityRawData<Data>);
    const serializedData = JSON.parse(
      JSON.stringify(rawData),
    ) as EntityRawData<Data>;

    return serializedData;
  }
}
