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
    const doctors = await db.doctor.findMany({
      where: { user: { status: "ACTIVE" } },
      select: {
        id: true,
        userId: true,
        specialization: true,
        consultationFee: true,
        followUpFee: true,
        averageRating: true,
        totalReviews: true,
        acceptingNewPatients: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { averageRating: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: doctors.map((doctor) => ({
        id: doctor.id,
        name: `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`,
        firstName: doctor.user.firstName,
        lastName: doctor.user.lastName,
        specialization: doctor.specialization,
        fee: Number(doctor.consultationFee),
        rating: doctor.averageRating,
        reviews: doctor.totalReviews,
        acceptingNewPatients: doctor.acceptingNewPatients,
        avatar: doctor.user.avatar,
      })),
    });
  } catch (error) {
    console.error("GET /api/doctors error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load doctors" },
      { status: 500 },
    );
  }
}
