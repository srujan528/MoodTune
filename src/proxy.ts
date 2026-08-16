import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Immediately pass through Next.js internal paths, static files, and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !session) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/hmr|favicon.ico|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
