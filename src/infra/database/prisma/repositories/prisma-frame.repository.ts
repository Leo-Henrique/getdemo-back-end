import { FrameDataUpdate, FrameEntity } from "@/domain/entities/frame.entity";
import { FrameRepository } from "@/domain/repositories/frame.repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaFrameRepository implements FrameRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findUniqueById(id: string): Promise<FrameEntity | null> {
    const frame = await this.prisma.frame.findUnique({ where: { id } });

    if (!frame) return null;

    return FrameEntity.create(frame);
  }

  public async findManyByDemoId(
    demoId: string,
  ): Promise<FrameEntity["withoutHtml"][]> {
    const frames = await this.prisma.frame.findMany({
      select: {
        id: true,
        demoId: true,
        order: true,
      },
      where: { demoId },
      orderBy: { order: "asc" },
    });

    return frames.map(frame => {
      const domainFrame = FrameEntity.create({ ...frame, html: "" });

      return domainFrame.withoutHtml;
    });
  }

  public async updateUnique(
    frame: FrameEntity,
    data: FrameDataUpdate,
  ): Promise<void> {
    await this.prisma.frame.update({ where: { id: frame.id.value }, data });
  }
}
