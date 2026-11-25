import { NextResponse, type NextRequest } from "next/server";

// The store pages live under app/store/. Every request is rewritten internally to /store/*, so the public URLs
// stay clean (<store domain>/products/x). In my portfolio's monorepo the same app also serves the
// portfolio, and this rewrite only happens on the store's host.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/store")) {
    // old or duplicated path: strip the prefix
    const clean = pathname.replace(/^\/store/, "") || "/";
    return NextResponse.redirect(new URL(clean + search, request.url), 308);
  }
  if (pathname.startsWith("/api/revalidate")) return NextResponse.next();   // called by the API after stock changes
  const url = request.nextUrl.clone();
  url.pathname = `/store${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)$).*)"],
};
