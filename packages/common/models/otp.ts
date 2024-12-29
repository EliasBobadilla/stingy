import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { add, createDynamoDB, deleteOne, findOne } from "./db";
import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { Otp } from "../types/otp";

const tableSchema = {
  TableName: "stingy-otp",
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

export const addOtp = async (otp: Otp): Promise<void> => {
  await add(client, tableSchema.TableName, otp);
};

export const findOtpByEmail = async ({
  email,
}: {
  email: string;
}): Promise<Otp | null> =>
  findOne<Otp>(client, tableSchema.TableName, { email });

export const deleteOtp = async (email: string) => {
  return await deleteOne<Otp>(client, tableSchema.TableName, { email });
};
