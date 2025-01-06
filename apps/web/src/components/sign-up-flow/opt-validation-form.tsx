import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";

interface IProps {
  handleSubmit: (code: string) => void;
}

export const OtpValidationForm = ({ handleSubmit }: IProps) => {
  const t = useTranslations("SignUp");
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target as HTMLInputElement);
      if (index >= 0) {
        setOtp((prevOpt) => {
          return prevOpt.map((digit, i) => {
            return i !== index ? digit : "";
          });
        });

        const previousRef = inputRefs.current[index - 1];
        if (previousRef) {
          previousRef.focus();
        }
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target as HTMLInputElement);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        const nextRef = inputRefs.current[index + 1];
        if (nextRef) {
          nextRef.focus();
        }
      }
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const otpLengthRegex = new RegExp(`^[0-9]{4}}$`);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!otpLengthRegex.test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(otp.join(""));
  };

  return (
    <form onSubmit={onSubmit}>
      <section className="flex gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onPaste={handlePaste}
            ref={(el) => {
              inputRefs.current[Number(index)] = el;
            }}
            className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
          />
        ))}
      </section>
      <button type="submit" className="btn btn-primary">
        {t("registerButton")}
      </button>
    </form>
  );
};
