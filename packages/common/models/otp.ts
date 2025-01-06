import type { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import type { Otp } from "../types/otp";
import type { DbClient } from "./db";
import { createdAt, expireAt, random4 } from "../utils/math";
import { ulid } from "ulid";
import { User } from "../types/user";
import { assertSome } from "../utils/validate";

export const otpSchema = {
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

type Client = DbClient<Otp>;

type Params = Partial<Otp>;

export const addOtp = async (client: Client, user: User): Promise<Otp> => {
  const otp: Otp = {
    code: random4(),
    email: user.email,
    expireAt: expireAt(10),
    id: ulid(),
    userId: user.id,
  };
  await client.add(otp);
  return otp;
};

export const deleteOtpByEmail = async (client: Client, email: string) => {
  const otps = await client.where({ email });
  await Promise.all(otps.map((otp) => client.deleteById(otp.id)));
};

export const getValidOtp = async (client: Client, { email, code }: Params) => {
  const otps = await client.where({ code, email });
  const currentTime = createdAt();
  const validOtp = otps.find((otp) => otp.expireAt > currentTime);

  assertSome(validOtp, `getting valid OTP for ${email}, code: ${code}`);
  return validOtp;
};
