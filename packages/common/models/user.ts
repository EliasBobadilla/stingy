import type { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import type { User } from "../types/user";
import type { DbClient } from "./db";
import bcrypt from "bcrypt";
import { isNonNullish } from "remeda";

import { ulid } from "ulid";
import { assertSome } from "../utils/validate";

export const userSchema = {
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
  TableName: "stingy-users",
} as const satisfies CreateTableCommandInput;

type Client = DbClient<User>;

type Params = Partial<User>;

export const addUser = async (
  client: Client,
  user: {
    email: string;
    name: string;
    password: string;
    phone: string;
    role?: string;
  },
  skiIfExists?: boolean
): Promise<User> => {
  if (skiIfExists) {
    const [existingUser] = await client.where({ email: user.email });
    if (isNonNullish(existingUser)) {
      return existingUser;
    }
  }

  const newUser = {
    ...user,
    id: ulid(),
    password: await bcrypt.hash(user.password, 10),
    role: user.role ?? "admin", // TODO: hardcoding the role for now
    workspaces: ["demo"], // TODO: hardcoding the workspace for now
  };

  await client.add(newUser);
  return newUser;
};

export const findUserById = async (
  client: Client,
  id: string
): Promise<User> => {
  const [user] = await client.where({ id });
  assertSome(user, `unavailable to find the user with the Id: ${id}`);
  return user;
};

export const findUserByEmail = async (
  client: Client,
  email: string
): Promise<User> => {
  const [user] = await client.where({ email });
  assertSome(user, `unavailable to find the user with the email: ${email}`);
  return user;
};

export const updateUserById = async (
  client: Client,
  id: string,
  params: Params
): Promise<void> => {
  await client.updateById(id, params);
};

export const findUsers = async (client: Client, params: Params) => {
  return await client.where(params);
};
