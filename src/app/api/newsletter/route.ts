import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";
import {
  rateLimit,
  tooManyRequestsError,
} from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { max: 10, windowMs: 60_000 });
  if (!limited.success) {
    return tooManyRequestsError(limited.retryAfterSeconds);
  }

  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    const existing = await db.newsletter.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    });
    if (existing) {
      if (existing.status === "UNSUBSCRIBED") {
        await db.newsletter.update({
          where: { email: validatedData.email.toLowerCase() },
          data: { status: "ACTIVE", unsubscribedAt: null },
        });
        return NextResponse.json({
          success: true,
          message: "Successfully re-subscribed!",
        });
      }
      return NextResponse.json({
        success: true,
        message: "You are already subscribed!",
      });
    }

    await db.newsletter.create({
      data: {
        email: validatedData.email.toLowerCase(),
        name: validatedData.name,
        status: "ACTIVE",
        source: "website",
      },
    });

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to our newsletter!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 },
    );
  }
}
