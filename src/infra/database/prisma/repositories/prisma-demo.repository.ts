import { DemoEntity } from "@/domain/entities/demo.entity";
import { DemoRepository } from "@/domain/repositories/demo.repository";
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

  public async findMany(): Promise<DemoEntity[]> {
    const demos = await this.prisma.demo.findMany();

    return demos.map(DemoEntity.create);
  }
}
