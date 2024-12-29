"use client";

import PageLayout from "@/components/PageLayout";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Secret() {
  const t = useTranslations("Secret");

  function onLogoutClick() {
    signOut();
  }

  return (
    <PageLayout title={t("title")}>
      <p>{t("description")}</p>
      <div>
        <button
          className="btn btn-primary"
          onClick={onLogoutClick}
          type="button"
        >
          {t("logout")}
        </button>
      </div>
    </PageLayout>
  );
}
