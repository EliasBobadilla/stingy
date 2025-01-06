"use client";
import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center">
        <Error statusCode={404} />
      </body>
    </html>
  );
}
