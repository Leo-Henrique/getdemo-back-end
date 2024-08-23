import { AppModule } from "@/infra/app.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { MakeAndSaveDemo, makeDemo } from "test/factories/make-demo";
import { MakeAndSaveFrame, makeFrame } from "test/factories/make-frame";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { UpdateFrameHtmlControllerBody } from "./update-frame-html.controller";

const route = "/frames" as const;
const method = "PATCH" as const;

describe("[Controller] Update frame html", () => {
  let app: NestFastifyApplication;
  let prisma: PrismaService;
  let makeAndSaveDemo: MakeAndSaveDemo;
  let makeAndSaveFrame: MakeAndSaveFrame;
  let demo: ReturnType<typeof makeDemo>;
  let frame: ReturnType<typeof makeFrame>;
  let input: UpdateFrameHtmlControllerBody;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MakeAndSaveDemo, MakeAndSaveFrame],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    prisma = moduleRef.get(PrismaService);
    makeAndSaveDemo = moduleRef.get(MakeAndSaveDemo);
    makeAndSaveFrame = moduleRef.get(MakeAndSaveFrame);
    demo = await makeAndSaveDemo.execute();
    frame = await makeAndSaveFrame.execute({ demoId: demo.entity.id.value });

    input = {
      html: `<span>${faker.lorem.sentences()}</span>`,
    };

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`[${method}] ${route}/:id/html`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`${route}/${frame.entity.id.value}/html`)
      .send(input);

    expect(response.statusCode).toEqual(204);

    const frameOnDatabase = await prisma.frame.findUnique({
      where: { id: frame.entity.id.value },
    });

    expect(frameOnDatabase?.html).toEqual(input.html);
  });
});
