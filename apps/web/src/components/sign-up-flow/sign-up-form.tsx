"use client";
import {
  EnvelopeIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export interface IFormData {
  email: string;
  name: string;
  password: string;
  phone: string;
}

interface ISignUpFormProps {
  handleSubmit: (formData: IFormData) => void;
}

export const SignUpForm: React.FC<ISignUpFormProps> = ({ handleSubmit }) => {
  const t = useTranslations("SignUp");
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    name: "",
    password: "",
    phone: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ZOD validation
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("username")}</span>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <UserIcon className="w-4 h-4 opacity-70" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="grow"
            placeholder={t("usernamePlaceholder")}
          />
        </label>
        <label className="label">
          <span className="label-text">{t("email")}</span>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <EnvelopeIcon className="w-4 h-4 opacity-70" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="grow"
            placeholder={t("emailPlaceholder")}
          />
        </label>
        <label className="label">
          <span className="label-text">{t("phone")}</span>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 opacity-70" />
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            className="grow"
            placeholder={t("phonePlaceholder")}
          />
        </label>
      </div>
      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">{t("password")}</span>
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <KeyIcon className="w-4 h-4 opacity-70" />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
            className="grow"
            placeholder={t("passwordPlaceholder")}
          />
        </label>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          {t("registerButton")}
        </button>
      </div>
    </form>
  );
};
