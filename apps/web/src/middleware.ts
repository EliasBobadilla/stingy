import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSession, decrypt } from "./app/lib/session";
import { auth } from "./auth";
import { findUser } from "@/models/user";

const PROTECTED_ROUTES = ["/dashboard"];

const PUBLIC_ROUTES = ["/login", "/"];

const ROLE_BASED_ROUTES: Record<string, string> = {
  "/admin": "admin",
  "/manager": "manager",
  "/cto": "cto",
};

async function getSession() {
  const cookie = (await cookies()).get("session")?.value; // custom session
  if (cookie) {
    return await decrypt(cookie);
  }

  const authSession = await auth(); // next auth session

  if (!authSession || !authSession?.user?.email) {
    return;
  }

  const currentUser = await findUser({
    email: authSession.user.email,
  });

  if (!currentUser) {
    return;
  }

  const { id, name, email, role } = currentUser;

  const sessionPayload = {
    userId: id,
    name,
    email,
    role,
    expiresAt: new Date(authSession!.expires),
  };

  await createSession(sessionPayload);

  return sessionPayload;
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.includes(path);
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const session = await getSession();

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  for (const route in ROLE_BASED_ROUTES) {
    if (path.startsWith(route)) {
      const requiredRole = ROLE_BASED_ROUTES[route];
      if (session?.role !== requiredRole) {
        return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}
