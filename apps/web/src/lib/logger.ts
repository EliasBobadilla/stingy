import { config } from "@repo/common/utils/config";
import { createLogger, format, transports } from "winston";

const winston =
  createLogger();
  //   {
  //   format: format.json(),
  //   transports: [
  //     new transports.File({
  //       filename: "tmp/errors.json",
  //       level: "error",
  //       handleExceptions: true,
  //       maxsize: 5242880, // 5MB
  //       maxFiles: 5,
  //       format: format.combine(format.timestamp(), format.json({ space: 2 })),
  //     }),
  //   ],
  // }

winston.add(
  new transports.Console({
    level: "debug",
    format: format.combine(format.colorize(), format.simple()),
  })
);

export const logger = {
  info: (message: string, metadata: Record<string, unknown>) =>
    winston.info(message, metadata),
  error: (message: string, error: unknown) => winston.error(message, error),
  debug: (message: string, metadata: Record<string, unknown>) => {
    if (config.isDev) winston.debug(message, metadata);
  },
};

// logger.info(message, metadata);
// logger.error(msg, error);
// logger.debug(message, metadata);
