import { isSupportedLanguage, SupportedLanguage } from "@/i18n/routing";
import { cookies } from "next/headers";

export async function getLanguage(): Promise<SupportedLanguage> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE");

  if (!isSupportedLanguage(locale?.value)) {
    throw new Error("Invalid language");
  }

  return locale.value;
}
