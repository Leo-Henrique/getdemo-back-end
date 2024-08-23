import { DemoEntity, DemoRawData } from "@/domain/entities/demo.entity";
import {
  DemoRepository,
  DemoWithDetails,
} from "@/domain/repositories/demo.repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaDemoRepository implements DemoRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findUniqueById(id: string): Promise<DemoEntity | null> {
    const demo = await this.prisma.demo.findUnique({ where: { id } });

    if (!demo) return null;

    return DemoEntity.create(demo);
  }

  public async findUniqueBySlug(slug: string): Promise<DemoEntity | null> {
    const demo = await this.prisma.demo.findUnique({ where: { slug } });

    if (!demo) return null;

    return DemoEntity.create(demo);
  }

  public async findManyWithDetails(): Promise<DemoWithDetails[]> {
    type Row = DemoRawData & { totalFrames: number };

    const demos = await this.prisma.sql<Row>`
      SELECT
        demos.*,
        COUNT(*)::INTEGER AS total_frames
      FROM
        demos
      LEFT JOIN
        frames ON frames.demo_id = demos.id
      GROUP BY
        demos.id
    `;

    return demos.map(({ totalFrames, ...demo }) => {
      const domainDemo = DemoEntity.create(demo);

      return Object.assign(domainDemo, { totalFrames });
    });
  }
}
