import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { COOKIE_OPTIONS } from "@repo/supabase/utils/cookies";
import type { Database } from "@repo/supabase/types";

const URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "Forgot to set NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "Forgot to set NEXT_PUBLIC_SUPABASE_ANON_KEY";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(URL!, ANON_KEY!, {
    cookieOptions: COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
