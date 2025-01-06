import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const DEFAULT_LANGUAGE = "es" as const;
const SUPPORTED_LANGUAGES = ["en", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const routing = defineRouting({
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: "as-needed",
  locales: SUPPORTED_LANGUAGES,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export const isSupportedLanguage = (
  locale?: string
): locale is SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(locale as SupportedLanguage);
