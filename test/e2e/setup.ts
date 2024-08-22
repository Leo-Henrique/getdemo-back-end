import { env } from "@/infra/env";
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { afterAll, beforeAll } from "vitest";

const schemaId = randomUUID();
const prisma = new PrismaClient();

function generateUniqueDatabaseURL() {
  const url = new URL(env.POSTGRES_URL);

  url.searchParams.set("schema", schemaId);

  return url.toString();
}

beforeAll(async () => {
  process.env.POSTGRES_URL = generateUniqueDatabaseURL();

  execSync("pnpm migrate:deploy");
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
