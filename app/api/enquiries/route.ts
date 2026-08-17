import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEnquiryEmails } from "@/lib/email/resend";
import type { ListingRow } from "@/lib/types/database";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { allowed } = checkRateLimit(`enquiry:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const input = parsed.data;

  // Honeypot: silently accept so bots don't learn the field is a trap.
  if (input.website) {
    return NextResponse.json({ ok: true });
  }

  const verified = await verifyTurnstile(input.turnstileToken, ip);
  if (!verified) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: listingData, error: listingError } = await supabase
    .from("listings")
    .select("*")
    .eq("id", input.listingId)
    .single();

  if (listingError || !listingData) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }
  const listing = listingData as ListingRow;

  const { error: insertError } = await supabase.from("enquiries").insert({
    listing_id: input.listingId,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    message: input.message,
    referrer: input.referrer || null,
    utm_source: input.utmSource || null,
    utm_medium: input.utmMedium || null,
    utm_campaign: input.utmCampaign || null,
  });

  if (insertError) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  try {
    await sendEnquiryEmails(input, listing);
  } catch {
    // The enquiry is safely stored even if email delivery fails.
  }

  return NextResponse.json({ ok: true });
}
