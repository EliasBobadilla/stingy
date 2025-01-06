export interface WhatsappMsgDto {
  from: string;
  timestamp: number;
  type: string;
  text: { body: string };
}
