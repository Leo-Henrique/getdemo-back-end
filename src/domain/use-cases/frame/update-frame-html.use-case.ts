import { Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "../../errors";
import { FrameRepository } from "../../repositories/frame.repository";

type UpdateFrameHtmlUseCaseInput = {
  frameId: string;
  html: string;
};

type UpdateFrameHtmlUseCaseOutput = null;

@Injectable()
export class UpdateFrameHtmlUseCase {
  public constructor(private readonly frameRepository: FrameRepository) {}

  public async handle({
    frameId,
    html,
  }: UpdateFrameHtmlUseCaseInput): Promise<UpdateFrameHtmlUseCaseOutput> {
    const frame = await this.frameRepository.findUniqueById(frameId);

    if (!frame) throw new ResourceNotFoundError("Frame");

    frame.html = html;

    await this.frameRepository.updateUnique(frame, { html: frame.html });

    return null;
  }
}
