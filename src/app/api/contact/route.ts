import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { contactFormSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";
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
    const validatedData = contactFormSchema.parse(body);

    const message = await db.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        status: "NEW",
      },
    });

    // Send confirmation email (best-effort — never fails the request)
    await sendEmail({
      to: validatedData.email,
      subject: "We received your message — Serene Dental",
      html: `
        <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h2 style="color:#0D7377;">Thank You for Contacting Us!</h2>
          <p>Dear ${validatedData.name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <div style="background:#F8FAFB;padding:16px;border-radius:8px;margin:16px 0;">
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong> ${validatedData.message}</p>
          </div>
          <p>If this is an emergency, please call us at <strong>(555) 911-0000</strong>.</p>
          <p>Best regards,<br/>Serene Dental Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, data: message, message: "Message sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, error: "Validation error", details: error.message },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 },
    );
  }
}
