import { Injectable } from "@nestjs/common";
import { FrameEntity } from "../../entities/frame.entity";
import { ResourceNotFoundError } from "../../errors";
import { DemoRepository } from "../../repositories/demo.repository";
import { FrameRepository } from "../../repositories/frame.repository";

type ListFramesByDemoIdUseCaseInput = {
  demoId: string;
};

type ListFramesByDemoIdUseCaseOutput = {
  frames: FrameEntity["withoutHtml"][];
};

@Injectable()
export class ListFramesByDemoIdUseCase {
  public constructor(
    private readonly demoRepository: DemoRepository,
    private readonly frameRepository: FrameRepository,
  ) {}

  public async handle({
    demoId,
  }: ListFramesByDemoIdUseCaseInput): Promise<ListFramesByDemoIdUseCaseOutput> {
    const demo = await this.demoRepository.findUniqueById(demoId);

    if (!demo) throw new ResourceNotFoundError("Demo");

    const frames = await this.frameRepository.findManyByDemoId(demo.id.value);

    return { frames };
  }
}
