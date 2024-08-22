import { Injectable } from "@nestjs/common";
import { DemoEntity } from "../../entities/demo.entity";
import { DemoRepository } from "../../repositories/demo.repository";

type ListDemosUseCaseOutput = {
  demos: DemoEntity[];
};

@Injectable()
export class ListDemosUseCase {
  public constructor(private readonly demoRepository: DemoRepository) {}

  public async handle(): Promise<ListDemosUseCaseOutput> {
    const demos = await this.demoRepository.findMany();

    return { demos };
  }
}
