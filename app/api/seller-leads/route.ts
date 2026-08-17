import { NextRequest, NextResponse } from "next/server";
import { sellerLeadSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendSellerLeadEmail } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(`seller-lead:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = sellerLeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const input = parsed.data;

  if (input.website) {
    return NextResponse.json({ ok: true });
  }

  const verified = await verifyTurnstile(input.turnstileToken, ip);
  if (!verified) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error: insertError } = await supabase.from("seller_leads").insert({
    name: input.name,
    email: input.email,
    aircraft_type: input.aircraftType,
    listing_type: input.listingType,
    asking_price: input.askingPrice || null,
    location: input.location || null,
    message: input.message || null,
  });

  if (insertError) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  try {
    await sendSellerLeadEmail(input);
  } catch {
    // The lead is safely stored even if email delivery fails.
  }

  return NextResponse.json({ ok: true });
}
