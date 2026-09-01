import type { ListingFact } from "@/lib/types/database";

// Generic labelled fact block ("Avionics & equipment", "Aircraft & hours",
// ...). Takes the rows and title directly rather than a whole ListingRow,
// so a page can render more than one of these for the same listing with
// different data/heading — see app/listings/[slug]/page.tsx.
export function EquipmentSection({
  items,
  title,
}: {
  items: ListingFact[] | null | undefined;
  title: string;
}) {
  if (!items?.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <dl className="mt-6 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-surface">
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <dt className="text-sm font-medium text-muted">{label}</dt>
            <dd className="text-base font-semibold sm:text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
