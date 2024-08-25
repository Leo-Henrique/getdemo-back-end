import { DemoData, DemoEntity } from "../entities/demo.entity";
import { FrameEntity } from "../entities/frame.entity";

export type DemoWithFrameDetails = DemoEntity & {
  frames: (FrameEntity | FrameEntity["withoutHtml"])[];
};

export type DemoWithDetails = DemoData & {
  totalFrames: number;
};

export abstract class DemoRepository {
  abstract findUniqueById(id: string): Promise<DemoEntity | null>;
  abstract findUniqueBySlug(slug: string): Promise<DemoEntity | null>;
  abstract findUniqueBySlugWithFrameDetails(
    slug: string,
  ): Promise<DemoWithFrameDetails | null>;
  abstract findManyWithDetails(): Promise<DemoWithDetails[]>;
}
