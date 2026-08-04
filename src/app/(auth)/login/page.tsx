"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserRole } from "@/types/prisma-enums";

const DASHBOARD_PATHS: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin/dashboard",
  ADMIN: "/admin/dashboard",
  DOCTOR: "/doctor/dashboard",
  STAFF: "/admin/dashboard",
  RECEPTIONIST: "/reception/dashboard",
  PATIENT: "/patient/dashboard",
};

function getErrorMessage(code: string | undefined): string {
  switch (code) {
    case "CredentialsSignin":
      return "Invalid email or password";
    case "AccessDenied":
      return "Access denied. Your account may be restricted.";
    default:
      return code || "Unable to sign in. Please try again.";
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Google login — uses NextAuth OAuth flow (full page redirect).
  // Send the user to /patient/dashboard; the middleware reads their role
  // after the cookie is set and will bounce admins/doctors to the right
  // dashboard if the role doesn't match /patient/*.
  const handleGoogleSignIn = async () => {
    setError("");
    setSocialLoading("google");
    try {
      await signIn("google", { redirect: true, callbackUrl: "/patient/dashboard" });
    } catch (err) {
      console.error("[login] Google sign-in failed:", err);
      setError("Google sign-in is not available. Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET first.");
      setSocialLoading(null);
    }
  };

  // Facebook login — placeholder until Facebook provider is configured.
  const handleFacebookSignIn = () => {
    setError("Facebook login is not yet configured.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(getErrorMessage(result.error));
        setLoading(false);
        return;
      }

      // Fetch the session to determine the role-based dashboard destination.
      const session = await getSession();
      const role = session?.user?.role;
      const destination = role ? DASHBOARD_PATHS[role] : "/";

      // Small delay so the auth cookie propagates before navigation.
      window.setTimeout(() => {
        router.push(destination);
        router.refresh();
      }, 150);
    } catch {
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-32 right-10 h-48 w-48 rounded-full border border-white/20" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <BrandLogo
            inverse
            subtitle="Secure Dental Portal"
            size="lg"
            className="mb-12"
          />
          <h1 className="font-display text-4xl font-semibold text-white mb-4">
            Welcome to Your
            <br />
            Dental Health Portal
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            Access your appointments, medical records, prescriptions, and more —
            all in one secure place.
          </p>
          <div className="mt-12 space-y-4">
            {[
              "Manage appointments easily",
              "View medical history",
              "Access prescriptions",
              "Secure payment portal",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/90">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface-alt">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-2">
              Sign In
            </h2>
            <p className="text-sm text-neutral-mid">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-light text-error text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-neutral-dark"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-neutral-mid cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-border text-primary focus:ring-primary/30"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-primary-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-alt px-2 text-neutral-light">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={!!socialLoading || loading}
              >
                {socialLoading === "google" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={handleFacebookSignIn}
                disabled={!!socialLoading || loading}
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-mid">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:text-primary-700"
            >
              Register Now
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
