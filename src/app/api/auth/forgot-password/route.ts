import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations";
import { hashToken } from "@/lib/encryption";
import { sendPasswordResetEmail } from "@/lib/email";
import {
  rateLimit,
  tooManyRequestsError,
} from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { max: 5, windowMs: 60_000 });
  if (!limited.success) {
    return tooManyRequestsError(limited.retryAfterSeconds);
  }

  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);
    const normalizedEmail = email.toLowerCase();

    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success to avoid user enumeration; only send an email
    // when the account actually exists.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists for that email, a password reset link has been sent.",
      });
    }

    // Invalidate any previous reset tokens for this user.
    await db.passwordReset.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    const resetToken = crypto.randomBytes(32).toString("hex");
    await db.passwordReset.create({
      data: {
        userId: user.id,
        token: hashToken(resetToken),
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    await sendPasswordResetEmail(normalizedEmail, resetToken);

    return NextResponse.json({
      success: true,
      message:
        "If an account exists for that email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("POST /api/auth/forgot-password error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 },
    );
  }
}
