import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_OPTIONS } from "@repo/supabase/utils/cookies";
import type { Database } from "@repo/supabase/types";
import { cookies } from "next/headers";

const URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "Forgot to set NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "Forgot to set NEXT_PUBLIC_SUPABASE_ANON_KEY";
const COOKIE_NAME = process.env.COOKIE_NAME ?? "appname:session";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(URL!, ANON_KEY!, {
    cookieOptions: COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    const cookieStore = cookies();
    const hasCookie = cookieStore.has(COOKIE_NAME);

    // no user or corrupted session(?). Check if there's a session cookie. If yes, make sure to delete it.
    if (hasCookie) {
      const cookiesToDelete = [
        `${COOKIE_NAME}`,
        `${COOKIE_NAME}-code-verifier`,
      ];

      const res = NextResponse.next({ request });
      const supacookies = supabaseResponse.cookies.getAll();
      supacookies.forEach((c) => res.cookies.set(c));
      cookiesToDelete.forEach((c) => res.cookies.delete(c));
      return res;
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
