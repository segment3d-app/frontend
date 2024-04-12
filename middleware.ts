import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import parseJwtPayload from "./utils/parseJwtPayload";

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("accessToken");
  const pathname = request.nextUrl.pathname;
  const isPayloadValid = () => {
    const payload = parseJwtPayload(accessToken?.value ?? "");
    return (
      payload !== null &&
      payload.expiredAt !== null &&
      new Date(payload.expiredAt) > new Date()
    );
  };
  const publicRoute = ["/", "/auth"];
  const redirectQuery = request.nextUrl.searchParams.get("redirect");

  // Skip middleware for static files
  if (
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".mp4")
  ) {
    return NextResponse.next();
  }

  // Allow access to public routes or if payload is valid
  if (publicRoute.includes(pathname) || isPayloadValid()) {
    return NextResponse.next();
  }

  // If the user is valid and a redirect query exists, redirect them
  if (isPayloadValid() && redirectQuery) {
    return NextResponse.redirect(
      new URL(decodeURIComponent(redirectQuery), request.url),
    );
  }

  // Redirect non-valid users to the auth page with a returnUrl
  const returnUrl = encodeURIComponent(pathname);
  const redirectUrl = new URL("/auth", request.url);
  redirectUrl.searchParams.set("redirect", returnUrl);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
