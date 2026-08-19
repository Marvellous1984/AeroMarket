// Brand name is not yet chosen — change this single value once it is.
// Deliberately left as a placeholder rather than an invented name.
export const BRAND_NAME = "[BRAND]";
export const TAGLINE = "Aircraft and shares for sale, without the clutter.";

// Tolerates NEXT_PUBLIC_SITE_URL being set without a protocol (e.g. a bare
// "my-app.vercel.app") — `new URL()` elsewhere requires an absolute URL.
function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export const SITE_URL = withProtocol(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);
