import type { ListingRow } from "@/lib/types/database";

export function getListingSubtitle(listing: ListingRow): string {
  return [
    listing.listing_type === "share" ? `${listing.share_fraction} share` : null,
    listing.location,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function getListingTitle(listing: ListingRow): string {
  return `${listing.manufacturer} ${listing.model}`;
}
