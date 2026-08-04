import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
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
    const services = await db.service.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        category: true,
        duration: true,
        price: true,
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: services.map((service) => ({
        id: service.id,
        name: service.name,
        slug: service.slug,
        shortDescription: service.shortDescription,
        category: service.category,
        duration: service.duration,
        price: Number(service.price),
      })),
    });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load services" },
      { status: 500 },
    );
  }
}
