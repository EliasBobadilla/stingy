import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { assertSome } from "@/utils/validator";

const region = "us-east-1";

export function createDynamoDB() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  
  assertSome(accessKeyId,"process.env.AWS_ACCESS_KEY_ID")
  assertSome(secretAccessKey,"process.env.AWS_SECRET_ACCESS_KEY")

  return new DynamoDB({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}