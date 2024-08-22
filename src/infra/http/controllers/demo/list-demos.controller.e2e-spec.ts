import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { MakeAndSaveDemo } from "test/factories/make-demo";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const route = "/demos" as const;
const method = "GET" as const;

describe("[Controller] List demos", () => {
  let app: NestFastifyApplication;
  let makeAndSaveDemo: MakeAndSaveDemo;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAndSaveDemo],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    makeAndSaveDemo = moduleRef.get(MakeAndSaveDemo);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`[${method}] ${route}`, async () => {
    const DEMOS_LENGTH = 3;

    for (let i = 0; i < DEMOS_LENGTH; i++) await makeAndSaveDemo.execute();

    const response = await request(app.getHttpServer()).get(route);

    expect(response.statusCode).toEqual(200);
    expect(response.body.demos).toHaveLength(DEMOS_LENGTH);
    expect(response.body.demos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          slug: expect.any(String),
          name: expect.any(String),
        }),
      ]),
    );
  });
});
