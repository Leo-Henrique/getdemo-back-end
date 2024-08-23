import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { MakeAndSaveDemo, makeDemo } from "test/factories/make-demo";
import { MakeAndSaveFrame } from "test/factories/make-frame";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const route = "/demos" as const;
const method = "GET" as const;

describe("[Controller] List frames by demo id", () => {
  let app: NestFastifyApplication;
  let makeAndSaveDemo: MakeAndSaveDemo;
  let makeAndSaveFrame: MakeAndSaveFrame;
  let demo: ReturnType<typeof makeDemo>;

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

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`[${method}] ${route}/:demoId/frames`, async () => {
    const FRAMES_LENGTH = 2;

    await Promise.all(
      Array.from({ length: FRAMES_LENGTH }).map(() => {
        return makeAndSaveFrame.execute({ demoId: demo.entity.id.value });
      }),
    );

    const anotherDemo = await makeAndSaveDemo.execute();

    await Promise.all(
      Array.from({ length: 2 }).map(() => {
        return makeAndSaveFrame.execute({
          demoId: anotherDemo.entity.id.value,
        });
      }),
    );

    const response = await request(app.getHttpServer()).get(
      `${route}/${demo.entity.id.value}/frames`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.frames).toHaveLength(FRAMES_LENGTH);
    expect(response.body.frames).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          demoId: demo.entity.id.value,
          html: expect.any(String),
          order: expect.any(Number),
        }),
      ]),
    );
  });
});
