import { z, ZodTypeAny } from "zod";
import { logger } from "./logger";
import { isNonNullish } from "remeda";

export function assertSome<T>(
  arg?: T,
  metadata?: T | string
): asserts arg is T {
  if (Array.isArray(arg) && arg.length > 0) {
    return;
  }
  if (isNonNullish(arg)) {
    return;
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
  logger.error(error);
  if (error) {
    logger.error(error);
    throw new Error("Invalid Zod Type");
  }
  return success;
}

export async function getValidatedDto<T extends ZodTypeAny>(
  req: Request,
  schema: T
): Promise<z.infer<T>> {
  const dto = await req.json();
  const { success, error } = schema.safeParse(dto);
  if (!success || error) {
    logger.error(error);
    throw new Error("Invalid Zod Type");
  }
  return dto as z.infer<T>;
}
