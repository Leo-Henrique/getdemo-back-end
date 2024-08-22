import { makeDemo } from "test/factories/make-demo";
import { InMemoryDemoRepository } from "test/repositories/in-memory-demo.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ListDemosUseCase } from "./list-demos.use-case";

let demoRepository: InMemoryDemoRepository;
let sut: ListDemosUseCase;
let demo: ReturnType<typeof makeDemo>;

describe("[Use Case] List demos", () => {
  beforeEach(async () => {
    demoRepository = new InMemoryDemoRepository();
    sut = new ListDemosUseCase(demoRepository);
    demo = makeDemo();

    demoRepository.items.push(demo.entity);
  });

  it("should be able to list demos", async () => {
    const result = await sut.handle();

    expect(result.demos).toEqual([demo.entity]);
  });
});
