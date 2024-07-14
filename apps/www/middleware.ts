import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // return await updateSession(request);
  const supabaseResponse = await updateSession(request);

  // const url = request.nextUrl;
  // const hostname = request.headers.get("host") || "";

  // // Handle docs subdomain
  // if (hostname.startsWith("docs.")) {
  //   // Already on docs subdomain, just remove the /docs prefix if present
  //   if (url.pathname.startsWith("/docs")) {
  //     url.pathname = url.pathname.replace("/docs", "");
  //   }
  //   return NextResponse.rewrite(new URL(`/docs${url.pathname}`, request.url));
  // }

  // // Handle /docs path on main domain
  // if (url.pathname.startsWith("/docs")) {
  //   const newUrl = new URL(url.pathname, `https://docs.${hostname}`);
  //   return NextResponse.redirect(newUrl);
  // }

  return supabaseResponse;
  // // Handle subdomain routing
  // if (hostname.startsWith("docs.")) {
  //   // Rewrite to /docs path
  //   url.pathname = `/docs${url.pathname}`;
  //   return NextResponse.rewrite(url);
  // }
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
