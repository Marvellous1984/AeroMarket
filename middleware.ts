import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/config/brand";

// Vercel redirects apex <-> www depending on domain setup, so a request
// can legitimately terminate on either host — both are "the real site",
// not an alias to be blocked. Normalize and accept both.
const bareHost = new URL(SITE_URL).host.toLowerCase().replace(/^www\./, "");
const CANONICAL_HOSTS = new Set([bareHost, `www.${bareHost}`]);

// Independent of the site-wide ALLOW_INDEXING toggle: whatever host this
// deploys to besides the canonical domain (the Vercel preview/production
// URL, any other alias) must never be indexable, even after the canonical
// domain itself goes live for real. This is the standing rule; the
// site-wide toggle in lib/config/brand.ts is the separate "not ready to
// launch yet" gate.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const response = NextResponse.next();

  if (!CANONICAL_HOSTS.has(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
