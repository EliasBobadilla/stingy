import { z } from "zod";

export const otpDtoSchema = z.object({
  id: z.string(),
  email: z.string().email().min(5),
  otp: z.number(),
});

export type OtpDto = z.infer<typeof otpDtoSchema>;
