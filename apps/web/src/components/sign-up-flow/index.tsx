"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { IFormData, SignUpForm } from "./sign-up-form";
import { OtpValidationForm } from "./opt-validation-form";
import { useAlerts } from "../alerts/AlertsContextClientProvider";
import { useRouter } from "next/navigation";

type RegisterUserResponse = { id: string; email: string };

export async function registerUser(
  user: IFormData
): Promise<RegisterUserResponse> {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (response.status === 200 || response.status === 201) {
    return data;
  }

  throw new Error(data);
}

export async function validateOtp(
  params: RegisterUserResponse & {
    otp: string;
  }
): Promise<boolean> {
  const response = await fetch("/api/otp", {
    method: "POST",
    body: JSON.stringify(params),
  });

  return response.status == 200;
}

export const SignUpFlow: React.FC = () => {
  const t = useTranslations("SignUp");
  const [user, setUser] = useState<RegisterUserResponse | null>(null);
  const router = useRouter();
  const { addAlert } = useAlerts();

  const handleRegisterSubmit = async (formData: IFormData) => {
    try {
      const registeredUser = await registerUser(formData);
      setUser(registeredUser);
    } catch {
      addAlert({
        severity: "alert-error",
        message: "Opps, something went wrong. Please try again. #1", // TODO: i18n
        timeout: 3,
      });
    }
  };

  const handleOptSubmit = async (otp: string) => {
    try {
      if (!user) {
        return;
      }

      const validated = await validateOtp({
        id: user.id,
        email: user.email,
        otp,
      });

      if (validated) {
        addAlert({
          severity: "alert-success",
          message: "Congrats! You are registered.", // TODO: i18n
          timeout: 3,
        });
        router.push("/login");
      }
    } catch {
      addAlert({
        severity: "alert-error",
        message: "Opps, something went wrong. Please try again. #2", // TODO: i18n
        timeout: 3,
      });
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
      <figure className="lg:w-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/login/800/600"
          alt="Random image"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title text-2xl font-bold mb-6">{t("title")}</h2>
        {user ? (
          <OtpValidationForm handleSubmit={handleOptSubmit} />
        ) : (
          <SignUpForm handleSubmit={handleRegisterSubmit} />
        )}
        <div className="divider">{t("divider")}</div>
        <div className="text-center">
          <p>{t("alreadyRegistered")}</p>
          <a href="#" className="link link-primary">
            {t("loginLink")}
          </a>
        </div>
      </div>
    </div>
  );
};
