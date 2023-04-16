import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/config/config";

// https://next-auth.js.org/configuration/initialization
export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      credentials: {},
      async authorize({ email, password }: any) {
        const response = await fetch(`${API_URL}/api/v1/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const json = await response.json();

        // Set cookie (how many days? === 1)
        // res.setHeader(
        //   "Set-Cookie",
        //   `token=${json.token}; path=/; expires=${new Date(
        //     Date.now() + 1000 * 60 * 60 * 24 * 1
        //   ).toUTCString()}; httponly`
        // );

        if (json.error) {
          throw new Error(json.error);
        }

        const loginRes = {
          ...json,
        };

        return json;
      },
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/account/login",
    },
    session: {
      strategy: "jwt",
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {},
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);
        // console.log("token", token);
        // console.log("user", user);

        return token;
      },
      session: async ({ session, token }: any) => {
        session.user = token.user;
        return session;
      },
    },
  });
}
