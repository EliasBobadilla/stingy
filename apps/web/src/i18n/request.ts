import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { SupportedLanguage } from "@repo/common/types/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined = await requestLocale;

  if (!locale || !routing.locales.includes(locale as SupportedLanguage)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
