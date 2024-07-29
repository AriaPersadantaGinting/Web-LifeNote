import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prismaClient.$on("query", (e) => {
  logger.info(e);
});
prismaClient.$on("info", (e) => {
  logger.info(e);
});
prismaClient.$on("warn", (e) => {
  logger.info(e);
});
prismaClient.$on("error", (e) => {
  logger.info(e);
});
