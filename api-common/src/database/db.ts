const kv = await Deno.openKv("./db.sqlite3");

export async function getOne<T>(key: Deno.KvKey) {
  const user = await kv.get<T>(key);
  return user.value;
}

export async function getMany<T>(keys: Deno.KvKey[]) {
  const models = await kv.getMany<T[]>(
    keys.map((key) => key),
  );
  return models.map((model) => model.value);
}

export async function upsertOne<T>(
  model: T,
  primaryKey: Deno.KvKey,
  secondaryKey?: Deno.KvKey,
) {
  const result = await kv.set(primaryKey, model); // primary index
  if (secondaryKey) {
    await kv.set(secondaryKey, primaryKey); // secondary index
  }
  return result.versionstamp;
}

export async function deleteOne(key: Deno.KvKey) {
  await kv.delete(key);
}
