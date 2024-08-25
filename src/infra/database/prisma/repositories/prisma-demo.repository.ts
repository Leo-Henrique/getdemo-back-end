import { DemoEntity, DemoRawData } from "@/domain/entities/demo.entity";
import { FrameEntity } from "@/domain/entities/frame.entity";
import {
  DemoRepository,
  DemoWithDetails,
  DemoWithFrameDetails,
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

  public async findUniqueBySlugWithFrameDetails(
    slug: string,
  ): Promise<DemoWithFrameDetails | null> {
    const [demoWithFrames, firstFrame] = await Promise.all([
      this.prisma.demo.findUnique({
        where: { slug },
        include: {
          frames: {
            select: {
              id: true,
              demoId: true,
              order: true,
            },
            orderBy: {
              order: "asc",
            },
            skip: 1,
          },
        },
      }),
      this.prisma.frame.findFirst({
        where: {
          demo: { slug },
        },
        orderBy: { order: "asc" },
      }),
    ]);

    if (!demoWithFrames) return null;

    const { frames, ...demo } = demoWithFrames;

    if (!firstFrame)
      return Object.assign(DemoEntity.create(demo), { frames: [] });

    const framesWithoutHtml = frames.map(frame => {
      return FrameEntity.create({ ...frame, html: "" }).withoutHtml;
    });

    return Object.assign(DemoEntity.create(demo), {
      frames: [FrameEntity.create(firstFrame), ...framesWithoutHtml],
    });
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
