import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client with service role — use only in server routes (bypassese RLS).
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for admin API",
    );
  }
  return createClient(url, key);
}
