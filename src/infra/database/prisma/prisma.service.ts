import { Mapper } from "@/core/mapper";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Sql } from "@prisma/client/runtime/library";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["warn", "error"],
    });
  }

  onModuleInit() {
    return this.$connect();
  }

  onModuleDestroy() {
    return this.$disconnect();
  }

  public async sql<Row extends Record<string, unknown> | unknown = unknown>(
    query: TemplateStringsArray | Sql,
    ...values: unknown[]
  ) {
    const rows = await this.$queryRaw<Record<string, unknown>[]>(
      query,
      ...values,
    );
    const result = [];

    for (const row of rows) {
      result.push(Mapper.toCamelCaseProperties(row));
    }

    return result as Row[];
  }
}
