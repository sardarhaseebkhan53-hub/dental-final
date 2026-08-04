import NextAuth, { type NextAuthResult } from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { authConfig } from "@/lib/auth.config";
import type { UserRole } from "@/types/prisma-enums";

// ─────────────────────────────────────────────────────────────────────────────
// Providers
// ─────────────────────────────────────────────────────────────────────────────

const providers: Provider[] = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      console.log("[auth] authorize() called");
      console.log("[auth] credentials.email:", credentials?.email);
      console.log("[auth] credentials.password exists:", !!credentials?.password);
      console.log("[auth] credentials.password type:", typeof credentials?.password);

      if (!credentials?.email || !credentials?.password) {
        console.error("[auth] Missing email or password");
        throw new Error("Email and password are required");
      }

      const email = String(credentials.email);
      const password = String(credentials.password);

      console.log("[auth] Looking up user:", email);

      const user = await db.user.findUnique({ where: { email } });
      console.log("[auth] User found:", !!user);

      if (!user) {
        console.error("[auth] No user found with email:", email);
        throw new Error("Invalid credentials");
      }
      if (!user.hashedPassword) {
        console.error("[auth] User has no hashedPassword");
        throw new Error("Invalid credentials");
      }
      if (user.status === "SUSPENDED") {
        throw new Error("Account suspended. Contact support.");
      }
      if (user.status === "PENDING_VERIFICATION") {
        throw new Error("Please verify your email first.");
      }
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        const minutes = Math.ceil(
          (user.lockedUntil.getTime() - Date.now()) / 60000,
        );
        throw new Error(`Account locked. Try again in ${minutes} minutes.`);
      }

      console.log("[auth] Comparing password with bcrypt...");
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
      console.log("[auth] bcrypt.compare result:", isPasswordValid);

      if (!isPasswordValid) {
        console.error("[auth] Password mismatch for user:", email);
        const attempts = user.loginAttempts + 1;
        const updateData: Record<string, unknown> = { loginAttempts: attempts };
        if (attempts >= 5) {
          updateData.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
        }
        await db.user.update({ where: { id: user.id }, data: updateData });
        throw new Error("Invalid credentials");
      }

      console.log("[auth] Password valid, resetting login attempts");
      await db.user.update({
        where: { id: user.id },
        data: { loginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
      });

      const result = {
        id: user.id,
        email: user.email,
        name: [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.email,
        role: user.role as UserRole,
        image: user.avatar,
      };
      console.log("[auth] authorize() SUCCESS for user:", result.email, "role:", result.role);
      return result;
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
} else {
  console.warn(
    "[auth] GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET not set — Google login is disabled.",
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NextAuth instance
// ─────────────────────────────────────────────────────────────────────────────

const nextAuth: NextAuthResult = NextAuth({
  secret: authConfig.secret,
  trustHost: true,
  session: authConfig.session,
  pages: authConfig.pages,
  adapter: PrismaAdapter(db),
  providers,
  // When a brand-new user signs in via OAuth, PrismaAdapter creates the User
  // row with only email + image + name. We split the display name into
  // firstName/lastName and default role to PATIENT so downstream code doesn't
  // hit NOT NULL constraints.
  events: {
    async createUser({ user }) {
      if (!user.email) return;
      try {
        const parts = (user.name ?? "").trim().split(/\s+/);
        const firstName = parts[0] ?? null;
        const lastName = parts.length > 1 ? parts.slice(1).join(" ") : null;
        await db.user.update({
          where: { id: user.id },
          data: {
            firstName,
            lastName,
            name: user.name ?? null,
            role: "PATIENT",
            status: "ACTIVE",
            emailVerified:
              (user as { emailVerified?: Date | null }).emailVerified ??
              new Date(),
          },
        });
      } catch (err) {
        console.error("[auth][createUser] failed to back-fill user:", err);
      }
    },
  },
  callbacks: {
    /**
     * Block suspended/locked accounts even when signing in via OAuth, and
     * back-fill firstName/lastName/avatar/emailVerified for new OAuth users
     * (the PrismaAdapter creates a bare User record but leaves these empty).
     */
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;
      if (!user.email) return false;
      try {
        const dbUser = await db.user.findUnique({ where: { email: user.email } });
        if (dbUser) {
          if (dbUser.status === "SUSPENDED") return false;
          if (dbUser.lockedUntil && dbUser.lockedUntil > new Date()) return false;

          // Fill in avatar / name / emailVerified for returning OAuth users
          // when those fields are still blank on the DB record.
          const patch: Record<string, unknown> = {};
          if (!dbUser.avatar && user.image) patch.avatar = user.image;
          if (user.name) {
            const parts = user.name.trim().split(/\s+/);
            if (!dbUser.firstName) patch.firstName = parts[0] ?? null;
            if (!dbUser.lastName && parts.length > 1)
              patch.lastName = parts.slice(1).join(" ");
            if (!dbUser.name) patch.name = user.name;
          }
          if (!dbUser.emailVerified && profile?.email_verified) {
            patch.emailVerified = new Date();
          }
          if (Object.keys(patch).length > 0) {
            await db.user.update({ where: { id: dbUser.id }, data: patch });
          }
          return true;
        }
        // First-time OAuth sign-in — adapter will create the user; we patch
        // the record right after via the events.creatUser hook below.
        return true;
      } catch (err) {
        console.error("[auth][signIn] error:", err);
        return false;
      }
    },

    /**
     * Attach id + role to the JWT, loading from DB for OAuth sign-ins
     * (where `user` comes from the provider and doesn't include `role`).
     */
    async jwt({ token, user, trigger, session, account }) {
      // Credentials sign-in: `user` is the value returned from authorize()
      if (user) {
        token.id = (user as { id?: string }).id as string;
        token.role = (user as { role?: UserRole }).role;
      }

      // OAuth sign-in: load role from DB (default to PATIENT if brand-new)
      if (
        account &&
        account.provider !== "credentials" &&
        token.email &&
        !(token as { role?: UserRole }).role
      ) {
        try {
          const dbUser = await db.user.findUnique({
            where: { email: token.email as string },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role as UserRole;
          } else {
            // New OAuth user — adapter will create a User; default role PATIENT.
            token.role = "PATIENT" as UserRole;
          }
        } catch (err) {
          console.error("[auth][jwt] failed to load role for OAuth user:", err);
        }
      }

      if (trigger === "update" && session) {
        token.name = (session as { user?: { name?: string } }).user?.name;
        token.picture = (session as { user?: { image?: string } }).user?.image;
      }

      return token;
    },

    /**
     * Expose id + role on session.user (mirrors authConfig.session).
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },

    // We deliberately do NOT include `authorized` here — that callback is
    // middleware-only and is consumed by authConfig when imported from
    // `middleware.ts`.
  },
});

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
