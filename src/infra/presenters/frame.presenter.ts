import { FrameEntity } from "@/domain/entities/frame.entity";
import { z } from "zod";

export class FramePresenter {
  public static toHttp(frame: FrameEntity) {
    return frame.getRawData();
  }

  public static get zodSchema() {
    return z.object({
      id: z.string().uuid(),
      demoId: z.string().uuid(),
      html: z.string(),
      order: z.number().int().positive(),
    });
  }
}
