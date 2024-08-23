import { Injectable } from "@nestjs/common";
import {
  DemoRepository,
  DemoWithDetails,
} from "../../repositories/demo.repository";

type ListDemosUseCaseOutput = {
  demos: DemoWithDetails[];
};

@Injectable()
export class ListDemosUseCase {
  public constructor(private readonly demoRepository: DemoRepository) {}

  public async handle(): Promise<ListDemosUseCaseOutput> {
    const demos = await this.demoRepository.findManyWithDetails();

    return { demos };
  }
}
