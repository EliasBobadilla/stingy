import { z } from "zod";

const otpRegex = new RegExp(/^\+?[1-9]\d{3}$/);

export const otpDtoSchema = z.object({
  email: z.string().email().min(5),
  otp: z.string().regex(otpRegex, "Invalid phone number."),
  userId: z.string(),
});

export type OtpDto = z.infer<typeof otpDtoSchema>;
