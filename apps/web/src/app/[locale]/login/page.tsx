"use client";
import { useAlerts } from "@/components/alerts/AlertsContextClientProvider";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Login } from "@/components/login/login";

const Page = () => {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("SignIn");
  const { addAlert } = useAlerts();

  const handleLoginSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      addAlert({
        message: t("loginSuccess"),
        severity: "alert-success",
        timeout: 2,
      });
      router.push("/dashboard" + locale);
    } catch {
      addAlert({
        message: t("loginError"),
        severity: "alert-error",
        timeout: 3,
      });
    }
  };

  return <Login handleSubmit={handleLoginSubmit} />;
};

export default Page;
