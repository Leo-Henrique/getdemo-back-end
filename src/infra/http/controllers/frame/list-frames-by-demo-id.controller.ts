import { ListFramesByDemoIdUseCase } from "@/domain/use-cases/frame/list-frames-by-demo-id.use-case";
import { FrameWithoutHtmlPresenter } from "@/infra/presenters/frame-without-html.presenter";
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
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
  @ApiOperation({ summary: "Lista todos os frames de uma demo." })
  @Get("/demos/:demoId/frames")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: listFramesByDemoIdControllerParamsSchema,
    response: {
      200: z.array(FrameWithoutHtmlPresenter.zodSchema),
    },
  })
  async handle(@Param() { demoId }: ListFramesByDemoIdControllerParams) {
    const { frames } = await this.listFramesByDemoIdUseCase.handle({ demoId });

    return {
      frames: frames.map(FrameWithoutHtmlPresenter.toHttp),
    };
  }
}
