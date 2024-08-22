import { DemoDataCreate, DemoEntity } from "@/domain/entities/demo.entity";
import { faker } from "@faker-js/faker";

type MakeDemoInput = Partial<DemoDataCreate>;

export function makeDemo(override: MakeDemoInput = {}) {
  const input = {
    name: faker.company.name(),
    ...override,
  } satisfies DemoDataCreate;
  const entity = DemoEntity.create(input);

  return { input, entity };
}
