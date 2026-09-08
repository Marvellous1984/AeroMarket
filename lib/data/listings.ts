import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ListingRow, ListingType } from "@/lib/types/database";

// Public browsing/discovery surfaces (homepage, /aircraft, /shares, sitemap)
// call this — it returns live ("active") and sold listings, so drafts never
// appear in navigation, search results, or the sitemap, but a sold listing
// stays visible as marketplace proof (see lib/listing.ts isSoldListing).
// Sold rows are always sorted after active ones (the stable sort below only
// ever moves "sold" rows later, preserving the published_at ordering within
// each group) so live inventory never gets crowded out.
export async function getListings(filter?: {
  listingType?: ListingType;
}): Promise<ListingRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("listings")
    .select("*")
    .in("status", ["active", "sold"])
    .order("published_at", { ascending: false });

  if (filter?.listingType) {
    query = query.eq("listing_type", filter.listingType);
  }

  const { data, error } = await query;
  if (error) throw error;
  const listings = (data as ListingRow[] | null) ?? [];

  return listings.sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "sold" ? 1 : -1;
  });
}

// The individual listing page looks up a listing by its exact slug, which
// only someone with the direct URL (or the listing appearing in the
// discovery surfaces above) can know. It deliberately does not filter by
// status: a draft listing must resolve here so the seller can review it at
// its permanent URL before it goes live. Uses the admin client (server-only,
// bypasses RLS) rather than the anon client, so drafts are never exposed
// through the public REST API's row-level security policy.
export async function getListingBySlug(
  slug: string,
): Promise<ListingRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as ListingRow | null;
}
