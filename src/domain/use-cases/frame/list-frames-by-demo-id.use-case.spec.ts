import { faker } from "@faker-js/faker";
import { makeDemo } from "test/factories/make-demo";
import { makeFrame } from "test/factories/make-frame";
import { InMemoryDemoRepository } from "test/repositories/in-memory-demo.repository";
import { InMemoryFrameRepository } from "test/repositories/in-memory-frame.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../../errors";
import { ListFramesByDemoIdUseCase } from "./list-frames-by-demo-id.use-case";

let demoRepository: InMemoryDemoRepository;
let frameRepository: InMemoryFrameRepository;
let sut: ListFramesByDemoIdUseCase;
let demo: ReturnType<typeof makeDemo>;
let frame: ReturnType<typeof makeFrame>;

describe("[Use Case] List frames by demo id", () => {
  beforeEach(async () => {
    frameRepository = new InMemoryFrameRepository();
    demoRepository = new InMemoryDemoRepository(frameRepository);
    sut = new ListFramesByDemoIdUseCase(demoRepository, frameRepository);
    demo = makeDemo();
    frame = makeFrame({ demoId: demo.entity.id.value });

    demoRepository.items.push(demo.entity);
    frameRepository.items.push(frame.entity);
  });

  it("should be able to list frames by demo id", async () => {
    for (let i = 0; i < 5; i++) {
      const anotherDemo = makeDemo();

      demoRepository.items.push(anotherDemo.entity);
    }

    const result = await sut.handle({ demoId: demo.entity.id.value });

    expect(result.frames[0].id.value).toEqual(frame.entity.id.value);
    expect(result.frames[0]).not.toHaveProperty("html");
  });

  it("should not be able to list frames with non-existent demo", async () => {
    const result = sut.handle({ demoId: faker.string.uuid() });

    await expect(result).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
