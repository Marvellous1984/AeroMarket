import Link from "next/link";
import { getListings } from "@/lib/data/listings";
import { FeaturedListing } from "@/components/FeaturedListing";

export default async function HomePage() {
  const listings = await getListings();

  return (
    <>
      <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-20 sm:px-8 sm:pt-28 lg:px-10">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Find your next aircraft.
        </h1>
        <p className="mt-6 max-w-xl text-xl text-muted">
          Aircraft and shares for sale, without the clutter.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/aircraft"
            className="rounded-lg border border-border bg-surface px-7 py-3.5 text-base font-semibold shadow-card transition-colors hover:border-accent hover:text-accent"
          >
            Aircraft
          </Link>
          <Link
            href="/shares"
            className="rounded-lg border border-border bg-surface px-7 py-3.5 text-base font-semibold shadow-card transition-colors hover:border-accent hover:text-accent"
          >
            Shares
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-4 sm:px-8 lg:px-10">
        <h2 className="mb-8 text-3xl font-semibold tracking-tight">
          Latest aircraft &amp; shares
        </h2>
        <div className="grid gap-8">
          {listings.map((listing) => (
            <FeaturedListing key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </>
  );
}
