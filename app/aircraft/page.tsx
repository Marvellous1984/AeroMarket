import type { Metadata } from "next";
import { getListings } from "@/lib/data/listings";
import { ListingCard } from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Aircraft for sale",
};

export default async function AircraftPage() {
  const listings = await getListings({ listingType: "whole" });

  return (
    <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">
        Aircraft for sale
      </h1>

      {listings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="max-w-md text-muted">
          No whole aircraft listed yet — check back soon, or{" "}
          <a href="/sell" className="text-accent hover:underline">
            let us know if you have one to sell
          </a>
          .
        </p>
      )}
    </section>
  );
}
