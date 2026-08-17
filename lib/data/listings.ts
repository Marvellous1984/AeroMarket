import { createClient } from "@/lib/supabase/server";
import type { ListingRow, ListingType } from "@/lib/types/database";

export async function getListings(filter?: {
  listingType?: ListingType;
}): Promise<ListingRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .order("published_at", { ascending: false });

  if (filter?.listingType) {
    query = query.eq("listing_type", filter.listingType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as ListingRow[] | null) ?? [];
}

export async function getListingBySlug(
  slug: string,
): Promise<ListingRow | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) throw error;
  return data as ListingRow | null;
}
