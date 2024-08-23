import { faker } from "@faker-js/faker";
import { makeFrame } from "test/factories/make-frame";
import { InMemoryFrameRepository } from "test/repositories/in-memory-frame.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../../errors";
import { GetFrameByIdUseCase } from "./get-frame-by-id.use-case";

let frameRepository: InMemoryFrameRepository;
let sut: GetFrameByIdUseCase;
let frame: ReturnType<typeof makeFrame>;

describe("[Use Case] Get frame by id", () => {
  beforeEach(async () => {
    frameRepository = new InMemoryFrameRepository();
    sut = new GetFrameByIdUseCase(frameRepository);
    frame = makeFrame();

    frameRepository.items.push(frame.entity);
  });

  it("should be able to get a frame by id", async () => {
    const result = await sut.handle({ id: frame.entity.id.value });

    expect(result.frame).toEqual(frame.entity);
  });

  it("should not be able to get a non-existent frame", async () => {
    const result = sut.handle({ id: faker.string.uuid() });

    await expect(result).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
