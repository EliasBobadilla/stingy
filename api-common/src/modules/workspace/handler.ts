import { deleteOne, getMany, upsertOne } from "../../database/db.ts";
import type { Workspace } from "../../database/types/workspace.ts";

const PRIMARY_INDEX = "Workspace";

export function getWorkspaces(ids: string[]) {
  return getMany<Workspace>(
    ids.map((id) => [PRIMARY_INDEX, id])
  );
}

export async function upsertWorkspace(workspace: Workspace) {
  const result = await upsertOne<Workspace>(workspace, [PRIMARY_INDEX, workspace.id]);
  return Boolean(result);
}

export async function deleteWorkspace(id:string) {
  await deleteOne([PRIMARY_INDEX, id]);
  // TODO: delete all related data
}
