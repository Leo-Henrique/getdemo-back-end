import { DemoDataCreate, DemoEntity } from "@/domain/entities/demo.entity";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

type MakeDemoInput = Partial<DemoDataCreate>;

export function makeDemo(override: MakeDemoInput = {}) {
  const input = {
    name: faker.company.name(),
    ...override,
  } satisfies DemoDataCreate;
  const entity = DemoEntity.create(input);

  return { input, entity };
}
@Injectable()
export class MakeAndSaveDemo {
  public constructor(private readonly prisma: PrismaService) {}

  async execute(override: MakeDemoInput = {}) {
    const demo = makeDemo(override);

    await this.prisma.demo.create({ data: demo.entity.getRawData() });

    return demo;
  }
}
