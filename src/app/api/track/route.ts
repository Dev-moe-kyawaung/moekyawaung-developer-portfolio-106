import { NextResponse } from "next/server";
import { trackEvent } from "@/lib/data";

export const dynamic = "force-dynamic";

/** First-party CTA/conversion tracking. Fire-and-forget, never blocks the UI. */
export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Record<string, unknown>;
    const name = String(data.name ?? "").trim().slice(0, 80);
    if (!name) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await trackEvent({
      name,
      path: String(data.path ?? "").slice(0, 200),
      meta: String(data.meta ?? "").slice(0, 200),
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Analytics must never surface an error to the visitor.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
