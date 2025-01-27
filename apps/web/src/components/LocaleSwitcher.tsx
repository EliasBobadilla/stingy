import { Link, usePathname } from "@/i18n/routing";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@repo/common/types/i18n";
import { useLocale, useTranslations } from "next-intl";
import "flag-icons/css/flag-icons.min.css";

const LANGUAGE_TO_FLAG: { [k in SupportedLanguage]: string } = {
  en: "fi fi-us",
  es: "fi fi-pe",
} as const;

const LanguageWithFlag = ({ language }: { language: SupportedLanguage }) => {
  const t = useTranslations("LocaleSwitcher");
  return (
    <>
      <span className={LANGUAGE_TO_FLAG[language]} />
      <span>{t(language)}</span>
    </>
  );
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <details>
      <summary>
        <LanguageWithFlag language={locale as SupportedLanguage} />
      </summary>
      <ul className="bg-base-100 rounded-t-none p-2">
        {SUPPORTED_LANGUAGES.map((language) => (
          <li key={language}>
            <Link href={pathname} locale={language} className="justify-between">
              <LanguageWithFlag language={language} />
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
