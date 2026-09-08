import Link from "next/link";
import type { ListingRow } from "@/lib/types/database";
import { getBrowseHref } from "@/lib/listing";

// Replaces EnquiryForm in the sidebar once a listing is sold — same slot,
// same id (so nothing else that scrolls to #enquiry breaks), no way for a
// buyer to actually submit an enquiry against a sold listing.
export function BuyerCta({ listing }: { listing: ListingRow }) {
  const isShare = listing.listing_type === "share";

  return (
    <section id="enquiry" className="rounded-2xl border border-border bg-surface p-7">
      <h2 className="text-2xl font-semibold tracking-tight">
        Want something like this?
      </h2>
      <p className="mt-2 text-muted">
        This {isShare ? "share" : "aircraft"} has sold, but you can browse
        the {isShare ? "shares" : "aircraft"} currently available.
      </p>
      <Link
        href={getBrowseHref(listing)}
        className="mt-6 block w-full rounded-lg bg-accent px-7 py-4 text-center text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        {isShare ? "Browse aircraft & shares" : "View available aircraft"}
      </Link>
    </section>
  );
}
