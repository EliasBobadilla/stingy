import { z } from "zod";

export const otpDtoSchema = z.object({
  email: z.string().email().min(5),
  id: z.string(),
  otp: z.number(),
});

export type OtpDto = z.infer<typeof otpDtoSchema>;
