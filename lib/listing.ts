import type { ListingRow } from "@/lib/types/database";
import { formatPrice } from "@/lib/format";

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

export function isSoldListing(listing: ListingRow): boolean {
  return listing.status === "sold";
}

// The only place that should ever render listing.price as user-facing text.
// A sold listing's original asking price stays in the `price` column for
// internal/data reasons, but must never be shown as though it's still
// active — every price display (cards, hero, sticky CTA) should call this
// instead of formatPrice(listing.price) directly.
export function getListingPriceLabel(listing: ListingRow): string {
  return isSoldListing(listing) ? "Sold" : formatPrice(listing.price);
}

// Where a "browse more like this" CTA on a sold listing should point —
// reused by the sold-state panels so it stays correct for both whole
// aircraft and shares without hardcoding a listing's slug/type.
export function getBrowseHref(listing: ListingRow): string {
  return listing.listing_type === "share" ? "/shares" : "/aircraft";
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

// Marketplace copy, not seller-supplied fact — every listing description
// should close with a short next-action prompt, even when the source
// material didn't include one. `listing.cta`:
//   - unset (null/undefined — undefined so this stays safe to call before
//     the `cta` migration has run, when the column is simply absent):
//     use the type-based default below.
//   - "" (explicitly empty): suppress — the description already closes
//     with its own clear call to action, so don't add a second one.
//   - any other string: use that exact wording instead of the default.
export function getListingCta(listing: ListingRow): string | null {
  if (listing.cta === "") return null;
  if (listing.cta) return listing.cta;

  return listing.listing_type === "share"
    ? "Interested in joining the group? Send an enquiry for more information or to discuss the available share."
    : "Interested in this aircraft? Send an enquiry for more information or to contact the seller.";
}
