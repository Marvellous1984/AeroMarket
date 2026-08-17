import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Deliberately untyped (no Database generic): the installed
// @supabase/supabase-js (2.112.3, npm "latest") has a generic-resolution bug
// where the Database type collapses to `never` the moment client creation
// and usage cross a function boundary — which all real call sites do. Query
// results are cast to our own row types (lib/types/database.ts) at the
// lib/data/*.ts boundary instead, so typing is still enforced everywhere the
// data is actually used.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // No auth/session writes in this app — reads are anonymous.
        },
      },
    },
  );
}
