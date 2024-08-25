import { faker } from "@faker-js/faker";
import { makeDemo } from "test/factories/make-demo";
import { makeFrame } from "test/factories/make-frame";
import { InMemoryDemoRepository } from "test/repositories/in-memory-demo.repository";
import { InMemoryFrameRepository } from "test/repositories/in-memory-frame.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../../errors";
import { GetDemoBySlugUseCase } from "./get-demo-by-slug.use-case";

let frameRepository: InMemoryFrameRepository;
let demoRepository: InMemoryDemoRepository;
let sut: GetDemoBySlugUseCase;
let demo: ReturnType<typeof makeDemo>;

describe("[Use Case] Get demo by slug", () => {
  beforeEach(async () => {
    frameRepository = new InMemoryFrameRepository();
    demoRepository = new InMemoryDemoRepository(frameRepository);
    sut = new GetDemoBySlugUseCase(demoRepository);
    demo = makeDemo();

    demoRepository.items.push(demo.entity);
  });

  it("should be able to get a demo by slug", async () => {
    const result = await sut.handle({ slug: demo.entity.slug.value });

    expect(result.demo).toEqual({ ...demo.entity, frames: [] });
  });

  it("should be able to list frames from demo", async () => {
    for (let i = 0; i < 5; i++) {
      const frame = makeFrame({ demoId: demo.entity.id.value, order: i });
      const anotherFrame = makeFrame();

      frameRepository.items.push(frame.entity);
      frameRepository.items.push(anotherFrame.entity);
    }

    const result = await sut.handle({ slug: demo.entity.slug.value });

    expect(result.demo).toEqual(expect.objectContaining({ ...demo.entity }));
    expect(result.demo.frames).toHaveLength(5);
    expect(result.demo.frames).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ demoId: demo.entity.id }),
      ]),
    );
    expect(result.demo.frames).toEqual(
      Array.from({ length: 5 }).map((_, index) =>
        expect.objectContaining({ order: index }),
      ),
    );
    expect(result.demo.frames[0]).toHaveProperty("html");
    expect(result.demo.frames[1]).not.toHaveProperty("html");
  });

  it("should not be able to get a non-existent demo", async () => {
    const result = sut.handle({ slug: faker.lorem.slug() });

    await expect(result).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
