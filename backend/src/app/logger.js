import winston from "winston";

export const logger = winston.createLogger({
  level: "info", // Level default, ini berarti log dengan level info dan di bawahnya akan diproses
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` to `error.log`
    // - Write all logs with importance level of `info` to `combined.log` (but not errors)
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({
      filename: "combined.log",
      level: "info",
      handleExceptions: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

// If we're not in production then log to the console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
