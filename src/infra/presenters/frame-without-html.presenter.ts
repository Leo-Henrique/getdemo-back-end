import { FrameEntity } from "@/domain/entities/frame.entity";
import { z } from "zod";

export class FrameWithoutHtmlPresenter {
  public static toHttp(frameWithoutHtml: FrameEntity["withoutHtml"]) {
    return {
      id: frameWithoutHtml.id.value,
      demoId: frameWithoutHtml.demoId.value,
      order: frameWithoutHtml.order,
    };
  }

  public static get zodSchema() {
    return z.object({
      id: z.string().uuid(),
      demoId: z.string().uuid(),
      order: z.number().int().positive(),
    });
  }
}
