import { z } from "zod";

export const userDtoSchema = z.object({
  email: z.string().email().min(5),
  name: z.string().min(2),
  password: z.string().min(4),
  phone: z.number().min(10),
});

export type UserDto = z.infer<typeof userDtoSchema>;
