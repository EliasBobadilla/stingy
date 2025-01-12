/* eslint-disable no-console */

const logHeader = (log: string, message?: string) =>
  `###[${log}]###--> [${message}]`;

export const logger = {
  debug: (message: string, metadata: unknown) =>
    console.log(logHeader("debug", message), metadata),
  error: (error: unknown, message?: string) =>
    console.error(logHeader("error", message), error),
  info: (metadata: Record<string, unknown>) =>
    console.log(logHeader("info"), metadata),
};
