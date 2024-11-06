import { upsertOne } from "../../database/db.ts";
import {getDateKey} from "#common/utils/keys.ts"
import type { WorkspaceRecord } from "../../database/types/workspace-record.ts";

const PRIMARY_INDEX = "WsRecord";

const getWsRecordIndex = (workspaceId: string)=>`${PRIMARY_INDEX}_${workspaceId}_${getDateKey()}`

export async function addWorkspaceRecord(record: WorkspaceRecord) {
  const index = getWsRecordIndex(record.workspaceId);
  const result = await upsertOne<WorkspaceRecord>(record, [index, record.id]);
  return Boolean(result);
}