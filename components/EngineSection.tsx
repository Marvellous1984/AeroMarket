import Image from "next/image";
import type { ListingRow } from "@/lib/types/database";

export function EngineSection({ listing }: { listing: ListingRow }) {
  if (!listing.engine_summary) return null;

  const heading = listing.engine_rebuilt_date
    ? `Factory-rebuilt engine · ${listing.engine_rebuilt_date}`
    : "Engine";

  const enginePhoto = listing.images.find((img) =>
    img.alt.toLowerCase().includes("engine"),
  );

  return (
    <section className="grid gap-8 rounded-2xl border border-border bg-surface p-8 sm:p-10 md:grid-cols-2 md:items-center">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">{heading}</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
          {listing.engine_summary}
        </p>

        {listing.engine_hours_since_rebuild ? (
          <p className="mt-8 text-6xl font-semibold tracking-tight text-accent">
            ~{listing.engine_hours_since_rebuild}
            <span className="ml-3 text-lg font-medium text-foreground">
              hours since installation
            </span>
          </p>
        ) : null}
      </div>

      {enginePhoto ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background">
          <Image
            src={enginePhoto.src}
            alt={enginePhoto.alt}
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
