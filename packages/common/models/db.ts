import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteItemCommand,
  DynamoDB,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "../utils/config";

// URL for the local DynamoDB service
const endpoint = "http://localhost:8000";

/**
 * Create a DynamoDB client for the required schema
 * @param tableSchema - The table schema must only have the key/keys required for the CRUD processes
 * @returns - DynamoDB client
 */
export function createDynamoDB(tableSchema: CreateTableCommandInput) {
  const db = new DynamoDB({
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
    region: config.awsRegion,
    ...(config.isDev && { endpoint }),
  });

  void createTableIfNotExists(db, tableSchema);
  return db;
}

async function createTableIfNotExists(
  db: DynamoDB,
  tableSchema: CreateTableCommandInput,
) {
  const tables = await db.listTables({});
  if (tables.TableNames?.some((x) => x === tableSchema.TableName)) {
    return;
  }
  await db.send(new CreateTableCommand(tableSchema));
}

export function add<T>(db: DynamoDB, tableName: string, model: T) {
  const createdAt = Math.floor(new Date().getTime() / 1000);
  const params = {
    Item: marshall({ ...model, createdAt: createdAt.toString() }),
    TableName: tableName,
  };
  return db.putItem(params);
}

export async function findOne<T>(
  db: DynamoDB,
  tableName: string,
  key: Partial<T>,
) {
  const params = {
    Key: marshall(key),
    TableName: tableName,
  };

  const response = await db.getItem(params);

  if (response.Item) {
    return unmarshall(response.Item) as T;
  }

  return null;
}

export async function update<T>(
  db: DynamoDB,
  tableName: string,
  key: Partial<T>,
  item: Partial<T>,
) {
  const itemKeys = Object.keys(item);

  const response = await db.send(
    new UpdateItemCommand({
      ExpressionAttributeNames: itemKeys.reduce(
        (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
        {},
      ),
      ExpressionAttributeValues: marshall(
        itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`:value${index}`]: item[k as keyof T],
          }),
          {},
        ),
      ),
      Key: marshall(key),
      ReturnValues: "ALL_NEW",
      TableName: tableName,
      UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(", ")}`,
    }),
  );

  if (response.Attributes) {
    return unmarshall(response.Attributes) as T;
  }

  return null;
}

export async function deleteOne<T>(
  db: DynamoDB,
  tableName: string,
  key: Partial<T>,
) {
  const response = await db.send(
    new DeleteItemCommand({
      Key: marshall(key),
      TableName: tableName,
    }),
  );

  if (response.Attributes) {
    return unmarshall(response.Attributes) as T;
  }

  return null;
}
