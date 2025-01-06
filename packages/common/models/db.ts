import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DynamoDB,
} from "@aws-sdk/client-dynamodb";
import { config } from "@/utils/config";
import { createdAt } from "@/utils/math";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  ExecuteStatementCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { logger } from "@/utils/logger";
import { assertSome } from "@/utils/validate";

export const db = new DynamoDB({
  credentials: {
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  },
  region: config.awsRegion,
  ...(config.isDev && { endpoint: "http://localhost:8000" }),
});

type Entity<T> = Partial<T> & Required<{ id: string }>;

export function getDefaultSchema(tableName: string): CreateTableCommandInput {
  return {
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: tableName,
  };
}

export async function add<T>(
  client: DynamoDBDocumentClient,
  tableName: string,
  model: Entity<T>
) {
  assertSome(model.id);
  const params = {
    ConditionExpression: "attribute_not_exists(id)",
    Item: {
      ...model,
      createdAt: createdAt(),
    },
    TableName: tableName,
  };
  const { $metadata } = await client.send(new PutCommand(params));
  return isSuccessCallback($metadata);
}

export async function deleteById(
  client: DynamoDBDocumentClient,
  tableName: string,
  id: string
) {
  const params = {
    Key: { id },
    TableName: tableName,
  };
  const { $metadata } = await client.send(new DeleteCommand(params));
  return isSuccessCallback($metadata);
}

export async function updateById<T>(
  client: DynamoDBDocumentClient,
  tableName: string,
  id: string,
  item: Partial<T>
) {
  const itemKeys = Object.keys(item);
  const params = {
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`#field${index}`]: k,
      }),
      {}
    ),
    ExpressionAttributeValues: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`:value${index}`]: item[k as keyof T],
      }),
      {}
    ),
    Key: { id },
    TableName: tableName,
    UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(", ")}`,
  };
  const { $metadata } = await client.send(new UpdateCommand(params));
  return isSuccessCallback($metadata);
}

/**
 * @link https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_Scenario_PartiQLSingle_section.html
 */
export async function where<T>(
  client: DynamoDBDocumentClient,
  tableName: string,
  params: Partial<T>
) {
  const keys = Object.keys(params);
  const command = new ExecuteStatementCommand({
    Parameters: keys.map((k) => params[k as keyof T]),
    Statement: `SELECT * FROM "${tableName}" WHERE ${keys.map((k) => `${k}=?`).join(" AND ")}`,
  });
  const { Items } = await client.send(command);
  return Items ? (Items as T[]) : [];
}

export async function deleteTable(tableName: string) {
  const client = DynamoDBDocumentClient.from(db);
  try {
    const { $metadata } = await client.send(
      new DeleteTableCommand({ TableName: tableName })
    );
    return isSuccessCallback($metadata);
  } catch (caught) {
    if (
      caught instanceof Error &&
      caught.name === "ResourceNotFoundException"
    ) {
      return true;
    }
    return false;
  } finally {
    client.destroy();
  }
}

export async function createTableIfNotExists(
  tableSchema: CreateTableCommandInput
) {
  try {
    const { $metadata } = await db.send(new CreateTableCommand(tableSchema));
    return isSuccessCallback($metadata);
  } catch (caught) {
    if (
      caught instanceof Error &&
      caught.message.includes("preexisting table")
    ) {
      return true;
    }
    logger.error(
      caught,
      `Unable to create the table "${tableSchema.TableName}"`
    );
    return false;
  }
}

function isSuccessCallback({ httpStatusCode }: { httpStatusCode?: number }) {
  return httpStatusCode === 200;
}
