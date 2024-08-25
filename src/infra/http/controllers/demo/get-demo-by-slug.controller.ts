import { GetDemoBySlugUseCase } from "@/domain/use-cases/demo/get-demo-by-slug.use-case";

import { DemoWithFrameDetailsPresenter } from "@/infra/presenters/demo-with-frame-details.presenter";
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { z } from "zod";
import { ZodSchemaPipe } from "../../middlewares/zod-schema-pipe";

const getDemoBySlugControllerParamsSchema = z.object({
  slug: z.string(),
});

type GetDemoBySlugControllerParams = z.infer<
  typeof getDemoBySlugControllerParamsSchema
>;

@Controller()
export class GetDemoBySlugController {
  constructor(private readonly getDemoBySlugUseCase: GetDemoBySlugUseCase) {}

  @ApiTags("Demos")
  @ApiOperation({ summary: "Obtém uma única demo pelo slug." })
  @Get("/demos/:slug")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: getDemoBySlugControllerParamsSchema,
    response: {
      200: DemoWithFrameDetailsPresenter.zodSchema,
    },
  })
  async handle(@Param() { slug }: GetDemoBySlugControllerParams) {
    const { demo } = await this.getDemoBySlugUseCase.handle({ slug });

    return {
      demo: DemoWithFrameDetailsPresenter.toHttp(demo),
    };
  }
}
