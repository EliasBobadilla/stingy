export interface WhatsappMsg {
  from: string;
  createdAt?: number;
  message: string;
  userId: string;
  email: string;
  processed: boolean;
  patron?: boolean;
}
