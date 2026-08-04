import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@/types/prisma-enums";

/**
 * Shared Auth.js configuration used by both the Edge middleware and the
 * Node.js route handlers. This file must stay free of Node-only imports
 * (e.g. Prisma Client) so it can run on the Edge runtime safely.
 */

const publicRoutes = new Set([
  "/",
  "/about",
  "/services",
  "/treatments",
  "/doctors",
  "/contact",
  "/blog",
  "/faq",
  "/pricing",
  "/gallery",
  "/emergency",
  "/careers",
  "/privacy",
  "/terms",
  "/cookies",
  "/refund-policy",
  "/sitemap",
  "/book-appointment",
  "/before-after",
  "/testimonials",
  "/technology",
  "/insurance",
  "/team",
]);

const publicPrefixes = ["/services/", "/blog/"];
const publicApiRoutes = new Set([
  "/api/contact",
  "/api/newsletter",
  "/api/reviews",
  "/api/search",
  "/api/doctors",
  "/api/services",
]);

export function isPublicPath(pathname: string) {
  return (
    publicRoutes.has(pathname) ||
    publicApiRoutes.has(pathname) ||
    publicPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.startsWith("/api/auth")
  );
}

export function getDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    SUPER_ADMIN: "/admin/dashboard",
    ADMIN: "/admin/dashboard",
    DOCTOR: "/doctor/dashboard",
    STAFF: "/admin/dashboard",
    RECEPTIONIST: "/reception/dashboard",
    PATIENT: "/patient/dashboard",
  };
  return paths[role] || "/";
}

export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/patient/dashboard",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: UserRole }).role;
      }

      if (trigger === "update" && session) {
        token.name = session.user?.name;
        token.picture = session.user?.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const pathname = nextUrl.pathname;

      // API routes self-authenticate and must return JSON (401) instead of
      // HTML redirects — never let middleware redirect them.
      if (pathname.startsWith("/api")) return true;

      // Public routes. Keep `/` exact so private dashboards are not accidentally public.
      if (isPublicPath(pathname)) return true;

      // Auth pages - redirect if logged in
      const authPages = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ];
      if (authPages.some((p) => pathname.startsWith(p))) {
        if (isLoggedIn && userRole) {
          return Response.redirect(
            new URL(getDashboardPath(userRole), nextUrl.origin),
          );
        }
        return true;
      }

      // Protected routes
      if (!isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl.origin));
      }

      // Role-based access
      if (
        pathname.startsWith("/admin") &&
        userRole &&
        !["SUPER_ADMIN", "ADMIN"].includes(userRole)
      ) {
        return Response.redirect(new URL("/patient/dashboard", nextUrl.origin));
      }
      if (pathname.startsWith("/doctor") && userRole !== "DOCTOR") {
        return Response.redirect(new URL("/patient/dashboard", nextUrl.origin));
      }
      if (
        pathname.startsWith("/reception") &&
        userRole &&
        !["RECEPTIONIST", "ADMIN", "SUPER_ADMIN"].includes(userRole)
      ) {
        return Response.redirect(new URL("/patient/dashboard", nextUrl.origin));
      }
      if (pathname.startsWith("/patient") && userRole !== "PATIENT") {
        return Response.redirect(
          new URL(getDashboardPath(userRole ?? "PATIENT"), nextUrl.origin),
        );
      }

      return true;
    },
  },
};
