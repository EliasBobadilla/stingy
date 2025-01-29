import type { FormEvent } from "react";
import { LandingIntro } from "@/components/LandingIntro";
import { InputText } from "@/components/input/InputText";
import { Link } from "@/i18n/routing";
import { validateType } from "@repo/common/utils/validate";
import { loginDtoSchema } from "@repo/common/dtos/login-dto";
import { useAlerts } from "../alerts/AlertsContextClientProvider";
import { useTranslations } from "next-intl";

interface IProps {
  handleSubmit: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
}

export const Login = ({ handleSubmit }: IProps) => {
  const { addAlert } = useAlerts();
  const t = useTranslations("SignIn");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (validateType(loginDtoSchema, data)) {
      handleSubmit(data);
      return;
    }

    // form data is invalid
    if (!data.email) {
      addAlert({
        message: t("formDataError"), //TODO: Add this to the translation file
        severity: "alert-error",
        timeout: 2,
      });
    }

    if (!data.password) {
      addAlert({
        message: t("formDataError"), //TODO: Add this to the translation file
        severity: "alert-error",
        timeout: 2,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              {t("title")}
            </h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-4">
                <InputText
                  type="email"
                  inputName="email"
                  containerStyle="mt-4"
                  labelTitle={t("username")}
                  placeholder={t("usernamePlaceholder")}
                />

                <InputText
                  type="password"
                  inputName="password"
                  containerStyle="mt-4"
                  labelTitle={t("password")}
                  placeholder={t("passwordPlaceholder")}
                />
              </div>

              <div className="text-right text-primary">
                <Link href="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    {t("forgotPassword")}
                  </span>
                </Link>
              </div>

              <button type="submit" className="btn mt-2 w-full btn-primary">
                {t("submit")}
              </button>

              <div className="text-center mt-4">
                {t("notHaveAccount")}&nbsp;
                <Link href="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    {t("notHaveAccountLink")}
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
