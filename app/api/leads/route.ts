import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase";
import { notifyNewLead } from "../../../lib/notify";

export const runtime = "nodejs";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  try {
    const { error } = await supabaseAdmin()
      .from("leads")
      .insert({ name, company: company || null, email, message: message || null });
    if (error) throw error;
    await notifyNewLead({ name, company, email, message });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("lead insert failed:", e);
    return NextResponse.json({ error: "Something went wrong saving your request." }, { status: 500 });
  }
}
