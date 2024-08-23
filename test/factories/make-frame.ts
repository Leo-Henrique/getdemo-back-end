import { FrameDataCreate, FrameEntity } from "@/domain/entities/frame.entity";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

type MakeFrameInput = Partial<FrameDataCreate>;

export function makeFrame(override: MakeFrameInput = {}) {
  const input = {
    demoId: faker.string.uuid(),
    html: `<p>${faker.lorem.text()}</p>`,
    order: faker.number.int({ min: 0, max: 100 }),
    ...override,
  } satisfies FrameDataCreate;
  const entity = FrameEntity.create(input);

  return { input, entity };
}

@Injectable()
export class MakeAndSaveFrame {
  public constructor(private readonly prisma: PrismaService) {}

  async execute(override: MakeFrameInput = {}) {
    const frame = makeFrame(override);

    await this.prisma.frame.create({ data: frame.entity.getRawData() });

    return frame;
  }
}
