import { DemoEntity } from "@/domain/entities/demo.entity";
import { DemoRepository } from "@/domain/repositories/demo.repository";

export class InMemoryDemoRepository implements DemoRepository {
  public items: DemoEntity[] = [];

  async findUniqueById(id: string): Promise<DemoEntity | null> {
    const demo = this.items.find(item => item.id.value === id);

    return demo ?? null;
  }

  async findUniqueBySlug(slug: string): Promise<DemoEntity | null> {
    const demo = this.items.find(item => item.slug.value === slug);

    return demo ?? null;
  }

  async findMany(): Promise<DemoEntity[]> {
    return this.items;
  }
}
