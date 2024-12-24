import { assertSome } from "../utils/validator";

const isDev = process.env.ENVIRONMENT === "dev"

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
assertSome(awsAccessKeyId,"AWS_ACCESS_KEY_ID")

const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
assertSome(awsSecretAccessKey,"AWS_SECRET_ACCESS_KEY")

const awsRegion = process.env.AWS_REGION
assertSome(awsRegion,"AWS_REGION")

const jwtSecret = process.env.AUTH_SECRET
assertSome(awsRegion,"AUTH_SECRET")

const nextAuthSecret = process.env.NEXTAUTH_SECRET
assertSome(awsRegion,"NEXTAUTH_SECRET")

const sessionSecret = process.env.SESSION_SECRET
assertSome(awsRegion,"SESSION_SECRET")

export const Config = {
    isDev,
    awsAccessKeyId,
    awsSecretAccessKey,
    awsRegion,
    jwtSecret,
    nextAuthSecret,
    sessionSecret
}