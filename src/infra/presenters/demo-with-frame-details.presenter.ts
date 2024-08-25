import { FrameEntity } from "@/domain/entities/frame.entity";
import { DemoWithFrameDetails } from "@/domain/repositories/demo.repository";
import { z } from "zod";
import { FramePresenter } from "./frame.presenter";

export class DemoWithFrameDetailsPresenter {
  public static toHttp(demo: DemoWithFrameDetails) {
    return {
      id: demo.id.value,
      slug: demo.slug.value,
      name: demo.name,
      createdAt: demo.createdAt,
      frames: demo.frames.map(frame => {
        if (frame instanceof FrameEntity) return frame.getRawData();

        return {
          id: frame.id.value,
          demoId: frame.demoId.value,
          order: frame.order,
        };
      }),
    };
  }

  public static get zodSchema() {
    return z.object({
      id: z.string().uuid(),
      slug: z.string(),
      name: z.string(),
      createdAt: z.date(),
      frames: z.array(FramePresenter.zodSchema),
    });
  }
}
