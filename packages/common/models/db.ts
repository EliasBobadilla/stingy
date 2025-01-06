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

type Entity<T> = Partial<T> & Required<{ id: string }>;

export type DbClient<T> = {
  add: (model: Entity<T>) => Promise<boolean>;
  deleteById: (id: string) => Promise<boolean>;
  dispose: () => void;
  updateById: (id: string, attributeValues: Partial<T>) => Promise<boolean>;
  where: (queryValues: Partial<T>) => Promise<T[]>;
};

export const getDbClient = async <T>(
  tableSchema: CreateTableCommandInput
): Promise<DbClient<T>> => {
  const client = DynamoDBDocumentClient.from(db);
  await createTableIfNotExists(tableSchema);
  return {
    /**
     * Create entity in db if doesn't exits, `id` field is required
     */
    add: async (model: Entity<T>) => {
      assertId(model);
      const params = {
        ConditionExpression: "attribute_not_exists(id)",
        Item: {
          ...model,
          createdAt: createdAt(),
        },
        TableName: tableSchema.TableName,
      };
      const { $metadata } = await client.send(new PutCommand(params));
      return isSuccessCallback($metadata);
    },
    /**
     * Delete one entity, `id` field is required
     */
    deleteById: async (id: string) => {
      const params = {
        Key: { id },
        TableName: tableSchema.TableName,
      };
      const { $metadata } = await client.send(new DeleteCommand(params));
      return isSuccessCallback($metadata);
    },
    dispose: () => {
      client.destroy();
    },
    updateById: async (id: string, item: Partial<T>) => {
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
        TableName: tableSchema.TableName,
        UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(", ")}`,
      };
      const { $metadata } = await client.send(new UpdateCommand(params));
      return isSuccessCallback($metadata);
    },
    /**
     * @link https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_Scenario_PartiQLSingle_section.html
     */
    where: async (queryValues: Partial<T>) => {
      const keys = Object.keys(queryValues);
      const command = new ExecuteStatementCommand({
        Parameters: keys.map((k) => queryValues[k as keyof T]),
        Statement: `SELECT * FROM "${tableSchema.TableName}" WHERE ${keys.map((k) => `${k}=?`).join(" AND ")}`,
      });
      const { Items } = await client.send(command);
      return Items ? (Items as T[]) : [];
    },
  };
};

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

async function createTableIfNotExists(tableSchema: CreateTableCommandInput) {
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

function assertId({ id }: { id?: string }) {
  if (!id) {
    logger.error("The field id is required");
  }
}
