import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { MakeAndSaveDemo, makeDemo } from "test/factories/make-demo";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const route = "/demos" as const;
const method = "GET" as const;

describe("[Controller] List demos", () => {
  let app: NestFastifyApplication;
  let makeAndSaveDemo: MakeAndSaveDemo;
  let demo: ReturnType<typeof makeDemo>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAndSaveDemo],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    makeAndSaveDemo = moduleRef.get(MakeAndSaveDemo);
    demo = await makeAndSaveDemo.execute();

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`[${method}] ${route}/:slug`, async () => {
    await makeAndSaveDemo.execute();

    const response = await request(app.getHttpServer()).get(
      `${route}/${demo.entity.slug.value}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.demo).toEqual(
      expect.objectContaining({
        ...demo.entity.getRawData(),
        frames: expect.any(Object),
      }),
    );
  });
});
