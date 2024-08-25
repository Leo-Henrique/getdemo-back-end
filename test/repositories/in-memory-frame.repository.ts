import { FrameEntity } from "@/domain/entities/frame.entity";
import { FrameRepository } from "@/domain/repositories/frame.repository";
import { WritableKeysOf } from "type-fest";

export class InMemoryFrameRepository implements FrameRepository {
  public items: FrameEntity[] = [];

  public async findUniqueById(id: string): Promise<FrameEntity | null> {
    const frame = this.items.find(item => item.id.value === id);

    return frame ?? null;
  }

  public async findManyByDemoId(
    demoId: string,
  ): Promise<FrameEntity["withoutHtml"][]> {
    const frames = this.items
      .filter(item => item.demoId.value === demoId)
      .map(item => item.withoutHtml);

    return frames;
  }

  public async updateUnique(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    frame: FrameEntity,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: Partial<Pick<FrameEntity, WritableKeysOf<FrameEntity>>>,
  ): Promise<void> {}
}
