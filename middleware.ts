import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/config/brand";

const CANONICAL_HOST = new URL(SITE_URL).host.toLowerCase();

// Independent of the site-wide ALLOW_INDEXING toggle: whatever host this
// deploys to besides the canonical domain (the Vercel preview/production
// URL, any other alias) must never be indexable, even after the canonical
// domain itself goes live for real. This is the standing rule; the
// site-wide toggle in lib/config/brand.ts is the separate "not ready to
// launch yet" gate.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const response = NextResponse.next();

  if (host !== CANONICAL_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
