import {
  DynamoDB,
  CreateTableCommand,
  CreateTableCommandInput,
  ReturnValue,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { config } from "../utils/config";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// URL for the local DynamoDB service
const endpoint = "http://localhost:8000";

/**
 * Create a DynamoDB client for the required schema
 * @param tableSchema - The table schema must only have the key/keys required for the CRUD processes
 * @returns - DynamoDB client
 */
export async function createDynamoDB(tableSchema: CreateTableCommandInput) {
  const db = new DynamoDB({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
    ...(config.isDev && { endpoint }),
  });

  await createTableIfNotExists(db, tableSchema);
  return db;
}

async function createTableIfNotExists(
  db: DynamoDB,
  tableSchema: CreateTableCommandInput
) {
  const tables = await db.listTables({});
  if (tables.TableNames?.some((x) => x === tableSchema.TableName)) {
    return;
  }
  await db.send(new CreateTableCommand(tableSchema));
}

export function add<T>(db: DynamoDB, tableName: string, model: T) {
  const params = {
    TableName: tableName,
    Item: marshall(model),
  };
  return db.putItem(params);
}

export async function findOne<T>(
  db: DynamoDB,
  tableName: string,
  key: Partial<T>
) {
  const params = {
    TableName: tableName,
    Key: marshall(key),
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
  item: Partial<T>
) {
  const itemKeys = Object.keys(item);

  const response = await db.send(
    new UpdateItemCommand({
      TableName: tableName,
      Key: marshall(key),
      ReturnValues: "ALL_NEW",
      UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(", ")}`,
      ExpressionAttributeNames: itemKeys.reduce(
        (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
        {}
      ),
      ExpressionAttributeValues: marshall(
        itemKeys.reduce(
          (accumulator, k, index) => ({
            ...accumulator,
            [`:value${index}`]: item[k as keyof T],
          }),
          {}
        )
      ),
    })
  );

  if (response.Attributes) {
    return unmarshall(response.Attributes) as T;
  }

  return null;
}

export async function deleteOne<T>(
  db: DynamoDB,
  tableName: string,
  key: Partial<T>
) {
  const response = await db.send(
    new DeleteItemCommand({
      TableName: tableName,
      Key: marshall(key),
    })
  );

  if (response.Attributes) {
    return unmarshall(response.Attributes) as T;
  }

  return null;
}
