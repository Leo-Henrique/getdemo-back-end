import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "../../errors";
import {
  DemoRepository,
  DemoWithFrameDetails,
} from "../../repositories/demo.repository";

type GetDemoBySlugUseCaseInput = {
  slug: string;
};

type GetDemoBySlugUseCaseOutput = {
  demo: DemoWithFrameDetails;
};

@Injectable()
export class GetDemoBySlugUseCase {
  public constructor(private readonly demoRepository: DemoRepository) {}

  public async handle({
    slug,
  }: GetDemoBySlugUseCaseInput): Promise<GetDemoBySlugUseCaseOutput> {
    const demo =
      await this.demoRepository.findUniqueBySlugWithFrameDetails(slug);

    if (!demo) throw new ResourceNotFoundError("Demo");

    return { demo };
  }
}
