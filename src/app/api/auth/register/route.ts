import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { generatePatientNumber } from "@/lib/utils";
import { sendWelcomeEmail } from "@/lib/email";
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
    const validatedData = registerSchema.parse(body);

    const existing = await db.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const user = await db.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        role: "PATIENT",
        status: "ACTIVE",
        emailVerified: new Date(),
        passwordChangedAt: new Date(),
      },
    });

    await db.patient.create({
      data: {
        userId: user.id,
        patientNumber: generatePatientNumber(),
        dateOfBirth: new Date(validatedData.dateOfBirth),
        gender: validatedData.gender,
        address: {},
        consentGiven: true,
        consentDate: new Date(),
        hipaaAcknowledged: true,
        portalAccess: true,
      },
    });

    // Best-effort welcome email — never block registration on email delivery.
    sendWelcomeEmail(user.email, user.firstName).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        data: { id: user.id, email: user.email },
        message: "Account created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create account" },
      { status: 500 },
    );
  }
}
