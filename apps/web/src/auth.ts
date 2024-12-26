import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { findUserByEmail } from "@repo/common/models/user";
import jwt from "jsonwebtoken";
import { config } from "@repo/common/utils/config";

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        // early return if no credentials
        if (!credentials) {
          return null;
        }

        const user = await findUserByEmail(credentials);

        // early return if no user
        if (!user) {
          return null;
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        const { id, email } = user;

        return isPasswordCorrect
          ? {
              id,
              token: jwt.sign({ id, email }, config.jwtSecret, {
                expiresIn: "30d",
              }),
            }
          : null;
      },
    }),
  ],
};

export default auth;
