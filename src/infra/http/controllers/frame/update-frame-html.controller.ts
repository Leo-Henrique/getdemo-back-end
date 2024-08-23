import { UpdateFrameHtmlUseCase } from "@/domain/use-cases/frame/update-frame-html.use-case";
import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const updateFrameHtmlControllerParamsSchema = z.object({
  id: z.string(),
});

const updateFrameHtmlControllerBodySchema = z.object({
  html: z.string(),
});

type UpdateFrameHtmlControllerParams = z.infer<
  typeof updateFrameHtmlControllerParamsSchema
>;

export type UpdateFrameHtmlControllerBody = z.infer<
  typeof updateFrameHtmlControllerBodySchema
>;

@Controller()
export class UpdateFrameHtmlController {
  constructor(
    private readonly updateFrameHtmlUseCase: UpdateFrameHtmlUseCase,
  ) {}

  @ApiTags("Frames")
  @ApiOperation({ summary: "Atualiza o HTML de um frame." })
  @Patch("/frames/:id/html")
  @HttpCode(204)
  @ZodSchemaPipe({
    routeParams: updateFrameHtmlControllerParamsSchema,
    body: updateFrameHtmlControllerBodySchema,
  })
  async handle(
    @Param() { id }: UpdateFrameHtmlControllerParams,
    @Body() { html }: UpdateFrameHtmlControllerBody,
  ) {
    await this.updateFrameHtmlUseCase.handle({
      frameId: id,
      html,
    });
  }
}
