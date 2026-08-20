import type { MetadataRoute } from "next";
import { BRAND_NAME, TAGLINE } from "@/lib/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: "buysellaircraft",
    description: TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#182230",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
