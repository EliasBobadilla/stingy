import { config } from "@repo/common/utils/config";
import { createLogger } from "winston"; // TODO: remove winston

const winston = createLogger();

export const logger = {
  info: (message: string, metadata: Record<string, unknown>) =>
    winston.info(message, metadata),
  error: (message: string, error: unknown) => winston.error(message, error),
  debug: (message: string, metadata: Record<string, unknown>) => {
    if (config.isDev) winston.debug(message, metadata);
  },
};
