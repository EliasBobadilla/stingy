import { assertSome } from "../utils/validator";

export type Config = {
  isDev: boolean;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsRegion: string;
  jwtSecret: string;
  sessionSecret: string;
};

// avoid using .env.* files to reduce the project's initial setup boilerplate
function getEnvironmentVariables(isDev: boolean): Config {
  if (isDev) {
    return {
      isDev,
      awsAccessKeyId: "stingyFakeKeyId",
      awsSecretAccessKey: "stingyFakeSecretAccessKey",
      awsRegion: "stingyFakeRegion",
      jwtSecret: "StingyFakeAuthSecret",
      sessionSecret: "StingyFakeSessionSecret",
    };
  }

  const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
  assertSome(awsAccessKeyId, "AWS_ACCESS_KEY_ID");

  const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  assertSome(awsSecretAccessKey, "AWS_SECRET_ACCESS_KEY");

  const awsRegion = process.env.AWS_REGION ?? "us-east-1"; // default AWS region

  const jwtSecret = process.env.AUTH_SECRET;
  assertSome(jwtSecret, "AUTH_SECRET");

  const sessionSecret = process.env.SESSION_SECRET;
  assertSome(sessionSecret, "SESSION_SECRET");

  return {
    isDev,
    awsAccessKeyId,
    awsSecretAccessKey,
    awsRegion,
    jwtSecret,
    sessionSecret,
  };
}

const isDev = !Boolean(process.env.VERCEL);

export const config = getEnvironmentVariables(isDev);
