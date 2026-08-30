import type { ListingRow } from "@/lib/types/database";

// The single place that defines what "draft" and "live" mean for a listing.
// Everything else (browsing pages, sitemap, robots, the enquiry form, JSON-LD)
// should call these rather than comparing listing.status directly, so a
// future status change only needs updating here.
export function isDraftListing(listing: ListingRow): boolean {
  return listing.status === "draft";
}

export function isLiveListing(listing: ListingRow): boolean {
  return listing.status === "active";
}

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
