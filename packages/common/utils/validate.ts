import { z, ZodTypeAny } from "zod";
import { isNonNullish } from "remeda";

export function assertSome<T>(
  arg?: T,
  metadata?: T | string,
): asserts arg is T {
  if (isNonNullish(arg)) {
    return;
  }
  throw new Error(
    `Found nothing: ${JSON.stringify(arg)}. ${
      metadata ? "metadata: " + JSON.stringify(metadata) : ""
    } }`,
  );
}

export function validateType<T extends ZodTypeAny>(
  schema: T,
  object: unknown,
): object is z.infer<T> {
  return schema.safeParse(object).success;
}
