import { DemoEntity } from "../entities/demo.entity";

export abstract class DemoRepository {
  abstract findUniqueById(id: string): Promise<DemoEntity | null>;
  abstract findUniqueBySlug(slug: string): Promise<DemoEntity | null>;
  abstract findMany(): Promise<DemoEntity[]>;
}
