import { GetFrameByIdUseCase } from "@/domain/use-cases/frame/get-frame-by-id.use-case";
import { FramePresenter } from "@/infra/presenters/frame.presenter";
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const getFrameByIdControllerParamsSchema = z.object({
  id: z.string(),
});

type GetFrameByIdControllerParams = z.infer<
  typeof getFrameByIdControllerParamsSchema
>;

@Controller()
export class GetFrameByIdController {
  constructor(private readonly getFrameByIdUseCase: GetFrameByIdUseCase) {}

  @ApiTags("Frames")
  @ApiOperation({ summary: "Obtém um único frame pelo id." })
  @Get("/frames/:id")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: getFrameByIdControllerParamsSchema,
    response: {
      200: FramePresenter.zodSchema,
    },
  })
  async handle(@Param() { id }: GetFrameByIdControllerParams) {
    const { frame } = await this.getFrameByIdUseCase.handle({ id });

    return {
      frame: FramePresenter.toHttp(frame),
    };
  }
}
