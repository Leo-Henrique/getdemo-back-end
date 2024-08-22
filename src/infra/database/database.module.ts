import { DemoRepository } from "@/domain/repositories/demo.repository";
import { Module, Provider } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaDemoRepository } from "./prisma/repositories/prisma-demo.repository";

export const prismaRepositories = [
] satisfies Provider[];

@Module({
  providers: [PrismaService, ...prismaRepositories],
  exports: [PrismaService, ...prismaRepositories.map(({ provide }) => provide)],
})
export class DatabaseModule {}
