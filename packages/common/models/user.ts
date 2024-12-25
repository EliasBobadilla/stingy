import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { createDynamoDB } from "./db";
import { User } from "../types/user";

const client = createDynamoDB();

const TABLE_NAME = "stingy-users";

export const addUser = async (user: User): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: marshall(user),
  };
  await client.putItem(params);
};

export const findUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<User | null> => {
  const params = {
    TableName: TABLE_NAME,
    Key: marshall({
      email: email,
    }),
  };

  const data = await client.getItem(params);

  if (data.Item) {
    return unmarshall(data.Item) as User;
  }

  return null;
};

export const findUsers = async () => {
  return Promise.resolve([]);
};
