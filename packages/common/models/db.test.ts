import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { deleteTable, getDbClient } from "@/models/db";

jest.mock("../utils/config.ts", () => {
  return {
    config: {
      awsAccessKeyId: "stingyFakeKeyId",
      awsRegion: "stingyFakeRegion",
      awsSecretAccessKey: "stingyFakeSecretAccessKey",
      isDev: true,
      jwtSecret: "StingyFakeAuthSecret",
      whatsappPhoneNumber: "1234567890",
      whatsappToken: "fakeWaToken",
      whatsappVerifyToken: "fakeWebhookVerifyToken",
    },
  };
});

const TABLE_NAME = "user-test-table";

const TABLE_SCHEMA = {
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
  TableName: TABLE_NAME,
} as const satisfies CreateTableCommandInput;

type Character = {
  fullName: string;
  id: string;
  kind: string;
  city?: string;
};

const CHARACTERS: Character[] = [
  {
    fullName: "Stingy",
    id: "1@stingy",
    kind: "children",
  },
  {
    fullName: "Sportacus",
    id: "2@stingy",
    kind: "hero",
  },
  {
    fullName: "Stephanie",
    id: "3@stingy",
    kind: "hero",
  },
  {
    fullName: "Ziggy",
    id: "4@stingy",
    kind: "children",
  },
];

describe("CRUD operations", () => {
  beforeEach(async () => {
    jest.resetModules();
  });

  it("should delete table if exists", async () => {
    const result = await deleteTable(TABLE_NAME);
    expect(result).toBe(true);
  });

  it("should add four", async () => {
    const client = await getDbClient<Character>(TABLE_SCHEMA);
    const results = await Promise.all(CHARACTERS.map((c) => client.add(c)));
    client.dispose();
    expect(results).toStrictEqual([true, true, true, true]);
  });

  it("should query children", async () => {
    const client = await getDbClient<Character>(TABLE_SCHEMA);
    const results = await client.where({
      kind: "children",
    });

    expect(results).toHaveLength(2);
    expect(results[0]?.fullName).toBe(CHARACTERS[0]?.fullName);
    expect(results[0]?.kind).toBe(CHARACTERS[0]?.kind);
    expect(results[1]?.fullName).toBe(CHARACTERS[3]?.fullName);
    expect(results[1]?.kind).toBe(CHARACTERS[3]?.kind);
  });

  it("should query Sportacus", async () => {
    const client = await getDbClient<Character>(TABLE_SCHEMA);
    const results = await client.where({
      id: "2@stingy",
      kind: "hero",
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.fullName).toBe(CHARACTERS[1]?.fullName);
    expect(results[0]?.kind).toBe(CHARACTERS[1]?.kind);
  });

  it("should query Stephanie", async () => {
    const client = await getDbClient<Character>(TABLE_SCHEMA);
    const results = await client.where({
      fullName: "Stephanie",
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.fullName).toBe(CHARACTERS[2]?.fullName);
    expect(results[0]?.kind).toBe(CHARACTERS[2]?.kind);
  });

  it("should update Ziggy", async () => {
    const client = await getDbClient<Character>(TABLE_SCHEMA);
    const result = await client.updateById("4@stingy", {
      city: "LazyTown",
      fullName: "Ziggy Candy",
    });

    const updated = await client.where({
      id: "4@stingy",
      kind: "children",
    });

    expect(result).toBe(true);
    expect(updated).toHaveLength(1);
    expect(updated[0]?.fullName).toBe("Ziggy Candy");
    expect(updated[0]?.city).toBe("LazyTown");
  });

  it("should delete children", async () => {
    const client = await getDbClient<Character>(TABLE_SCHEMA);
    const results = await client.deleteById("1@stingy");

    const updated = await client.where({
      kind: "children",
    });

    expect(results).toBe(true);
    expect(updated).toHaveLength(1);
  });
});
