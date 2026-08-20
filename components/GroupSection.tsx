import type { ListingRow } from "@/lib/types/database";

export function GroupSection({ listing }: { listing: ListingRow }) {
  if (listing.group_facts.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight">The group</h2>
      <ul className="mt-6 columns-1 gap-x-8 sm:columns-2">
        {listing.group_facts.map((fact) => (
          <li key={fact} className="mb-4 flex break-inside-avoid items-start gap-3">
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
            <span className="text-base leading-relaxed text-muted">{fact}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
