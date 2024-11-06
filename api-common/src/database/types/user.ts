import type { Theme } from "../enums.ts";

export interface User {
  id: string;
  email: string;
  password: string;
  profile: {
    country: string;
    phoneNumber: string;
    name: string;
    language: string;
    theme?: Theme;
  };
  workspaceIds: Array<{ id: string }>;
  createdAt: Date;
  updatedAt: Date;
}


export type UserCreateInput = Omit<User, "id" | "createdAt" | "updatedAt">;

export type UserUpdateInput = Omit<User, "createdAt" | "updatedAt">;