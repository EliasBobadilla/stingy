"use client";
import AlertsProvider from "@/components/alerts/AlertsContextClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AlertsProvider>{children}</AlertsProvider>;
}
