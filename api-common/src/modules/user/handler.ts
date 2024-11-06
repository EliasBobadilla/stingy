import { deleteOne, getMany, getOne, upsertOne } from "../../database/db.ts";
import type {
  User,
  UserCreateInput,
  UserUpdateInput,
} from "../../database/types/user.ts";

const PRIMARY_INDEX = "User";
const SECONDARY_INDEX = "UserEmail";

type UserKey = { email?: string; id?: string };

function getUserKey({ email, id }: UserKey): Deno.KvKey {
  if (id) return [PRIMARY_INDEX, id];
  if (email) return [SECONDARY_INDEX, email];
  throw new Error("Email or Id required"); //TODO: improve message
}

export function getUser(user: UserKey) {
  const key = getUserKey(user);
  return getOne<User>(key);
}

export function getUsers(users: UserKey[]) {
  const keys = users.map((user) => getUserKey(user));
  return getMany<User>(keys);
}

export async function addUser(dto: UserCreateInput) {
  const user = {
    ...dto,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const primaryKey = [PRIMARY_INDEX, user.id];
  const secondaryKey = [SECONDARY_INDEX, user.email];
  await upsertOne<User>(user, primaryKey, secondaryKey);
  return { id: primaryKey[1] };
}

export async function updateUser(dto: UserUpdateInput) {
  const user = await getUser({ id: dto.id });

  if (!user) {
    throw new Error("Not found"); //TODO: error handler
  }
  
  const primaryKey = [PRIMARY_INDEX, user.id];
  const secondaryKey = [SECONDARY_INDEX, user.email];
  await upsertOne<User>({ ...user, ...dto }, primaryKey, secondaryKey);
  return { id: primaryKey[1] };
}

export async function deleteUser(user: UserKey) {
  const key = getUserKey(user);
  await deleteOne(key);
  // TODO: delete all related data
  return { id: key[1] };
}
