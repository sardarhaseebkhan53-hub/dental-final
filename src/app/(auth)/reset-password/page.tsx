"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("This reset link is invalid or missing a token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Unable to reset your password.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      window.setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Unable to reset your password. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-dark mb-2">
          Password Updated
        </h3>
        <p className="text-sm text-neutral-mid mb-6">
          Your password has been reset successfully. Redirecting you to sign
          in...
        </p>
        <Button asChild variant="ghost">
          <Link href="/login">
            <ArrowLeft className="h-4 w-4" /> Back to Sign In
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-error-light text-error text-sm text-center">
          {error}
        </div>
      )}
      <Input
        label="New Password"
        type="password"
        placeholder="Create a strong password"
        leftIcon={<Lock className="h-4 w-4" />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hint="At least 8 characters with uppercase, lowercase, number and symbol"
        required
      />
      <Input
        label="Confirm New Password"
        type="password"
        placeholder="Confirm your new password"
        leftIcon={<Lock className="h-4 w-4" />}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full" size="lg" loading={loading}>
        Reset Password <ArrowRight className="h-4 w-4" />
      </Button>
      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-primary hover:text-primary-700 font-medium inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Sign In
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                <circle cx="12" cy="9" r="2" />
              </svg>
            </div>
          </Link>
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-2">
            Reset Your Password
          </h2>
          <p className="text-sm text-neutral-mid">
            Enter a new password for your account
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 lg:p-8 shadow-card">
          <Suspense
            fallback={
              <p className="text-sm text-neutral-mid text-center py-8">
                Loading...
              </p>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
