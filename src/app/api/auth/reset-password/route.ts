import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validations";
import { hashToken } from "@/lib/encryption";
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
    const { token, password } = resetPasswordSchema.parse(body);

    const passwordReset = await db.passwordReset.findFirst({
      where: { token: hashToken(token), used: false },
    });

    if (!passwordReset || passwordReset.expires < new Date()) {
      return NextResponse.json(
        {
          success: false,
          error: "This reset link is invalid or has expired",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.$transaction([
      db.user.update({
        where: { id: passwordReset.userId },
        data: {
          hashedPassword,
          passwordChangedAt: new Date(),
          loginAttempts: 0,
          lockedUntil: null,
        },
      }),
      db.passwordReset.update({
        where: { id: passwordReset.id },
        data: { used: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("POST /api/auth/reset-password error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to reset password" },
      { status: 500 },
    );
  }
}
