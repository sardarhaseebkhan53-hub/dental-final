import NextAuth, { type NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { authConfig } from "@/lib/auth.config";
import type { UserRole } from "@/types/prisma-enums";

const nextAuth: NextAuthResult = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
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

        const user = await db.user.findUnique({
          where: { email },
        });

        console.log("[auth] User found:", !!user);

        if (!user) {
          console.error("[auth] No user found with email:", email);
          throw new Error("Invalid credentials");
        }

        console.log("[auth] User status:", user.status);
        console.log("[auth] User role:", user.role);
        console.log("[auth] hashedPassword exists:", !!user.hashedPassword);
        console.log("[auth] hashedPassword length:", user.hashedPassword?.length);
        console.log("[auth] hashedPassword starts with:", user.hashedPassword?.substring(0, 7));

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
        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        console.log("[auth] bcrypt.compare result:", isPasswordValid);

        if (!isPasswordValid) {
          console.error("[auth] Password mismatch for user:", email);
          const attempts = user.loginAttempts + 1;
          const updateData: Record<string, unknown> = {
            loginAttempts: attempts,
          };

          if (attempts >= 5) {
            // 30 min lockout after 5 failed attempts
            updateData.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
          }

          await db.user.update({
            where: { id: user.id },
            data: updateData,
          });

          throw new Error("Invalid credentials");
        }

        console.log("[auth] Password valid, resetting login attempts");

        // Reset login attempts on successful login
        await db.user.update({
          where: { id: user.id },
          data: {
            loginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        });

        const result = {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role as UserRole,
          image: user.avatar,
        };

        console.log("[auth] authorize() SUCCESS for user:", result.email, "role:", result.role);
        return result;
      },
    }),
  ],
});

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
