import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { MakeAndSaveDemo, makeDemo } from "test/factories/make-demo";
import { MakeAndSaveFrame, makeFrame } from "test/factories/make-frame";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const route = "/frames" as const;
const method = "GET" as const;

describe("[Controller] Get frame by id", () => {
  let app: NestFastifyApplication;
  let makeAndSaveDemo: MakeAndSaveDemo;
  let makeAndSaveFrame: MakeAndSaveFrame;
  let demo: ReturnType<typeof makeDemo>;
  let frame: ReturnType<typeof makeFrame>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAndSaveDemo, MakeAndSaveFrame],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    makeAndSaveDemo = moduleRef.get(MakeAndSaveDemo);
    makeAndSaveFrame = moduleRef.get(MakeAndSaveFrame);
    demo = await makeAndSaveDemo.execute();
    frame = await makeAndSaveFrame.execute({ demoId: demo.entity.id.value });

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`[${method}] ${route}/:id`, async () => {
    const response = await request(app.getHttpServer()).get(
      `${route}/${frame.entity.id.value}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.frame).toEqual(frame.entity.getRawData());
  });
});
