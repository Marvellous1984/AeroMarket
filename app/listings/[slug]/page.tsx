import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getListingBySlug } from "@/lib/data/listings";
import { getListingSubtitle, getListingTitle } from "@/lib/listing";
import { formatPrice } from "@/lib/format";
import { BRAND_NAME, SITE_URL } from "@/lib/config/brand";
import { Gallery } from "@/components/Gallery";
import { OwnershipSnapshot } from "@/components/OwnershipSnapshot";
import { EngineSection } from "@/components/EngineSection";
import { GroupSection } from "@/components/GroupSection";
import { AirportSection } from "@/components/AirportSection";
import { InsuranceSection } from "@/components/InsuranceSection";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ShareButton } from "@/components/ShareButton";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SellerMiniCta } from "@/components/SellerMiniCta";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return {};

  const title = `${getListingTitle(listing)} · ${getListingSubtitle(listing)}`;
  const description = [
    formatPrice(listing.price),
    listing.location,
    listing.engine_summary,
  ]
    .filter(Boolean)
    .join(" · ");
  const image = listing.images[0]?.src;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/listings/${listing.slug}` },
    openGraph: {
      title: `${title} · ${BRAND_NAME}`,
      description,
      url: `${SITE_URL}/listings/${listing.slug}`,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: { slug: string };
}) {
  const listing = await getListingBySlug(params.slug);
  if (!listing) notFound();

  const badge = `For sale · ${listing.listing_type === "share" ? "Share" : "Aircraft"}`;
  const title = getListingTitle(listing);
  const subtitle = getListingSubtitle(listing);
  const paragraphs = listing.description?.split("\n\n") ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: listing.description ?? undefined,
    image: listing.images.map((img) => `${SITE_URL}${img.src}`),
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/listings/${listing.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1320px] px-5 pb-28 pt-8 sm:px-8 sm:pb-16 lg:px-10">
        <Gallery images={listing.images} />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {badge}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-2 text-lg font-medium text-muted">{subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                {formatPrice(listing.price)}
              </p>
              <ShareButton title={title} text={`${title} · ${subtitle}`} />
            </div>

            <div className="mt-10">
              <OwnershipSnapshot listing={listing} />
            </div>

            {paragraphs.length > 0 ? (
              <section className="mt-12 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
                {paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </section>
            ) : null}

            <div className="mt-12">
              <EngineSection listing={listing} />
            </div>

            <div className="mt-14">
              <GroupSection listing={listing} />
            </div>

            <div className="mt-14">
              <AirportSection listing={listing} />
            </div>

            <div className="mt-14">
              <InsuranceSection listing={listing} />
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            <EnquiryForm listing={listing} />
            <SellerMiniCta />
          </aside>
        </div>
      </div>

      <StickyMobileCta price={listing.price} />
    </>
  );
}
