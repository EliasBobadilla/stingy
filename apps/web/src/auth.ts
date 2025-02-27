import { getUserModel } from "@repo/common/models/user-model";
import { config } from "@repo/common/utils/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // early return if no credentials
        if (!credentials) {
          return null;
        }

        // find user
        const client = await getUserModel();
        const [user] = await client.find({ email: credentials?.email });

        // early return if no user
        if (!user) {
          return null;
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        const { id, email } = user;
        client.dispose();

        return isPasswordCorrect
          ? {
              id,
              token: jwt.sign({ email, id }, config.jwtSecret!, {
                expiresIn: "30d",
              }),
            }
          : null;
      },
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      name: "Credentials",
    }),
  ],
};

export default auth;
