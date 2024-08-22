import { GetDemoBySlugUseCase } from "@/domain/use-cases/demo/get-demo-by-slug.use-case";
import { DemoPresenter } from "@/infra/presenters/demo.presenter";
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
  @Get("/demos/:slug")
  @HttpCode(200)
  @ZodSchemaPipe({
    routeParams: getDemoBySlugControllerParamsSchema,
    response: {
      200: DemoPresenter.zodSchema,
    },
  })
  async handle(@Param() { slug }: GetDemoBySlugControllerParams) {
    const { demo } = await this.getDemoBySlugUseCase.handle({ slug });

    return {
      demo: DemoPresenter.toHttp(demo),
    };
  }
}
