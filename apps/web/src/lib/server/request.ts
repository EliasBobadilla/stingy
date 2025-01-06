import { isSupportedLanguage } from "@repo/common/utils/validate";
import { cookies } from "next/headers";
import type { SupportedLanguage } from "@repo/common/types/i18n";

export async function getLanguage(): Promise<SupportedLanguage> {
  const cookieStore = await cookies();
  const nextLocale = cookieStore.get("NEXT_LOCALE");

  const locale = nextLocale?.value as SupportedLanguage;

  if (isSupportedLanguage(locale)) {
    return locale;
  }
  throw new Error("Invalid language");
}
