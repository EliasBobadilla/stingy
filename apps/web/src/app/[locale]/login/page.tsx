"use client";

import PageLayout from "@/components/PageLayout";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

export default function Login() {
  const locale = useLocale();
  const router = useRouter();

  const t = useTranslations("Login");

  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (error) setError("");

    const formData = new FormData(event.currentTarget);
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/" + locale);
      }
    });
  }

  return (
    <PageLayout title={t("title")}>
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
        {error && <p>{t("error", { error })}</p>}
        <button className="btn btn-primary" type="submit">
          {t("submit")}
        </button>
      </form>
    </PageLayout>
  );
}
