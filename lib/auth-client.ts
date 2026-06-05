// NextAuth Client Hooks for React Components
"use client";

import { useSession as useNextAuthSession } from "next-auth/react";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";

// Re-export NextAuth hooks with consistent naming
export const useSession = useNextAuthSession;

// Sign in wrapper
export const signIn = async (provider: string, options?: any) => {
  return nextAuthSignIn(provider, options);
};

// Sign in with credentials
export const signInWithCredentials = async (
  email: string,
  password: string,
) => {
  return nextAuthSignIn("credentials", {
    email,
    password,
    redirect: false,
  });
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return nextAuthSignIn("google", { callbackUrl: "/" });
};

// Sign in with GitHub
export const signInWithGitHub = async () => {
  return nextAuthSignIn("github", { callbackUrl: "/" });
};

// Sign out wrapper
export const signOut = async () => {
  return nextAuthSignOut({ callbackUrl: "/" });
};

// For backward compatibility with Better Auth API
export const authClient = {
  signIn,
  signOut,
  useSession,
};
