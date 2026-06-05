// Auth Middleware
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/config/auth";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    name?: string;
    role: string;
  };
}

/**
 * Verify JWT token and attach user to request
 */
export async function verifyAuth(req: NextRequest) {
  try {
    // Verify session with NextAuth
    const session = await auth();

    if (!session) {
      return { authenticated: false, user: null };
    }

    return {
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role || "user",
      },
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return { authenticated: false, user: null };
  }
}

/**
 * Require authentication
 */
export async function requireAuth(req: NextRequest) {
  const auth = await verifyAuth(req);

  if (!auth.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized. Please login." },
      { status: 401 }
    );
  }

  return { user: auth.user };
}

/**
 * Require admin role
 */
export async function requireAdmin(req: NextRequest) {
  const auth = await verifyAuth(req);

  if (!auth.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized. Please login." },
      { status: 401 }
    );
  }

  if (auth.user?.role !== "admin") {
    return NextResponse.json(
      { error: "Forbidden. Admin access required." },
      { status: 403 }
    );
  }

  return { user: auth.user };
}

/**
 * Optional auth (doesn't fail if not authenticated)
 */
export async function optionalAuth(req: NextRequest) {
  const auth = await verifyAuth(req);
  return { user: auth.user || null };
}
