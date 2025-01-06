import { z } from "zod";

const otpRegex = new RegExp(/^\+?[1-9]\d{3}$/);

export const otpDtoSchema = z.object({
  code: z.string().regex(otpRegex, "Invalid phone number."),
  email: z.string().email().min(5),
  userId: z.string(),
});

export type OtpDto = z.infer<typeof otpDtoSchema>;
