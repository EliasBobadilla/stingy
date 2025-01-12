"use client";
import { useAlerts } from "@/components/alerts/AlertsContextClientProvider";
import { LoginAndRegisterLayout } from "@/components/login-and-register-flow/login-and-register-layout";
import { OtpValidationForm } from "@/components/login-and-register-flow/opt-validation-form";
import { SignUpForm } from "@/components/login-and-register-flow/sign-up-form";
import type { OtpDto } from "@repo/common/dtos/otp-dto";
import { otpDtoSchema } from "@repo/common/dtos/otp-dto";
import type { UserDto } from "@repo/common/dtos/user-dto";
import { validateType } from "@repo/common/utils/validate";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterUserResponse = { id: string; email: string };

export async function registerUser(
  user: UserDto,
): Promise<RegisterUserResponse> {
  const response = await fetch("/api/register", {
    body: JSON.stringify(user),
    method: "POST",
  });

  const data = await response.json();

  if (response.status === 200 || response.status === 201) {
    return data;
  }

  throw new Error(data);
}

export async function validateOtp(params: OtpDto): Promise<boolean> {
  const response = await fetch("/api/otp", {
    body: JSON.stringify(params),
    method: "POST",
  });

  return response.status == 200;
}

const SignUp = () => {
  const t = useTranslations("SignUp");
  const [user, setUser] = useState<RegisterUserResponse | null>(null);
  const router = useRouter();
  const { addAlert } = useAlerts();

  const handleRegisterSubmit = async (formData: UserDto) => {
    try {
      const registeredUser = await registerUser(formData);
      setUser(registeredUser);
    } catch {
      addAlert({
        message: t("registerError"),
        severity: "alert-error",
        timeout: 3,
      });
    }
  };

  const handleOptSubmit = async (otp: string) => {
    try {
      const otpCode = {
        code: otp,
        email: user?.email,
        userId: user?.id,
      };

      if (validateType(otpDtoSchema, otpCode)) {
        const validated = await validateOtp(otpCode);

        if (validated) {
          addAlert({
            message: t("registerSuccess"),
            severity: "alert-success",
            timeout: 3,
          });
          router.push("/login");
        }
      }
    } catch {
      addAlert({
        message: t("registerError"),
        severity: "alert-error",
        timeout: 3,
      });
    }
  };

  return (
    <LoginAndRegisterLayout
      title={t("title")}
      image="https://picsum.photos/seed/login/800/600"
    >
      <>
        {user ? (
          <OtpValidationForm handleSubmit={handleOptSubmit} />
        ) : (
          <SignUpForm handleSubmit={handleRegisterSubmit} />
        )}
        <div className="divider">{t("divider")}</div>
        <div className="text-center">
          <p>{t("alreadyRegistered")}</p>
          <Link href="/login" className="link link-primary">
            {t("loginLink")}
          </Link>
        </div>
      </>
    </LoginAndRegisterLayout>
  );
};

export default SignUp;
