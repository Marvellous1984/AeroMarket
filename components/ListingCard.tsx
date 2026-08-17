import Image from "next/image";
import Link from "next/link";
import type { ListingRow } from "@/lib/types/database";
import { formatPrice } from "@/lib/format";
import { getListingSubtitle } from "@/lib/listing";

export function ListingCard({ listing }: { listing: ListingRow }) {
  const hero = listing.images[0];
  const subtitle = getListingSubtitle(listing);

  const quickFacts = [
    listing.year ? String(listing.year) : null,
    listing.engine_hours_since_rebuild
      ? `~${listing.engine_hours_since_rebuild} hrs since factory-rebuilt engine`
      : null,
  ].filter(Boolean);

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:shadow-lifted"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-background">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        <span className="absolute left-4 top-4 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
          {listing.listing_type === "share" ? "Share" : "For sale"}
        </span>
      </div>

      <div className="space-y-2.5 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">
          {listing.manufacturer} {listing.model}
        </h3>
        <p className="text-sm font-medium text-muted">{subtitle}</p>
        <p className="text-3xl font-semibold tracking-tight text-accent">
          {formatPrice(listing.price)}
        </p>

        {quickFacts.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1 text-sm text-muted">
            {quickFacts.map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-border px-3 py-1"
              >
                {fact}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
