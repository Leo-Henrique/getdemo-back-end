import { faker } from "@faker-js/faker";
import { makeFrame } from "test/factories/make-frame";
import { InMemoryFrameRepository } from "test/repositories/in-memory-frame.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../../errors";
import { UpdateFrameHtmlUseCase } from "./update-frame-html.use-case";

let frameRepository: InMemoryFrameRepository;
let sut: UpdateFrameHtmlUseCase;
let frame: ReturnType<typeof makeFrame>;

describe("[Use Case] Update frame html", () => {
  beforeEach(async () => {
    frameRepository = new InMemoryFrameRepository();
    sut = new UpdateFrameHtmlUseCase(frameRepository);
    frame = makeFrame();

    frameRepository.items.push(frame.entity);
  });

  it("should be able to update a frame", async () => {
    const newHtml = `<span>${faker.lorem.sentences()}</span>`;

    await sut.handle({
      frameId: frame.entity.id.value,
      html: newHtml,
    });

    expect(frameRepository.items[0].html).toEqual(newHtml);
  });

  it("should not be able to update a non-existent frame", async () => {
    const result = sut.handle({ frameId: faker.string.uuid(), html: "" });

    await expect(result).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
