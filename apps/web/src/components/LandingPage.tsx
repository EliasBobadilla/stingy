"use client";

import PageLayout from "@/components/PageLayout";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  session: Session | null;
};

export function LandingPage({ session }: Props) {
  const t = useTranslations("Index");
  const locale = useLocale();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/secret");
      return;
    }
  });

  return (
    <PageLayout title={t("title")}>
      <h1>Landing page!</h1>
      <p>{t("loggedOut")}</p>
      <Link href={locale + "/login"}>{t("login")}</Link>
    </PageLayout>
  );
}
