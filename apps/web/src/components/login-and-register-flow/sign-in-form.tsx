"use client";

import {
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
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
    >
       <div className="form-control">
       <label className="label">
          <span className="label-text">{t("username")}</span>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <UserIcon className="w-4 h-4 opacity-70" />
          <input
            type="text"
            id="email"
            name="email"
            required
            className="grow"
            placeholder={t("usernamePlaceholder")}
          />
        </label>
        <label className="label">
          <span className="label-text">{t("password")}</span>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <KeyIcon className="w-4 h-4 opacity-70" />
          <input
            type="password"
            id="password"
            name="password"
            required
            className="grow"
            placeholder={t("passwordPlaceholder")}
          />
        </label>
       </div>
       <div className="form-control mt-6">
      <button className="btn btn-primary" type="submit">
        {t("submit")}
      </button>
      </div>
    </form>
  );
};
