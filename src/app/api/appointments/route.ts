import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { z } from "zod";
import { appointmentSchema } from "@/lib/validations";
import { generateAppointmentNumber } from "@/lib/utils";

const appointmentStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum([
    "SCHEDULED",
    "CONFIRMED",
    "CHECKED_IN",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
    "NO_SHOW",
    "RESCHEDULED",
  ]),
  notes: z.string().optional(),
});

const appointmentManagers = new Set([
  "SUPER_ADMIN",
  "ADMIN",
  "RECEPTIONIST",
  "DOCTOR",
]);

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const status = searchParams.get("status");
    const doctorId = searchParams.get("doctorId");
    const patientId = searchParams.get("patientId");
    const date = searchParams.get("date");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (doctorId) where.doctorId = doctorId;
    if (patientId) where.patientId = patientId;
    if (date) where.date = new Date(date);

    // Role-based filtering
    if (session.user.role === "PATIENT") {
      const patient = await db.patient.findUnique({
        where: { userId: session.user.id },
      });
      if (patient) where.patientId = patient.id;
    } else if (session.user.role === "DOCTOR") {
      const doctor = await db.doctor.findUnique({
        where: { userId: session.user.id },
      });
      if (doctor) where.doctorId = doctor.id;
    }

    const [appointments, total] = await Promise.all([
      db.appointment.findMany({
        where,
        include: {
          patient: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                  phone: true,
                  avatar: true,
                },
              },
            },
          },
          doctor: {
            include: {
              user: {
                select: { firstName: true, lastName: true, avatar: true },
              },
            },
          },
          service: {
            select: { id: true, name: true, duration: true, price: true },
          },
        },
        orderBy: { date: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.appointment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: appointments,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("GET /api/appointments error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validatedData = appointmentSchema.parse(body);

    // Get or create patient record
    let patient;
    if (session.user.role === "PATIENT") {
      patient = await db.patient.findUnique({
        where: { userId: session.user.id },
      });
      if (!patient) {
        return NextResponse.json(
          { success: false, error: "Patient profile not found" },
          { status: 404 },
        );
      }
    } else {
      patient = await db.patient.findUnique({ where: { id: body.patientId } });
    }

    if (!patient) {
      return NextResponse.json(
        { success: false, error: "Patient not found" },
        { status: 404 },
      );
    }

    // Check for conflicts
    const conflicting = await db.appointment.findFirst({
      where: {
        doctorId: validatedData.doctorId,
        date: new Date(validatedData.date),
        startTime: validatedData.startTime,
        status: { notIn: ["CANCELLED", "NO_SHOW"] },
      },
    });

    if (conflicting) {
      return NextResponse.json(
        { success: false, error: "This time slot is already booked" },
        { status: 409 },
      );
    }

    // Calculate end time
    const service = validatedData.serviceId
      ? await db.service.findUnique({ where: { id: validatedData.serviceId } })
      : null;
    const duration = service?.duration || 30;
    const [hours, minutes] = validatedData.startTime.split(":").map(Number);
    const endTime = new Date(2000, 0, 1, hours, minutes + duration);
    const endTimeStr = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;

    const appointment = await db.appointment.create({
      data: {
        appointmentNumber: generateAppointmentNumber(),
        patientId: patient.id,
        doctorId: validatedData.doctorId,
        serviceId: validatedData.serviceId,
        date: new Date(validatedData.date),
        startTime: validatedData.startTime,
        endTime: endTimeStr,
        type: validatedData.type,
        reason: validatedData.reason,
        notes: validatedData.notes,
        status: "SCHEDULED",
      },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        service: true,
      },
    });

    return NextResponse.json(
      { success: true, data: appointment },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/appointments error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    if (!appointmentManagers.has(session.user.role)) {
      return NextResponse.json(
        { success: false, error: "Only clinic staff can update appointments" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { id, status, notes } = appointmentStatusSchema.parse(body);

    const appointment = await db.appointment.update({
      where: { id },
      data: {
        status,
        ...(notes ? { notes } : {}),
        ...(status === "CHECKED_IN" ? { checkInTime: new Date() } : {}),
        ...(status === "COMPLETED" ? { checkOutTime: new Date() } : {}),
      },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        service: true,
      },
    });

    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    console.error("PATCH /api/appointments error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
