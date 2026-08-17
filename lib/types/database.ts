export type ListingType = "whole" | "share";
export type ListingStatus = "draft" | "active" | "sold";

export interface ListingImage {
  src: string;
  alt: string;
  order: number;
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
  price: number;
  share_fraction: string | null;
  monthly_cost: number | null;
  hourly_cost: number | null;
  engine_summary: string | null;
  engine_rebuilt_date: string | null;
  engine_hours_since_rebuild: number | null;
  insured_hull_value: number | null;
  description: string | null;
  group_facts: string[];
  insurance_info: string | null;
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
