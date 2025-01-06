import { z, ZodTypeAny } from "zod";
import { logger } from "./logger";

export function assertSome<T>(
  arg?: T,
  metadata?: T | string
): asserts arg is T {
  if (Array.isArray(arg) && arg.length > 0) {
    return;
  }
  if (arg !== null && arg !== undefined) {
    if (typeof arg === "string" && arg.length > 0) {
      return;
    }
    if (typeof arg === "number" && arg > 0) {
      return;
    }
    if (typeof arg === "object" && Object.keys(arg).length > 0) {
      return;
    }
  }

  throw new Error(
    `Found nothing${
      metadata ? " - [metadata]: " + JSON.stringify(metadata) : ""
    } }`
  );
}

export function validateType<T extends ZodTypeAny>(
  schema: T,
  object: unknown
): object is z.infer<T> {
  const { success, error } = schema.safeParse(object);
  if (error) {
    logger.debug("Zod", error);
  }
  return success;
}
