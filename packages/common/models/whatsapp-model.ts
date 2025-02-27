import {
  add,
  createTableIfNotExists,
  db,
  getDefaultSchema,
} from "../models/db";
import { ulid } from "ulid";
import type { WhatsappMsg } from "../types/whatsapp-message";
import type { User } from "../types/user";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "stingy-whatsapp-messages" as const;
export const schema = getDefaultSchema(TABLE_NAME);

export const getWhatsappModel = async () => {
  await createTableIfNotExists(schema);
  const client = DynamoDBDocumentClient.from(db);

  return {
    addMessage: async (
      user: User,
      type: string,
      message: string,
    ): Promise<WhatsappMsg> => {
      const msg = {
        email: user.email,
        from: user.phone,
        id: ulid(),
        message,
        patron: true, // TODO: fixed for now
        processed: false, // TODO: fixed for now
        type,
        userId: user.id,
      };
      await add(client, TABLE_NAME, msg);
      return msg;
    },
    dispose: () => {
      client.destroy();
    },
  };
};
