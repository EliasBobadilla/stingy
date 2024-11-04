export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
}
