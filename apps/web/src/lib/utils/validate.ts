import { z, ZodTypeAny } from "zod";

export function isValidDto<T extends ZodTypeAny>(
  schema: T,
  dto: unknown
): dto is z.infer<T> {
  return schema.safeParse(dto).success;
}
