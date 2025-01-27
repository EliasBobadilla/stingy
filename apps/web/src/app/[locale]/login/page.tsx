"use client";
import { useAlerts } from "@/components/alerts/AlertsContextClientProvider";
import { LoginAndRegisterLayout } from "@/components/login-and-register-flow/login-and-register-layout";
import { RecoveryPwdForm } from "@/components/login-and-register-flow/recovery-pwd-form";
import { SignInForm } from "@/components/login-and-register-flow/sign-in-form";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const RESET_PWD_FLOW = "reset-pwd";

const SignIn = () => {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const flow = searchParams.get("flow");
  const t = useTranslations("SignIn");
  const { addAlert } = useAlerts();
  const [isLogin, setIsLogin] = useState<boolean>(flow !== RESET_PWD_FLOW);

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
        timeout: 3,
      });
      router.push("/" + locale);
    } catch {
      addAlert({
        message: t("loginError"),
        severity: "alert-error",
        timeout: 3,
      });
    }
  };

  const handleResetPwdSubmit = async (password: string) => {
    // eslint-disable-next-line no-console
    console.log(password); // TODO: implement password reset
  };

  return (
    <LoginAndRegisterLayout
      title={t("title")}
      image="https://picsum.photos/seed/login/800/600"
    >
      <>
        {isLogin ? (
          <SignInForm handleSubmit={handleLoginSubmit} />
        ) : (
          <RecoveryPwdForm handleSubmit={handleResetPwdSubmit} />
        )}
        <div className="divider">{t("divider")}</div>
        <div className="text-center">
          <p>{isLogin ? t("forgotPassword") : t("alreadyRegistered")}</p>
          <a
            href="#"
            className="link link-primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? t("forgotPwdLink") : t("loginLink")}
          </a>
        </div>
        <div className="text-center">
          <p>{t("notHaveAccount")}</p>
          <Link href="/register" className="link link-primary">
            {t("notHaveAccountLink")}
          </Link>
        </div>
      </>
    </LoginAndRegisterLayout>
  );
};

export default SignIn;
