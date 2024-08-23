import { ListFramesByDemoIdUseCase } from "@/domain/use-cases/frame/list-frames-by-demo-id.use-case";
import { FramePresenter } from "@/infra/presenters/frame.presenter";
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const listFramesByDemoIdControllerParamsSchema = z.object({
  demoId: z.string().uuid(),
});

type ListFramesByDemoIdControllerParams = z.infer<
  typeof listFramesByDemoIdControllerParamsSchema
>;

@Controller()
export class ListFramesByDemoIdController {
  constructor(
    private readonly listFramesByDemoIdUseCase: ListFramesByDemoIdUseCase,
  ) {}

  @ApiTags("Frames")
  @Get("/demos/:demoId/frames")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: listFramesByDemoIdControllerParamsSchema,
    response: {
      200: z.array(FramePresenter.zodSchema),
    },
  })
  async handle(@Param() { demoId }: ListFramesByDemoIdControllerParams) {
    const { frames } = await this.listFramesByDemoIdUseCase.handle({ demoId });

    return {
      frames: frames.map(FramePresenter.toHttp),
    };
  }
}
