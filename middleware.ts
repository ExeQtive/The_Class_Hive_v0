import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

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

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)
  const isAuthenticated = !!user

  // Check if the path requires authentication
  const isAuthRequired = authRequiredPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  // Redirect to login if authentication is required but user is not authenticated
  if (isAuthRequired && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
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
