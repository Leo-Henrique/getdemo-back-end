import { ListDemosUseCase } from "@/domain/use-cases/demo/list-demos.use-case";
import { DemoPresenter } from "@/infra/presenters/demo.presenter";
import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

@Controller()
export class ListDemosController {
  constructor(private readonly listDemosUseCase: ListDemosUseCase) {}

  @ApiTags("Demos")
  @ApiOperation({ summary: "Lista todas as demos existentes." })
  @Get("/demos")
  @HttpCode(200)
  @ZodSchemaPipe({
    response: {
      200: z.array(DemoPresenter.zodSchema),
    },
  })
  async handle() {
    const { demos } = await this.listDemosUseCase.handle();

    return {
      demos: demos.map(DemoPresenter.toHttp),
    };
  }
}
