import { assertSome } from "../utils/validate";

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
assertSome(awsAccessKeyId, "AWS_ACCESS_KEY_ID");

const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
assertSome(awsSecretAccessKey, "AWS_SECRET_ACCESS_KEY");

const awsRegion = process.env.AWS_REGION ?? "us-east-1"; // default region

const jwtSecret = process.env.AUTH_SECRET;
assertSome(jwtSecret, "AUTH_SECRET");

const whatsappVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
assertSome(whatsappVerifyToken, "WEBHOOK_VERIFY_TOKEN");

const whatsappToken = process.env.WHATSAPP_TOKEN;
assertSome(whatsappToken, "WHATSAPP_TOKEN");

const whatsappPhoneNumber = process.env.WHATSAPP_PHONE_NUMBER;
assertSome(whatsappPhoneNumber, "WHATSAPP_PHONE_NUMBER");

const isDev = !process.env.VERCEL;

export const config = {
  awsAccessKeyId,
  awsRegion,
  awsSecretAccessKey,
  isDev,
  jwtSecret,
  whatsappPhoneNumber,
  whatsappToken,
  whatsappVerifyToken,
};

export type Config = typeof config;
