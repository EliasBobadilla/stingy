import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const LOCALES = ["en", "es"];
const DEFAULT_LOCALE = "es";

export const routing = defineRouting({
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  locales: LOCALES,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
