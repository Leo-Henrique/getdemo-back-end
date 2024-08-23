import { PrismaClient } from "@prisma/client";
import { createChatgptDemo } from "./create-chatgpt-demo";

const prisma = new PrismaClient();

(async () => {
  await createChatgptDemo(prisma);
})();
