import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@repo/common/types/i18n";

export const routing = defineRouting({
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: "as-needed",
  locales: SUPPORTED_LANGUAGES,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
