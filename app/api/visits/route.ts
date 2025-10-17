import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Debug environment variables
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "NOT SET");
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only
  { auth: { persistSession: false } }
);

function todayUTC() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
    .toISOString().slice(0, 10);
}
function hashFingerprint(ip: string, ua: string, day: string) {
  return crypto.createHash("sha256").update(`${ip}|${ua}|${day}`).digest("hex");
}
function expiresInDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}
async function getTotal() {
  const { data } = await supabase.from("visit_daily").select("total").order("day", { ascending: false }).limit(1).maybeSingle();
  return data?.total ?? 0;
}

export async function GET() {
  try { return NextResponse.json({ total: await getTotal() }); }
  catch { return NextResponse.json({ total: 0 }); }
}

export async function POST() {
  const jar = await cookies();
  const hdrs = await headers();

  // 24h cookie guard
  if (jar.get("pred_visit_24h")?.value === "1") {
    return NextResponse.json({ total: await getTotal(), counted: false });
  }

  const ip = (hdrs.get("x-forwarded-for") || "").split(",")[0]?.trim() || "0.0.0.0";
  const ua = hdrs.get("user-agent") || "unknown";
  const day = todayUTC();

  // simple bot filter
  const uaLower = ua.toLowerCase();
  const isBot = ["bot", "crawler", "spider", "preview"].some((s) => uaLower.includes(s));
  if (isBot) {
    return NextResponse.json({ total: await getTotal(), counted: false, bot: true });
  }

  const fp = hashFingerprint(ip, ua, day);

  // dedupe by (day, fp)
  const { error: fpErr } = await supabase.from("visit_fingerprints").insert({ day, fp });

  if (!fpErr) {
    // Get current total and increment it
    const currentTotal = await getTotal();
    const newTotal = currentTotal + 1;
    
    // Update the most recent day's total (or create new day with total)
    await supabase.from("visit_daily").upsert({ day, total: newTotal }, { onConflict: "day" });
    
    try {
      await supabase.from("visit_events").insert({ ip, ua });
    } catch (error) {
      // Ignore errors for visit_events logging
    }
  }

  const total = await getTotal();
  const res = NextResponse.json({ total, counted: !fpErr });
  res.cookies.set({
    name: "pred_visit_24h",
    value: "1",
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
    path: "/",
    expires: expiresInDays(1),
  });
  return res;
}
