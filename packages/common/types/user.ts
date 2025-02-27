export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  validated?: boolean;
  workspaces: string[];
  createdAt?: number;
}
