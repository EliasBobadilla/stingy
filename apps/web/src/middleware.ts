import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

type AuthMiddleware = (req: NextRequest) => Response | Promise<Response>;

const publicPages = ["/", "/login", "/otp", "/register"];

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: "/login",
  },
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as AuthMiddleware)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Skip all paths that should not be internationalized
};
