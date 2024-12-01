import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {createDynamoDB} from "./db";
import { User } from "@/types/user";

const client = createDynamoDB()

const TABLE_NAME = "stingy-users";

const MOCKED_USERS = [
  {
    id: "01JDYT3SMBK3F6X6DT2FWXXG77",
    email: "demo@emo",
    password: "456",
    name: "Zaile",
    role: "admin",
    image:
      "https://img.freepik.com/premium-vector/user-profile-icon-vector-1_666870-1779.jpg",
    class: "Mage",
    guild: "Hacker",
    inventory: {
      "Mechanical Keyboard": 1,
      "Kaihl Switches": 100,
      Coffee: 100000,
    },
    total_play_time: 3600,
  },
];

export const addUser = async (user: User): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: marshall(user),
  };
  await client.putItem(params);
};

export const findUser = async ({
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
  return Promise.resolve(MOCKED_USERS);
};
