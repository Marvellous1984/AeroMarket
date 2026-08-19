import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      [ALLOW_INDEXING ? "allow" : "disallow"]: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
