import Link from "next/link";

// Larger seller pitch shown lower on a sold listing's page, after the
// aircraft detail sections — separate from the small SellerMiniCta that
// already sits in the sidebar on every listing page.
export function SellerCtaSection() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Selling an aircraft or share?
      </p>
      <p className="mt-3 max-w-xl text-muted">
        Have an aircraft or share to sell? BuySellAircraft gives you a clean,
        dedicated listing you can share with prospective buyers.
      </p>
      <Link
        href="/sell"
        className="mt-5 inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
      >
        List your aircraft
      </Link>
    </section>
  );
}
