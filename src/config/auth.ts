// NextAuth v5 Configuration
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

// Login schema for credentials
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

import { prisma } from "./prisma";

function getAuthConfig() {
  return {
    adapter: PrismaAdapter(prisma),

    providers: [
      // Google OAuth (only if credentials are provided)
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? [
            Google({
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              allowDangerousEmailAccountLinking: true,
            }),
          ]
        : []),

      // GitHub OAuth (only if credentials are provided)
      ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
        ? [
            GitHub({
              clientId: process.env.GITHUB_CLIENT_ID,
              clientSecret: process.env.GITHUB_CLIENT_SECRET,
              allowDangerousEmailAccountLinking: true,
            }),
          ]
        : []),

      // Credentials (Email/Password)
      Credentials({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            const { email, password } = loginSchema.parse(credentials);

            // Find user by email
            const user = await prisma.user.findUnique({
              where: { email },
            });

            if (!user || !user.password) {
              return null;
            }

            // Verify password with bcrypt
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
              return null;
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.avatarUrl || user.image,
              role: user.role,
            };
          } catch {
            return null;
          }
        },
      }),
    ],

    session: {
      strategy: "jwt" as const,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },

    pages: {
      signIn: "/login",
      signOut: "/",
      error: "/login",
    },

    callbacks: {
      async jwt({ token, user, account }: any) {
        // Initial sign in — store id, role, image in token
        if (user) {
          token.id = user.id as string;
          token.role = (user.role as string) || "user";
          const img = user.avatarUrl || user.image;
          if (img) token.picture = img;
        }

        // OAuth sign in - store provider info
        if (account) {
          token.provider = account.provider;
        }

        return token;
      },

      async session({ session, token }: any) {
        if (session.user && token) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
          // Restore profile picture from token
          if (token.picture) session.user.image = token.picture as string;
        }
        return session;
      },

      async redirect({ url, baseUrl }: any) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },

    events: {
      async signIn({ user, account }: any) {
        console.log(`User signed in: ${user.email} via ${account?.provider}`);
      },
      async signOut() {
        console.log("User signed out");
      },
    },

    debug: process.env.NODE_ENV === "development",
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth(getAuthConfig());

// Re-export auth for use in server components
export { auth as getServerSession };
