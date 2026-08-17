import Image from "next/image";
import Link from "next/link";
import type { ListingRow } from "@/lib/types/database";
import { formatPrice } from "@/lib/format";
import { getListingSubtitle } from "@/lib/listing";

export function FeaturedListing({ listing }: { listing: ListingRow }) {
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
      className="group grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow hover:shadow-lifted lg:grid-cols-[1.4fr_1fr]"
    >
      <div className="relative aspect-[4/3] lg:aspect-auto">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
        <span className="absolute left-5 top-5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
          {listing.listing_type === "share" ? "Share" : "For sale"}
        </span>
      </div>

      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {listing.manufacturer} {listing.model}
          </h3>
          <p className="mt-2 text-base font-medium text-muted">{subtitle}</p>
        </div>

        <p className="text-4xl font-semibold tracking-tight text-accent">
          {formatPrice(listing.price)}
        </p>

        {quickFacts.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-1 text-sm text-muted">
            {quickFacts.map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-border px-3.5 py-1.5"
              >
                {fact}
              </span>
            ))}
          </div>
        ) : null}

        <span className="mt-4 inline-flex w-fit items-center gap-2 text-base font-semibold text-accent">
          View listing
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
