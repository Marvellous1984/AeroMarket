export type ListingType = "whole" | "share";
// "active" is this system's "live" state — publicly listed, indexable, open
// to enquiries. Kept as "active" rather than renamed to "live" to avoid an
// enum migration touching already-live rows; see lib/listing.ts for the
// isDraft/isLive helpers future listings should use instead of comparing
// status strings directly.
export type ListingStatus = "draft" | "active" | "sold";

export interface ListingImage {
  src: string;
  alt: string;
  order: number;
}

export interface ListingFact {
  label: string;
  value: string;
}

// Small, fixed set of icons the highlight cards can render — not an
// open-ended icon system, just enough to cover the kinds of facts a listing
// highlights (ownership, cost, engine, speed, capability, ...).
export type HighlightIconKey =
  | "ownership"
  | "calendar"
  | "clock"
  | "gauge"
  | "shield"
  | "bolt"
  | "cloud";

export interface ListingHighlight extends ListingFact {
  icon: HighlightIconKey;
}

export interface ListingRow {
  id: string;
  slug: string;
  listing_type: ListingType;
  status: ListingStatus;
  manufacturer: string;
  model: string;
  year: number | null;
  registration: string | null;
  location: string;
  airport_name: string | null;
  airport_code: string | null;
  price: number | null;
  share_fraction: string | null;
  contact_email: string | null;
  monthly_cost: number | null;
  hourly_cost: number | null;
  engine_summary: string | null;
  engine_rebuilt_date: string | null;
  engine_hours_since_rebuild: number | null;
  insured_hull_value: number | null;
  description: string | null;
  // Closing call-to-action shown after the description. Null uses the
  // type-based default, "" suppresses it — see lib/listing.ts (getListingCta).
  cta: string | null;
  group_facts: string[];
  insurance_info: string | null;
  // Scannable checklist version of the pilot/insurance requirements —
  // preferred over insurance_info (a single paragraph) when present.
  insurance_points: string[] | null;
  // Highlight/fact cards near the top of the listing. When null/empty, the
  // UI derives an equivalent set from the older dedicated columns
  // (share_fraction, monthly_cost, hourly_cost, engine_hours_since_rebuild,
  // insured_hull_value) — see components/HighlightCards.tsx. New listings
  // should set this directly instead of relying on that fallback.
  highlights: ListingHighlight[] | null;
  // Avionics/equipment spec rows, e.g. { label: "Engine", value: "..." }.
  equipment: ListingFact[] | null;
  // Overrides the equipment section's default heading ("Avionics &
  // equipment") — e.g. a listing combining avionics with general
  // aircraft/airframe facts might title it "Aircraft & equipment" instead.
  equipment_title: string | null;
  images: ListingImage[];
  created_at: string;
  published_at: string | null;
}

export interface EnquiryInsert {
  listing_id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface EnquiryRow {
  id: string;
  listing_id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

export interface SellerLeadInsert {
  name: string;
  email: string;
  aircraft_type: string;
  listing_type: ListingType;
  asking_price: string | null;
  location: string | null;
  message: string | null;
}

export interface SellerLeadRow {
  id: string;
  name: string;
  email: string;
  aircraft_type: string;
  listing_type: ListingType;
  asking_price: string | null;
  location: string | null;
  message: string | null;
  created_at: string;
}

// Note: we deliberately do NOT feed a `Database` generic into the Supabase
// client (see lib/supabase/server.ts and admin.ts for why). Query results
// are cast to these row types at the data-layer boundary instead.
