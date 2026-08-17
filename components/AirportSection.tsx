import Image from "next/image";
import type { ListingRow } from "@/lib/types/database";

export function AirportSection({ listing }: { listing: ListingRow }) {
  if (!listing.airport_name) return null;

  const contextPhoto = listing.images.find((img) =>
    /apron|airfield/i.test(img.alt),
  );

  const mapQuery = [listing.airport_name, listing.airport_code]
    .filter(Boolean)
    .join(" ");
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <section className="grid gap-8 rounded-2xl border border-border bg-surface p-8 sm:p-10 md:grid-cols-2 md:items-center">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Based at {listing.airport_name}
        </h2>
        {listing.airport_code ? (
          <p className="mt-2 text-lg font-medium text-muted">
            {listing.airport_name} ({listing.airport_code})
          </p>
        ) : null}

        <a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-accent hover:underline"
        >
          View on map
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {contextPhoto ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background">
          <Image
            src={contextPhoto.src}
            alt={contextPhoto.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            loading="lazy"
            className="object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}
