import type { ListingRow } from "@/lib/types/database";

export function EquipmentSection({
  listing,
  title = "Avionics & equipment",
}: {
  listing: ListingRow;
  title?: string;
}) {
  if (!listing.equipment?.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <dl className="mt-6 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-surface">
        {listing.equipment.map(({ label, value }) => (
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
