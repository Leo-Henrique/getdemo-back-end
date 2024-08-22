import { DemoEntity } from "@/domain/entities/demo.entity";
import { z } from "zod";

export class DemoPresenter {
  public static toHttp(demo: DemoEntity) {
    return demo.getRawData();
  }

  public static get zodSchema() {
    return z.object({
      id: z.string().uuid(),
      slug: z.string(),
      name: z.string(),
    });
  }
}
