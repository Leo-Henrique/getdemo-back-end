import { InferWritableEntityFields } from "@/core/@types/entity";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity.id";
import { OverrideProperties } from "type-fest";

export type FrameData = {
  id: UniqueEntityId;
  demoId: UniqueEntityId;
  html: string;
  order: number;
};

export type FrameDataCreate = OverrideProperties<
  FrameData,
  {
    id?: string;
    demoId: string;
  }
>;

export type FrameDataUpdate = InferWritableEntityFields<FrameEntity>;

export class FrameEntity extends Entity<FrameData> {
  public get id() {
    return this.data.id;
  }

  public get demoId() {
    return this.data.demoId;
  }

  public get html() {
    return this.data.html;
  }

  public set html(html: string) {
    this.data.html = html;
  }

  public get order() {
    return this.data.order;
  }

  public set order(order: number) {
    this.data.order = Math.floor(order);
  }

  public static create(input: FrameDataCreate): FrameEntity {
    return new FrameEntity({
      ...input,
      id: new UniqueEntityId(input.id),
      demoId: new UniqueEntityId(input.demoId),
    });
  }
}
