import type { ListingRow } from "@/lib/types/database";

export function InsuranceSection({ listing }: { listing: ListingRow }) {
  if (!listing.insurance_points?.length && !listing.insurance_info) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight">
        Pilot requirements
      </h2>

      {listing.insurance_points?.length ? (
        <ul className="mt-6 max-w-2xl space-y-4">
          {listing.insurance_points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <svg
                className="mt-1 shrink-0 text-accent"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-base leading-relaxed text-muted">{point}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {listing.insurance_info}
        </p>
      )}
    </section>
  );
}
