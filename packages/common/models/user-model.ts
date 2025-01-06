import type { User } from "../types/user";
import {
  add,
  createTableIfNotExists,
  db,
  getDefaultSchema,
  updateById,
  where,
} from "../models/db";
import bcrypt from "bcrypt";
import { isNonNullish } from "remeda";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import { assertSome } from "../utils/validate";

type Params = Partial<User>;

const TABLE_NAME = "stingy-users" as const;
export const schema = getDefaultSchema(TABLE_NAME);

export const getUserModel = async () => {
  await createTableIfNotExists(schema);
  const client = DynamoDBDocumentClient.from(db);

  return {
    add: async (
      user: {
        email: string;
        name: string;
        password: string;
        phone: string;
        role?: string;
      },
      skiIfExists?: boolean,
    ): Promise<User> => {
      if (skiIfExists) {
        const [existingUser] = await where<User>(client, TABLE_NAME, {
          email: user.email,
        });
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

      await add(client, TABLE_NAME, newUser);
      return newUser;
    },
    dispose: () => {
      client.destroy();
    },
    find: async (params: Partial<User>) => {
      return await where(client, TABLE_NAME, params);
    },
    findOrThrow: async (params: Partial<User>): Promise<User> => {
      const [user] = await where<User>(client, TABLE_NAME, params);
      assertSome(
        user,
        `unavailable to find the user: ${JSON.stringify(params)}`,
      );
      return user;
    },
    updateById: async (id: string, params: Params): Promise<void> => {
      await updateById(client, TABLE_NAME, id, params);
    },
  };
};
