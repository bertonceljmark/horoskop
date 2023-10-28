import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
let { prisma: globalPrisma }: any = global;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalPrisma) {
    globalPrisma = new PrismaClient();
  }
  prisma = globalPrisma;
}

export default prisma;
