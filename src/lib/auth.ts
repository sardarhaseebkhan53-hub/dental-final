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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.hashedPassword) {
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

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword,
        );

        if (!isPasswordValid) {
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

        // Reset login attempts on successful login
        await db.user.update({
          where: { id: user.id },
          data: {
            loginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role as UserRole,
          image: user.avatar,
        };
      },
    }),
  ],
});

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
