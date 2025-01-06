import { getRequestConfig } from "next-intl/server";
import { routing, SupportedLanguage } from "./routing";

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
