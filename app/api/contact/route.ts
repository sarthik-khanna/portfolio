import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where submissions land — your personal inbox.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "sarthikkhanna28@gmail.com";
// Resend requires the "from" address to be on a domain you've verified with
// them. Until you verify a domain, use their shared testing sender below —
// it only delivers to the email address on your Resend account.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email sanity check.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "That email address doesn't look right." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: subject ? `Portfolio contact: ${subject}` : "New portfolio contact form message",
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "—"}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject || "—")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
