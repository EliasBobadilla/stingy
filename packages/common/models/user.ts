import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { User } from "../types/user";
import { add, createDynamoDB, findOne, update } from "./db";

const tableSchema = {
  TableName: "stingy-users",
  AttributeDefinitions: [
    {
      AttributeName: "email",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "email",
      KeyType: "HASH",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
} as const satisfies CreateTableCommandInput;

const client = await createDynamoDB(tableSchema);

export const addUser = async (user: User): Promise<void> => {
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
  params: Partial<User>,
): Promise<void> => {
  const tempo = await update<User>(
    client,
    tableSchema.TableName,
    { email },
    params,
  );
  console.log("###### UPDATE USER RESPONSE -->", tempo);
};

export const findUsers = async () => {
  return Promise.resolve([]);
};
