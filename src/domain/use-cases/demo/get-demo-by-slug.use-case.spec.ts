import { faker } from "@faker-js/faker";
import { makeDemo } from "test/factories/make-demo";
import { InMemoryDemoRepository } from "test/repositories/in-memory-demo.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "../../errors";
import { GetDemoBySlugUseCase } from "./get-demo-by-slug.use-case";

let demoRepository: InMemoryDemoRepository;
let sut: GetDemoBySlugUseCase;
let demo: ReturnType<typeof makeDemo>;

describe("[Use Case] Get demo by slug", () => {
  beforeEach(async () => {
    demoRepository = new InMemoryDemoRepository();
    sut = new GetDemoBySlugUseCase(demoRepository);
    demo = makeDemo();

    demoRepository.items.push(demo.entity);
  });

  it("should be able to get a demo by slug", async () => {
    const result = await sut.handle({ slug: demo.entity.slug.value });

    expect(result.demo).toEqual(demo.entity);
  });

  it("should not be able to get a non-existent demo", async () => {
    const result = sut.handle({ slug: faker.lorem.slug() });

    await expect(result).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
