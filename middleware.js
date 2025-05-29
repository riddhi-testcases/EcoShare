import { NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/dashboard", "/list-item"]

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/?auth=login", request.url))
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL("/?auth=login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/list-item/:path*"],
}
