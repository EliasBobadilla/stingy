/* eslint-disable no-console */
import { config } from "./config";

const logHeader = (log: string, message: string) =>
  `###--> Logger: [${log}][${message}]`;

export const logger = {
  debug: (message: string, metadata: Record<string, unknown>) => {
    if (config.isDev) console.debug(logHeader("debug", message), metadata);
  },
  error: (message: string, error: unknown) =>
    console.error(logHeader("error", message), error),
  info: (message: string, metadata: Record<string, unknown>) =>
    console.info(logHeader("info", message), metadata),
};
