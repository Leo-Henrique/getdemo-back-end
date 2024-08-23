import { Injectable } from "@nestjs/common";
import { FrameEntity } from "../../entities/frame.entity";
import { ResourceNotFoundError } from "../../errors";
import { FrameRepository } from "../../repositories/frame.repository";

type GetFrameByIdUseCaseInput = {
  id: string;
};

type GetFrameByIdUseCaseOutput = {
  frame: FrameEntity;
};

@Injectable()
export class GetFrameByIdUseCase {
  public constructor(private readonly frameRepository: FrameRepository) {}

  public async handle({
    id,
  }: GetFrameByIdUseCaseInput): Promise<GetFrameByIdUseCaseOutput> {
    const frame = await this.frameRepository.findUniqueById(id);

    if (!frame) throw new ResourceNotFoundError("Frame");

    return { frame };
  }
}
