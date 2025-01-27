import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";

export const Navbar = () => {
  const t = useTranslations("Navbar");

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Stingy</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>{t("home")}</a>
          </li>
          <li>
            <a>{t("aboutUs")}</a>
          </li>
          <li>
            <a>{t("faq")}</a>
          </li>
          <li>
            <Link href="/login">{t("login")}</Link>
          </li>
          <li>
            <LocaleSwitcher />
          </li>
        </ul>
      </div>
    </div>
  );
};
