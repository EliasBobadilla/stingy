import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const LOCALES = ["en", "es"];
const DEFAULT_LOCALE = "es";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
