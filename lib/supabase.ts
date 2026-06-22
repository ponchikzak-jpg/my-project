import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client. Uses the service-role key, which bypasses
// Row Level Security — NEVER import this into a client component.
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type Lead = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  message: string | null;
  created_at: string;
};
