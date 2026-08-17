import type { ListingRow } from "@/lib/types/database";

export function InsuranceSection({ listing }: { listing: ListingRow }) {
  if (!listing.insurance_info) return null;

  return (
    <section>
      <h2 className="text-3xl font-semibold tracking-tight">
        Insurance requirement
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        {listing.insurance_info}
      </p>
    </section>
  );
}
