"use client";

import PageLayout from "@/components/PageLayout";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations("Dashboard");

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
};

export default Dashboard;
