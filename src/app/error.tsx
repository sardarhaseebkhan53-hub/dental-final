"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-4">
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-full bg-error-light flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-error" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-neutral-dark mb-3">
          Something Went Wrong
        </h1>
        <p className="text-neutral-mid mb-8">
          We apologize for the inconvenience. An unexpected error occurred.
          Please try again or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="lg">
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" /> Go Home
            </Link>
          </Button>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-neutral-light">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
