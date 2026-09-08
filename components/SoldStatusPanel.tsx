import Link from "next/link";
import type { ListingRow } from "@/lib/types/database";
import { getBrowseHref } from "@/lib/listing";

// Sits near the top of a sold listing's page, just under the price area —
// see components/BuyerCta.tsx for the second, sidebar-placed prompt that
// replaces the enquiry form further down.
export function SoldStatusPanel({ listing }: { listing: ListingRow }) {
  const isShare = listing.listing_type === "share";

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">
        Sold
      </p>
      <p className="mt-2 text-lg font-medium">
        This {isShare ? "aircraft share" : "aircraft"} has now been sold.
      </p>
      <p className="mt-1 text-muted">
        Looking for something similar? Browse the aircraft and shares
        currently available on BuySellAircraft.
      </p>
      <Link
        href={getBrowseHref(listing)}
        className="mt-5 inline-flex items-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Browse available aircraft
      </Link>
    </section>
  );
}
