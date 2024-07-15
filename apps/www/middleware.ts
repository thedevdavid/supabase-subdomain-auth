import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request);

  // Handle docs subdomain
  const hostname = request.headers.get("host") || "";
  if (hostname.startsWith("docs.")) {
    const url = request.nextUrl;
    // Already on docs subdomain, just remove the /docs prefix if present
    if (url.pathname.startsWith("/docs")) {
      url.pathname = url.pathname.replace("/docs", "");
    }

    const res = NextResponse.rewrite(
      new URL(`/docs${url.pathname}`, request.url),
      { request }
    );
    const supacookies = supabaseResponse.cookies.getAll();
    supacookies.forEach((c) => res.cookies.set(c));
    return res;
  }

  // Also handle /docs redirects here instead of in next.config.mjs
  // if (url.pathname.startsWith("/docs")) {
  //   const newUrl = new URL(url.pathname, `https://docs.${hostname}`);
  //   return NextResponse.redirect(newUrl);
  // }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
