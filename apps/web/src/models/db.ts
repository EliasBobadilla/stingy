"use server";

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { assertSome } from "@repo/common/utils/validator";

const region = "us-east-1";

function createDynamoDB() {
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  assertSome(accessKeyId)
  assertSome(secretAccessKey)

  return new DynamoDB({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

const client = createDynamoDB()

export default client
