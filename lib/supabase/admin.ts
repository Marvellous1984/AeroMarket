import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client for server-only writes (enquiries, seller leads) and
// for reading a listing by slug regardless of status (draft preview).
// Bypasses RLS — never import this into client components.
// Deliberately untyped — see lib/supabase/server.ts for why.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      // Listing content is edited directly in the database (see
      // supabase/seed_*.sql) — Next.js's fetch patching would otherwise
      // cache these requests in its Data Cache, so an edit wouldn't show up
      // until something invalidated it. Always hit Supabase fresh.
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    },
  );
}
