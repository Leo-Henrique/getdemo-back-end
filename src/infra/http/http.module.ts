import { GetDemoBySlugUseCase } from "@/domain/use-cases/demo/get-demo-by-slug.use-case";
import { ListDemosUseCase } from "@/domain/use-cases/demo/list-demos.use-case";
import { GetFrameByIdUseCase } from "@/domain/use-cases/frame/get-frame-by-id.use-case";
import { ListFramesByDemoIdUseCase } from "@/domain/use-cases/frame/list-frames-by-demo-id.use-case";
import { UpdateFrameHtmlUseCase } from "@/domain/use-cases/frame/update-frame-html.use-case";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { DatabaseModule } from "../database/database.module";
import { GetDemoBySlugController } from "./controllers/demo/get-demo-by-slug.controller";
import { ListDemosController } from "./controllers/demo/list-demos.controller";
import { GetFrameByIdController } from "./controllers/frame/get-frame-by-id.controller";
import { ListFramesByDemoIdController } from "./controllers/frame/list-frames-by-demo-id.controller";
import { UpdateFrameHtmlController } from "./controllers/frame/update-frame-html.controller";
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
    ListFramesByDemoIdUseCase,
    GetFrameByIdUseCase,
    UpdateFrameHtmlUseCase,
  ],
  controllers: [
    ListDemosController,
    GetDemoBySlugController,
    ListFramesByDemoIdController,
    GetFrameByIdController,
    UpdateFrameHtmlController,
  ],
})
export class HttpModule {}
