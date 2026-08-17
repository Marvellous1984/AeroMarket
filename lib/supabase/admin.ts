import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client for server-only writes (enquiries, seller leads).
// Bypasses RLS — never import this into client components.
// Deliberately untyped — see lib/supabase/server.ts for why.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
