import { GetDemoBySlugUseCase } from "@/domain/use-cases/demo/get-demo-by-slug.use-case";
import { ListDemosUseCase } from "@/domain/use-cases/demo/list-demos.use-case";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { DatabaseModule } from "../database/database.module";
import { GetDemoBySlugController } from "./controllers/demo/get-demo-by-slug.controller";
import { ListDemosController } from "./controllers/demo/list-demos.controller";
import { AllExceptionFilter } from "./errors/filters/all-exception.filter";
import { DomainExceptionFilter } from "./errors/filters/domain-exception.filter";
import { FastifyMulterEventModule } from "./events/fastify-multer.event.module";

@Module({
  imports: [FastifyMulterEventModule, DatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    ListDemosUseCase,
    GetDemoBySlugUseCase,
  ],
  controllers: [ListDemosController, GetDemoBySlugController],
})
export class HttpModule {}
