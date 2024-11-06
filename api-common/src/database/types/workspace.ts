import type { Category } from "./category.ts";

export interface Workspace {
  id: string;
  currency: string;
  userIds: Array<{ id: string }>;
  categories: Category[];
  createdAt: Date;
  updatedAt?: Date;
}
