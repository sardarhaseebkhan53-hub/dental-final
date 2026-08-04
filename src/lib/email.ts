import { Resend } from "resend";
import { getEnv } from "@/lib/env";

let resendClient: Resend | null = null;

function getResendClient() {
  const { RESEND_API_KEY: apiKey, EMAIL_FROM } = getEnv();

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Email delivery is disabled.",
    );
  }

  if (!EMAIL_FROM) {
    console.warn(
      "[email] EMAIL_FROM is not configured; using the default sender.",
    );
  }

  resendClient ??= new Resend(apiKey);
  return resendClient;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions) {
  const { to, subject, html, text, replyTo, from } = options;
  const { EMAIL_FROM } = getEnv();

  try {
    const result = await getResendClient().emails.send({
      from: from || EMAIL_FROM || "Serene Dental <noreply@serenedental.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text: text || stripHtml(html),
      replyTo,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendAppointmentConfirmation(
  patientEmail: string,
  patientName: string,
  appointmentDetails: {
    date: string;
    time: string;
    doctor: string;
    service: string;
    location: string;
  },
) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #1A1A2E; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 32px; }
        .header { background: linear-gradient(135deg, #0D7377, #14A3A8); color: white; padding: 32px; border-radius: 12px 12px 0 0; text-align: center; }
        .content { background: white; padding: 32px; border: 1px solid #E8F6F6; border-radius: 0 0 12px 12px; }
        .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E8F6F6; }
        .label { color: #94A3B8; font-size: 14px; }
        .value { font-weight: 600; }
        .cta { display: inline-block; background: #D4A574; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 24px; }
        .footer { text-align: center; padding: 24px; color: #94A3B8; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0;font-size:24px;">Appointment Confirmed ✓</h1>
          <p style="margin:8px 0 0;opacity:0.9;">Serene Dental Clinic</p>
        </div>
        <div class="content">
          <p>Dear ${patientName},</p>
          <p>Your appointment has been confirmed. Here are the details:</p>
          <div style="background:#F8FAFB;padding:20px;border-radius:8px;margin:20px 0;">
            <div class="detail-row"><span class="label">Date</span><span class="value">${appointmentDetails.date}</span></div>
            <div class="detail-row"><span class="label">Time</span><span class="value">${appointmentDetails.time}</span></div>
            <div class="detail-row"><span class="label">Doctor</span><span class="value">${appointmentDetails.doctor}</span></div>
            <div class="detail-row"><span class="label">Service</span><span class="value">${appointmentDetails.service}</span></div>
            <div class="detail-row" style="border:none;"><span class="label">Location</span><span class="value">${appointmentDetails.location}</span></div>
          </div>
          <p><strong>Please arrive 15 minutes early</strong> with your ID and insurance card.</p>
          <p>Need to reschedule? Call us at <strong>(555) 123-4567</strong> or manage your appointment online.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/patient/appointments" class="cta">View Appointment</a>
        </div>
        <div class="footer">
          <p>Serene Dental Clinic • Where Beautiful Smiles Begin</p>
          <p>123 Wellness Avenue, Suite 200 • (555) 123-4567</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Appointment Confirmed - ${appointmentDetails.date} at ${appointmentDetails.time}`,
    html,
  });
}

export async function sendAppointmentReminder(
  patientEmail: string,
  patientName: string,
  appointmentDetails: {
    date: string;
    time: string;
    doctor: string;
  },
) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>body{font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#1A1A2E;line-height:1.6;}.container{max-width:600px;margin:0 auto;padding:32px;}</style></head>
    <body>
      <div class="container">
        <h2 style="color:#0D7377;">Appointment Reminder</h2>
        <p>Dear ${patientName},</p>
        <p>This is a friendly reminder about your upcoming appointment:</p>
        <div style="background:#E8F6F6;padding:20px;border-radius:8px;margin:20px 0;">
          <p><strong>📅 Date:</strong> ${appointmentDetails.date}</p>
          <p><strong>🕐 Time:</strong> ${appointmentDetails.time}</p>
          <p><strong>👨‍⚕️ Doctor:</strong> ${appointmentDetails.doctor}</p>
        </div>
        <p>Please arrive 15 minutes early. If you need to reschedule, contact us as soon as possible.</p>
        <p>📞 (555) 123-4567</p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: patientEmail,
    subject: `Reminder: Your appointment on ${appointmentDetails.date}`,
    html,
  });
}

export async function sendWelcomeEmail(email: string, firstName: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>body{font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#1A1A2E;line-height:1.6;}.container{max-width:600px;margin:0 auto;padding:32px;}</style></head>
    <body>
      <div class="container">
        <div style="background:linear-gradient(135deg,#0D7377,#14A3A8);color:white;padding:32px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="margin:0;">Welcome to Serene Dental! 🦷</h1>
        </div>
        <div style="background:white;padding:32px;border:1px solid #E8F6F6;border-radius:0 0 12px 12px;">
          <p>Dear ${firstName},</p>
          <p>Welcome to the Serene Dental family! We're thrilled to have you on board.</p>
          <p>With your patient portal, you can:</p>
          <ul>
            <li>📅 Book and manage appointments</li>
            <li>📋 View your medical records</li>
            <li>💊 Access prescriptions</li>
            <li>💳 View bills and make payments</li>
            <li>💬 Communicate with your care team</li>
          </ul>
          <p>If you have any questions, don't hesitate to reach out!</p>
          <p>📞 (555) 123-4567 • 📧 info@serenedental.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject:
      "Welcome to Serene Dental - Your Journey to a Beautiful Smile Begins!",
    html,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>body{font-family:'Plus Jakarta Sans',Arial,sans-serif;color:#1A1A2E;line-height:1.6;}</style></head>
    <body style="max-width:600px;margin:0 auto;padding:32px;">
      <h2 style="color:#0D7377;">Password Reset Request</h2>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <a href="${resetUrl}" style="display:inline-block;background:#D4A574;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;margin:20px 0;">Reset Password</a>
      <p style="color:#94A3B8;font-size:14px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
      <p style="color:#94A3B8;font-size:13px;">If the button doesn't work, copy this link: ${resetUrl}</p>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password - Serene Dental",
    html,
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
