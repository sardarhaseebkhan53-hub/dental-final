"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Unable to send reset link. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setSent(true);
    } catch {
      setError("Unable to send reset link. Please try again.");
      setLoading(false);
    }
  };

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
            Forgot Password?
          </h2>
          <p className="text-sm text-neutral-mid">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 lg:p-8 shadow-card">
          {sent ? (
            <div className="text-center py-4">
              <div className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                Check Your Email
              </h3>
              <p className="text-sm text-neutral-mid mb-6">
                If an account exists for <strong>{email}</strong>, we&apos;ve
                sent a password reset link. Please check your inbox.
              </p>
              <Button asChild variant="ghost">
                <Link href="/login">
                  <ArrowLeft className="h-4 w-4" /> Back to Sign In
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-error-light text-error text-sm text-center">
                  {error}
                </div>
              )}
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />
              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={loading}
              >
                Send Reset Link <ArrowRight className="h-4 w-4" />
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
          )}
        </div>
      </motion.div>
    </div>
  );
}
