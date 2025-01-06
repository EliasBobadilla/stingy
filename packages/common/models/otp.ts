import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { Otp } from "../types/otp";
import { add, createTableIfNotExists, deleteById, where } from "./db";
import { createdAt, expireAt, random4 } from "../utils/math";
import { ulid } from "ulid";
import { User } from "../types/user";

const tableSchema = {
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
  TableName: "stingy-otp",
} as const satisfies CreateTableCommandInput;

export const otpClient = async () => {
  await createTableIfNotExists(tableSchema);
  return {
    add: async (user: User): Promise<Otp> => {
      const otp: Otp = {
        code: random4(),
        email: user.email,
        expireAt: expireAt(10),
        id: ulid(),
      };
      await add<Otp>(tableSchema.TableName, otp);
      return otp;
    },
    deleteOtp: async (email: string) => {
      const otps = await where<Otp>(tableSchema.TableName, { email });
      await Promise.all(
        otps.map((otp) => deleteById(tableSchema.TableName, { id: otp.id }))
      );
    },
    getValidOtp: async ({ email, code }: Partial<Otp>) => {
      const otps = await where<Otp>(tableSchema.TableName, { code, email });
      const currentTime = createdAt();

      const validOtp = otps.find((otp) => otp.expireAt < currentTime);
      return validOtp ?? null;
    },
  };
};
