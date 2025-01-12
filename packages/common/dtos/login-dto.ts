import { z } from "zod";

export const loginDtoSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(4),
});

export type LoginDto = z.infer<typeof loginDtoSchema>;
