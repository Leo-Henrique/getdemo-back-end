import { DemoRepository } from "@/domain/repositories/demo.repository";
import { FrameRepository } from "@/domain/repositories/frame.repository";
import { Module, Provider } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaDemoRepository } from "./prisma/repositories/prisma-demo.repository";
import { PrismaFrameRepository } from "./prisma/repositories/prisma-frame.repository";

export const prismaRepositories = [
  {
    provide: DemoRepository,
    useClass: PrismaDemoRepository,
  },
  {
    provide: FrameRepository,
    useClass: PrismaFrameRepository,
  },
] satisfies Provider[];

@Module({
  providers: [PrismaService, ...prismaRepositories],
  exports: [PrismaService, ...prismaRepositories.map(({ provide }) => provide)],
})
export class DatabaseModule {}
