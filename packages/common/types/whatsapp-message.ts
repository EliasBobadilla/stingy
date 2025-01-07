export interface WhatsappMsg {
  from: string;
  createdAt?: number;
  type: string;
  message: string;
  userId: string;
  email: string;
  processed?: boolean;
  patron?: boolean;
}
