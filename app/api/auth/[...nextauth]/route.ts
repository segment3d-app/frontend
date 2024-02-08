/* eslint-disable react-hooks/rules-of-hooks */
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverAxios } from "@/utils/axios";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "app-login",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (typeof credentials !== "undefined") {
          try {
            const res = await serverAxios.post("/api/auth/signin", {
              email: credentials.email,
              password: credentials.password,
            });
            const {
              user: { id, email, name, avatar },
              accessToken,
            } = res.data;
            return Promise.resolve({
              id: id,
              name: name,
              email: email,
              image: avatar,
              accessToken: accessToken,
            });
          } catch (err) {
            return Promise.reject(err);
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        console.log("from signin", account, profile);
      }
      return true;
    },
    async session({ session, token }) {
      if (session) {
        console.log("from session", session, token);
        session = Object.assign({}, session, {
          access_token: token.accessToken,
        });
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        console.log("from token", account, token);
        token = Object.assign({}, token, {
          access_token: account.accessToken,
        });
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
