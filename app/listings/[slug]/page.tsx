import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getListingBySlug } from "@/lib/data/listings";
import {
  getListingCta,
  getListingPriceLabel,
  getListingSubtitle,
  getListingTitle,
  isDraftListing,
  isSoldListing,
} from "@/lib/listing";
import { formatPrice } from "@/lib/format";
import { BRAND_NAME, SITE_URL } from "@/lib/config/brand";
import { DraftBanner } from "@/components/DraftBanner";
import { Gallery } from "@/components/Gallery";
import { HighlightCards } from "@/components/HighlightCards";
import { EngineSection } from "@/components/EngineSection";
import { EquipmentSection } from "@/components/EquipmentSection";
import { GroupSection } from "@/components/GroupSection";
import { AirportSection } from "@/components/AirportSection";
import { InsuranceSection } from "@/components/InsuranceSection";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ShareButton } from "@/components/ShareButton";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { SellerMiniCta } from "@/components/SellerMiniCta";
import { SoldStatusPanel } from "@/components/SoldStatusPanel";
import { BuyerCta } from "@/components/BuyerCta";
import { SellerCtaSection } from "@/components/SellerCtaSection";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return {};

  const isSold = isSoldListing(listing);
  const title = `${getListingTitle(listing)} · ${getListingSubtitle(listing)}${isSold ? " · Sold" : ""}`;
  const description = [
    isSold ? "Sold" : formatPrice(listing.price),
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
    // Draft listings must never be indexed, regardless of the site-wide
    // robots.ts allow/disallow toggle — this is a per-listing override.
    robots: isDraftListing(listing)
      ? { index: false, follow: false }
      : undefined,
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

  const title = getListingTitle(listing);
  const subtitle = getListingSubtitle(listing);
  const isDraft = isDraftListing(listing);
  const isSold = isSoldListing(listing);
  const badge = `${isSold ? "Sold" : "For sale"} · ${listing.listing_type === "share" ? "Share" : "Aircraft"}`;
  // A sold listing's description shouldn't close with marketplace copy that
  // invites an enquiry ("Send an enquiry...") — the sold-state CTAs cover
  // that instead (SoldStatusPanel / BuyerCta / SellerCtaSection below).
  const cta = isSold ? null : getListingCta(listing);
  // The CTA is marketplace copy, not a seller-supplied fact — appended at
  // render time as the closing paragraph rather than stored in
  // `description`, so it never gets mixed up with what the seller actually
  // said.
  const paragraphs = [
    ...(listing.description?.split("\n\n") ?? []),
    ...(cta ? [cta] : []),
  ];

  // Draft listings are excluded from structured data for public marketplace
  // inventory — they aren't for sale yet as far as the outside world knows.
  // A sold listing keeps its structured data (still a real, historical
  // listing) but must never claim to be in stock or expose a price that
  // would read as still active.
  const jsonLd = isDraft
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description: listing.description ?? undefined,
        image: listing.images.map((img) => `${SITE_URL}${img.src}`),
        offers: {
          "@type": "Offer",
          ...(!isSold && listing.price !== null ? { price: listing.price } : {}),
          priceCurrency: "GBP",
          availability: isSold
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
          url: `${SITE_URL}/listings/${listing.slug}`,
        },
      };

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      {isDraft ? <DraftBanner /> : null}

      <div className="mx-auto max-w-[1320px] px-5 pb-28 pt-8 sm:px-8 sm:pb-16 lg:px-10">
        <Gallery images={listing.images} sold={isSold} />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {badge}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-2 text-lg font-medium text-muted">
              {subtitle}
              {listing.registration && listing.registration !== "[TO VERIFY]"
                ? ` · ${listing.registration}`
                : ""}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                {getListingPriceLabel(listing)}
              </p>
              <ShareButton title={title} text={`${title} · ${subtitle}`} />
            </div>

            {isSold ? (
              <div className="mt-6">
                <SoldStatusPanel listing={listing} />
              </div>
            ) : null}

            <div className="mt-10">
              <HighlightCards listing={listing} />
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
              <EquipmentSection
                items={listing.specs}
                title={listing.specs_title ?? "Aircraft & hours"}
              />
            </div>

            <div className="mt-14">
              <EquipmentSection
                items={listing.equipment}
                title={listing.equipment_title ?? "Avionics & equipment"}
              />
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

            {isSold ? (
              <div className="mt-14">
                <SellerCtaSection />
              </div>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28">
            {isSold ? (
              <BuyerCta listing={listing} />
            ) : (
              <EnquiryForm
                listingId={listing.id}
                isShare={listing.listing_type === "share"}
                isDraft={isDraft}
              />
            )}
            <SellerMiniCta />
          </aside>
        </div>
      </div>

      {isDraft || isSold ? null : <StickyMobileCta price={listing.price} />}
    </>
  );
}
