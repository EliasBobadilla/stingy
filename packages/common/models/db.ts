import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DynamoDB,
} from "@aws-sdk/client-dynamodb";
import { config } from "../utils/config";
import { createdAt } from "../utils/math";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  ExecuteStatementCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { logger } from "../utils/logger";

const db = new DynamoDB({
  credentials: {
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  },
  region: config.awsRegion,
  ...(config.isDev && { endpoint: "http://localhost:8000" }),
});

const client = DynamoDBDocumentClient.from(db);

function isSuccessCallback({ httpStatusCode }: { httpStatusCode?: number }) {
  return httpStatusCode === 200;
}

/**
 * @link https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_Scenario_PartiQLSingle_section.html
 */
export async function where<T>(
  tableName: string,
  queryValues: Partial<T>
): Promise<T[]> {
  const keys = Object.keys(queryValues);
  const command = new ExecuteStatementCommand({
    Parameters: keys.map((k) => queryValues[k as keyof T]),
    Statement: `SELECT * FROM "${tableName}" WHERE ${keys.map((k) => `${k}=?`).join(" AND ")}`,
  });

  const { Items } = await client.send(command);
  return Items ? (Items as T[]) : [];
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

export async function deleteTable(tableName: string) {
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
  }
}

export async function add<Entity>(
  tableName: string,
  model: Entity & Required<{ id: string }>
) {
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

export async function updateById<T>(
  tableName: string,
  key: Partial<T>,
  item: Partial<T>
) {
  const itemKeys = Object.keys(item);
  const params = {
    ExpressionAttributeNames: itemKeys.reduce(
      (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
      {}
    ),
    ExpressionAttributeValues: itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`:value${index}`]: item[k as keyof T],
      }),
      {}
    ),
    Key: key,
    TableName: tableName,
    UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(", ")}`,
  };

  const { $metadata } = await client.send(new UpdateCommand(params));
  return isSuccessCallback($metadata);
}

export async function deleteById<T>(
  tableName: string,
  key: Partial<T> & Required<{ id: string }>
) {
  const params = {
    Key: key,
    TableName: tableName,
  };

  const { $metadata } = await client.send(new DeleteCommand(params));
  return isSuccessCallback($metadata);
}
