import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { reviewSchema } from "@/lib/validations";
import {
  rateLimit,
  tooManyRequestsError,
} from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const limited = rateLimit(request);
  if (!limited.success) {
    return tooManyRequestsError(limited.retryAfterSeconds);
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const status = searchParams.get("status") || "APPROVED";

    const where: Record<string, unknown> = {};
    if (status !== "ALL") where.status = status;

    const [reviews, total] = await Promise.all([
      db.review.findMany({
        where,
        include: {
          user: { select: { firstName: true, lastName: true, avatar: true } },
          doctor: {
            include: { user: { select: { firstName: true, lastName: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.review.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: reviews,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { max: 5, windowMs: 60_000 });
  if (!limited.success) {
    return tooManyRequestsError(limited.retryAfterSeconds);
  }

  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validatedData = reviewSchema.parse(body);

    const review = await db.review.create({
      data: {
        userId: session.user.id,
        doctorId: validatedData.doctorId,
        rating: validatedData.rating,
        title: validatedData.title,
        content: validatedData.content,
        source: "DIRECT",
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 },
    );
  }
}
