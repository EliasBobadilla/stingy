import type { WorkspaceRecordType } from "../enums.ts";

export interface Category {
  id: string;
  name: string;
  type: WorkspaceRecordType;
  createdAt: Date;
  updatedAt?: Date;
}