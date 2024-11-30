import { assertSome } from "@repo/common/utils/validator";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

function createGoogleProvider() { 
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  assertSome(clientId,"process.env.GOOGLE_CLIENT_ID")
  assertSome(clientSecret,"process.env.GOOGLE_CLIENT_SECRET")

  return GoogleProvider({
    clientId,
    clientSecret,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  })
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    createGoogleProvider(),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
