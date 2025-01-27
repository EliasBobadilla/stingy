"use client";

import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";

type Props = {
  session: Session | null;
};

export function LandingPage({ session }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
      return;
    }
  });

  return (
    <Navbar />
    // <PageLayout title={t("title")}>
    //   <h1>Landing page!</h1>
    //   <p>{t("loggedOut")}</p>
    //   <Link href={locale + "/login"}>{t("login")}</Link>
    // </PageLayout>
  );
}
