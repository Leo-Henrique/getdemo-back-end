import { DemoData, DemoEntity } from "../entities/demo.entity";

export type DemoWithDetails = DemoData & {
  totalFrames: number;
};

export abstract class DemoRepository {
  abstract findUniqueById(id: string): Promise<DemoEntity | null>;
  abstract findUniqueBySlug(slug: string): Promise<DemoEntity | null>;
  abstract findManyWithDetails(): Promise<DemoWithDetails[]>;
}
