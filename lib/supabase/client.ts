import { createBrowserClient } from "@supabase/ssr";

const globalForSupabase = global as unknown as {
  supabaseClient: ReturnType<typeof createBrowserClient>;
};

export const SupabaseClient =
  globalForSupabase.supabaseClient ||
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

if (process.env.NODE_ENV !== "production")
  globalForSupabase.supabaseClient = SupabaseClient;
