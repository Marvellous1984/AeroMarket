// .uk until the .com is secured — update here once it is.
export const BRAND_NAME = "buysellaircraft.uk";
export const TAGLINE = "Aircraft and shares for sale, without the clutter.";

// The ".uk"/".com" suffix shown as its own accent in the logo — derived
// from BRAND_NAME so the wordmark stays in sync automatically.
export const DOMAIN_SUFFIX = BRAND_NAME.replace("buysellaircraft", "");

// Tolerates NEXT_PUBLIC_SITE_URL being set without a protocol (e.g. a bare
// "my-app.vercel.app") — `new URL()` elsewhere requires an absolute URL.
function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export const SITE_URL = withProtocol(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

// Site stays out of search results until this is explicitly set to "true"
// in the deployment's env vars — flip it on when ready to go live for real.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
