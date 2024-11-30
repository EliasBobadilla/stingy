import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Stingy App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientProvider>{children}</ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}