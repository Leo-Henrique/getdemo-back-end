import { DemoEntity } from "@/domain/entities/demo.entity";
import {
  DemoRepository,
  DemoWithDetails,
  DemoWithFrameDetails,
} from "@/domain/repositories/demo.repository";
import { InMemoryFrameRepository } from "./in-memory-frame.repository";

export class InMemoryDemoRepository implements DemoRepository {
  public items: DemoEntity[] = [];

  public constructor(
    private readonly frameRepository: InMemoryFrameRepository,
  ) {}

  async findUniqueById(id: string): Promise<DemoEntity | null> {
    const demo = this.items.find(item => item.id.value === id);

    return demo ?? null;
  }

  async findUniqueBySlug(slug: string): Promise<DemoEntity | null> {
    const demo = this.items.find(item => item.slug.value === slug);

    return demo ?? null;
  }

  async findUniqueBySlugWithFrameDetails(
    slug: string,
  ): Promise<DemoWithFrameDetails | null> {
    const demo = this.items.find(item => item.slug.value === slug);

    if (!demo) return null;

    const frames = this.frameRepository.items
      .filter(item => item.demoId.value === demo.id.value)
      .sort((a, b) => a.order - b.order)
      .map((item, index) => {
        if (index > 0) return item.withoutHtml;

        return item;
      }) as DemoWithFrameDetails["frames"];

    return Object.assign(demo.clone(), { frames });
  }

  async findManyWithDetails(): Promise<DemoWithDetails[]> {
    return this.items.map(demo => {
      const frames = this.frameRepository.items.filter(
        item => item.demoId.value === demo.id.value,
      );

      return Object.assign(demo, { totalFrames: frames.length });
    });
  }
}
