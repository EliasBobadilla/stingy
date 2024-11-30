"use client";

import Navbar from "@/components/TopNav";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar session={session} /> */}
      <Navbar />
      {children}
    </>
  );
}
