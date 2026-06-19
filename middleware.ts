import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Paths that require authentication
  const authRequiredPaths = [
    "/dashboard",
    "/lesson-planning",
    "/task-management",
    "/resource-library",
    "/student-management",
    "/parent-communication",
    "/small-groups",
    "/ai-assistant",
    "/settings",
    "/profile",
  ]

  // Check if the path requires authentication
  const isAuthRequired = authRequiredPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect to login if authentication is required but user is not authenticated
  if (isAuthRequired && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Check for subscription status for premium features
  if (isAuthenticated && request.nextUrl.pathname.startsWith("/ai-assistant")) {
    // @ts-ignore - token.planType is added in our auth callbacks
    const planType = token.planType || "free"
    // @ts-ignore
    const isLifetimeMember = token.isLifetimeMember || false
    // @ts-ignore
    const trialEndsAt = token.trialEndsAt ? new Date(token.trialEndsAt) : null
    const now = new Date()

    const hasAccess = planType !== "free" || isLifetimeMember || (trialEndsAt && trialEndsAt > now)

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/pricing", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lesson-planning/:path*",
    "/task-management/:path*",
    "/resource-library/:path*",
    "/student-management/:path*",
    "/parent-communication/:path*",
    "/small-groups/:path*",
    "/ai-assistant/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/pricing/:path*",
  ],
}
