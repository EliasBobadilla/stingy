import { z } from "zod";

const phoneRegex = new RegExp(/^\+?[1-9]\d{1,14}$/);

export const userDtoSchema = z.object({
  email: z.string().email().min(5),
  name: z.string().min(2),
  password: z.string().min(4),
  phone: z.string().regex(phoneRegex, "Invalid phone number."),
});

export type UserDto = z.infer<typeof userDtoSchema>;
