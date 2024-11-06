import type { WorkspaceRecordType } from "../enums.ts";

export interface WorkspaceRecord {
  id: string;
  description: string;
  recordType: WorkspaceRecordType;
  amount: number;
  workspaceId: string;
  categoryId: string;
  date: Date;
  time: string;
  fixed?: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}
