import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { config } from "../utils/config";

// URL for the local DynamoDB service.
const endpoint = "http://localhost:8000";

export function createDynamoDB() {
  return new DynamoDB({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
    ...(config.isDev && { endpoint }),
  });
}
