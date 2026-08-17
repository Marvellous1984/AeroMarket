import type { MetadataRoute } from "next";
import { getListings } from "@/lib/data/listings";
import { SITE_URL } from "@/lib/config/brand";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/aircraft` },
    { url: `${SITE_URL}/shares` },
    { url: `${SITE_URL}/sell` },
  ];

  const listingRoutes: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${SITE_URL}/listings/${listing.slug}`,
    lastModified: listing.published_at ?? undefined,
  }));

  return [...staticRoutes, ...listingRoutes];
}
