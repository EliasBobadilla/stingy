"use server";

import { signOut, signIn } from "@/auth";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}

export async function handleGoogleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}
