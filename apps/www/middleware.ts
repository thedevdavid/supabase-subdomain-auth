import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // return await updateSession(request);
  const supabaseResponse = await updateSession(request);

  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Handle subdomain routing
  if (hostname.startsWith("docs.")) {
    // Rewrite to /docs path
    url.pathname = `/docs${url.pathname}`;
    return NextResponse.rewrite(url);
  }
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
