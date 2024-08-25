import { FrameDataUpdate, FrameEntity } from "../entities/frame.entity";

export abstract class FrameRepository {
  abstract findUniqueById(id: string): Promise<FrameEntity | null>;
  abstract findManyByDemoId(
    demoId: string,
  ): Promise<FrameEntity["withoutHtml"][]>;
  abstract updateUnique(
    frame: FrameEntity,
    data: FrameDataUpdate,
  ): Promise<void>;
}
