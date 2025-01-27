import { routing } from "@/i18n/routing";
import type { SupportedLanguage } from "@repo/common/types/i18n";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: SupportedLanguage }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const { title } = messages.LocaleLayout as { title: string };

  return (
    <html lang={locale}>
      <head>
        <title>{title}</title>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="h-screen w-100 flex items-center justify-center">
              {children}
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
