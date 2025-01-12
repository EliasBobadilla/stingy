"use client";

import { loginDtoSchema } from "@repo/common/dtos/login-dto";
import { validateType } from "@repo/common/utils/validate";
import { useTranslations } from "next-intl";
import type { FormEvent } from "react";
import { useAlerts } from "../alerts/AlertsContextClientProvider";

interface IProps {
  handleSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
}

export const SignInForm = ({ handleSubmit }: IProps) => {
  const t = useTranslations("SignIn");
  const { addAlert } = useAlerts();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (validateType(loginDtoSchema, values)) {
      handleSubmit(values);
      return;
    }

    addAlert({
      message: t("formDataError"),
      severity: "alert-error",
      timeout: 2,
    });
  }

  return (
    <form
      action="/api/auth/callback/credentials"
      method="post"
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 300,
      }}
    >
      <label style={{ display: "flex" }}>
        <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>
          {t("username")}
        </span>
        <input
          className="input input-bordered w-full max-w-xs"
          name="email"
          type="text"
        />
      </label>
      <label style={{ display: "flex" }}>
        <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>
          {t("password")}
        </span>
        <input
          className="input input-bordered w-full max-w-xs"
          name="password"
          type="password"
        />
      </label>
      <button className="btn btn-primary" type="submit">
        {t("submit")}
      </button>
    </form>
  );
};
