import { Injectable } from "@nestjs/common";
import { DemoEntity } from "../../entities/demo.entity";
import { ResourceNotFoundError } from "../../errors";
import { DemoRepository } from "../../repositories/demo.repository";

type GetDemoBySlugUseCaseInput = {
  slug: string;
};

type GetDemoBySlugUseCaseOutput = {
  demo: DemoEntity;
};

@Injectable()
export class GetDemoBySlugUseCase {
  public constructor(private readonly demoRepository: DemoRepository) {}

  public async handle({
    slug,
  }: GetDemoBySlugUseCaseInput): Promise<GetDemoBySlugUseCaseOutput> {
    const demo = await this.demoRepository.findUniqueBySlug(slug);

    if (!demo) throw new ResourceNotFoundError("Demo");

    return { demo };
  }
}
