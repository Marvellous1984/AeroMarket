import Link from "next/link";

export function SellerMiniCta() {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold tracking-tight">
        Selling an aircraft or share?
      </h3>
      <p className="mt-1.5 text-sm text-muted">
        List your aircraft or ownership share on our new marketplace.
      </p>
      <Link
        href="/sell"
        className="mt-4 inline-block rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
      >
        List yours →
      </Link>
    </div>
  );
}
