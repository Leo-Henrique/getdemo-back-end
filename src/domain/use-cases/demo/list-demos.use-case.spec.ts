import { makeDemo } from "test/factories/make-demo";
import { InMemoryDemoRepository } from "test/repositories/in-memory-demo.repository";
import { InMemoryFrameRepository } from "test/repositories/in-memory-frame.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListDemosUseCase } from "./list-demos.use-case";

let frameRepository: InMemoryFrameRepository;
let demoRepository: InMemoryDemoRepository;
let sut: ListDemosUseCase;
let demo: ReturnType<typeof makeDemo>;

describe("[Use Case] List demos", () => {
  beforeEach(async () => {
    frameRepository = new InMemoryFrameRepository();
    demoRepository = new InMemoryDemoRepository(frameRepository);
    sut = new ListDemosUseCase(demoRepository);
    demo = makeDemo();

    demoRepository.items.push(demo.entity);
  });

  it("should be able to list demos", async () => {
    const result = await sut.handle();

    expect(result.demos).toEqual([expect.objectContaining(demo.entity)]);
  });
});
