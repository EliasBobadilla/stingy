import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { User } from "../types/user";
import { add, createDynamoDB, findOne, update } from "./db";
import { createdAt } from "../utils/math";

const tableSchema = {
  AttributeDefinitions: [
    {
      AttributeName: "email",
      AttributeType: "S",
    },
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
    {
      AttributeName: "email",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "stingy-users",
} as const satisfies CreateTableCommandInput;

const client = createDynamoDB(tableSchema);

export const addUser = async (
  user: User,
  skipIfExists?: boolean
): Promise<void> => {
  // FIXME: weak logic to skip writing in the database if the user already exists
  // It must be validated at the database level
  if (skipIfExists && user?.createdAt) {
    if (user.createdAt < createdAt()) {
      return;
    }
  }

  await add(client, tableSchema.TableName, user);
};

export const findUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<User | null> =>
  findOne<User>(client, tableSchema.TableName, { email });

export const updateUserByEmail = async (
  email: string,
  params: Partial<User>
): Promise<void> => {
  await update<User>(client, tableSchema.TableName, { email }, params);
};

export const findUsers = async () => {
  return Promise.resolve([]);
};
