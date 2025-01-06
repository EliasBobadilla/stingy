import type { z, ZodTypeAny } from "zod";
import { logger } from "../utils/logger";
import { isNonNullish } from "remeda";
import type { SupportedLanguage } from "../types/i18n";
import { SUPPORTED_LANGUAGES } from "../types/i18n";

export function assertSome<T>(
  arg?: T,
  metadata?: T | string,
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
    } }`,
  );
}

export function validateType<T extends ZodTypeAny>(
  schema: T,
  object: unknown,
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
  schema: T,
): Promise<z.infer<T>> {
  const dto = await req.json();
  const { success, error } = schema.safeParse(dto);
  if (!success || error) {
    logger.error(error);
    throw new Error("Invalid Zod Type");
  }
  return dto as z.infer<T>;
}

export const isSupportedLanguage = (
  locale?: string,
): locale is SupportedLanguage => {
  return (
    isNonNullish(locale) &&
    SUPPORTED_LANGUAGES.includes(locale as SupportedLanguage)
  );
};
