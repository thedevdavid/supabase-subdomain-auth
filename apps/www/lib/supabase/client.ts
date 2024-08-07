import { createBrowserClient } from "@supabase/ssr";
import { COOKIE_OPTIONS } from "@repo/supabase/utils/cookies";
import type { Database } from "@repo/supabase/types";

const URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "Forgot to set NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "Forgot to set NEXT_PUBLIC_SUPABASE_ANON_KEY";

export function createClient() {
  return createBrowserClient<Database>(URL!, ANON_KEY!, {
    cookieOptions: COOKIE_OPTIONS,
  });
}
