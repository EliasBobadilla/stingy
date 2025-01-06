import type { Otp } from "../types/otp";
import {
  add,
  createTableIfNotExists,
  db,
  deleteById,
  getDefaultSchema,
  where,
} from "../models/db";
import { createdAt, expireAt, random4 } from "../utils/math";
import { ulid } from "ulid";
import type { User } from "../types/user";
import { assertSome } from "../utils/validate";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "stingy-otp" as const;
export const schema = getDefaultSchema(TABLE_NAME);

type Params = Partial<Otp>;

export const getOtpModel = async () => {
  await createTableIfNotExists(schema);
  const client = DynamoDBDocumentClient.from(db);

  return {
    add: async (user: User): Promise<Otp> => {
      const otp: Otp = {
        code: random4(),
        email: user.email,
        expireAt: expireAt(10),
        id: ulid(),
        userId: user.id,
      };
      await add(client, TABLE_NAME, otp);
      return otp;
    },
    deleteByEmail: async (email: string) => {
      const otps = await where<Otp>(client, TABLE_NAME, { email });
      await Promise.all(
        otps.map((otp) => deleteById(client, TABLE_NAME, otp.id)),
      );
    },
    dispose: () => {
      client.destroy();
    },
    get: async ({ email, code }: Params) => {
      const otps = await where<Otp>(client, TABLE_NAME, { code, email });
      const currentTime = createdAt();
      const validOtp = otps.find((otp) => otp.expireAt > currentTime);

      assertSome(validOtp, `getting valid OTP for ${email}, code: ${code}`);
      return validOtp;
    },
  };
};
