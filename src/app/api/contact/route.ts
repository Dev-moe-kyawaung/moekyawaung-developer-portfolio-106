import { NextResponse } from "next/server";
import { createMessage } from "@/lib/data";

export const dynamic = "force-dynamic";

const str = (v: unknown, max = 300) => String(v ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = str(data.name, 120);
  const email = str(data.email, 160);
  const subject = str(data.subject, 200);
  const message = str(data.message, 5000);
  const company = str(data.company, 160);
  const roleType = str(data.roleType, 80);
  const timeline = str(data.timeline, 80);
  const source = str(data.source, 80) || "site";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  try {
    await createMessage({
      name,
      email,
      subject,
      message,
      company,
      roleType,
      timeline,
      source,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save message." },
      { status: 500 }
    );
  }
}
