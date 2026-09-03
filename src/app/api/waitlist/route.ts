import { NextResponse } from "next/server";
import { SUPPORT_EMAIL } from "@/lib/constants";

/**
 * The waitlist. ONE list across every app — a visitor who signs up on
 * /hidden-margin is first in line for /reorder-engine too, and the copy on
 * both pages promises exactly that. `source` records which page they came
 * from so the inbox keeps the context; it is not a list they joined.
 *
 * No database at this volume — submissions land in the support inbox via
 * Resend (RESEND_API_KEY already lives on the Vercel project). The inbox is
 * the CRM until a real list is warranted.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Where the form was rendered. Unknown values are recorded, never rejected. */
const KNOWN_SOURCES = new Set(["hidden-margin", "reorder-engine", "home"]);

export async function POST(request: Request) {
  let body: { email?: string; source?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill "company" (visually hidden field).
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim() ?? "";
  const source = KNOWN_SOURCES.has(body.source ?? "")
    ? (body.source as string)
    : "unknown";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local dev without the key: log instead of failing the visitor.
    console.warn(`[waitlist] no RESEND_API_KEY; would record ${email}`);
    return NextResponse.json({ ok: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Leaf waitlist <waitlist@leafdigital.co>",
      to: [SUPPORT_EMAIL],
      subject: `Waitlist: ${email}`,
      text: `${email} joined the waitlist from ${source}.`,
    }),
  });

  if (!response.ok) {
    console.error(`[waitlist] resend failed: ${response.status}`);
    return NextResponse.json(
      { error: "Something broke on our side — email us instead?" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
