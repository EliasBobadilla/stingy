import { assertSome } from "../utils/validator";

const isDev = process.env.ENVIRONMENT === "dev";

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
assertSome(awsAccessKeyId, "AWS_ACCESS_KEY_ID");

const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
assertSome(awsSecretAccessKey, "AWS_SECRET_ACCESS_KEY");

const awsRegion = process.env.AWS_REGION;
assertSome(awsRegion, "AWS_REGION");

const jwtSecret = process.env.AUTH_SECRET;
assertSome(jwtSecret, "AUTH_SECRET");

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
assertSome(nextAuthSecret, "NEXTAUTH_SECRET");

const sessionSecret = process.env.SESSION_SECRET;
assertSome(sessionSecret, "SESSION_SECRET");

export const config = {
  isDev,
  awsAccessKeyId,
  awsSecretAccessKey,
  awsRegion,
  jwtSecret,
  nextAuthSecret,
  sessionSecret,
};

export type Config = typeof config;
