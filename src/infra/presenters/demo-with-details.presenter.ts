import { DemoWithDetails } from "@/domain/repositories/demo.repository";
import { z } from "zod";

export class DemoWithDetailsPresenter {
  public static toHttp(demoWithDetails: DemoWithDetails) {
    return {
      id: demoWithDetails.id.value,
      slug: demoWithDetails.slug.value,
      name: demoWithDetails.name,
      createdAt: demoWithDetails.createdAt,
      totalFrames: demoWithDetails.totalFrames,
    };
  }

  public static get zodSchema() {
    return z.object({
      id: z.string().uuid(),
      slug: z.string(),
      name: z.string(),
      totalFrames: z.number().int(),
    });
  }
}
