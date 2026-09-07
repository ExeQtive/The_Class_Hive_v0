import { NextResponse } from "next/server"

const DEMO_EMAIL = "demo@theclasshive.com"

/**
 * One-click login as the seeded demo teacher. Uses the service-role key
 * (server-only) to generate a magic link for the demo account and redirects
 * the visitor through it — no password, no email round-trip.
 *
 * Calls the Admin REST endpoint directly instead of supabase-js's
 * admin.generateLink(): that SDK method silently drops options.redirectTo
 * for type "magiclink" in the installed version, always falling back to the
 * project's default Site URL. The raw REST body (redirect_to, top-level,
 * snake_case) is confirmed to work.
 */
export async function POST(request: Request) {
  const { origin } = new URL(request.url)

  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/generate_link`, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "magiclink",
      email: DEMO_EMAIL,
      redirect_to: `${origin}/auth/callback`,
    }),
  })

  const data = await response.json()

  if (!response.ok || !data?.action_link) {
    return NextResponse.redirect(`${origin}/login?error=Could not start the demo`, { status: 303 })
  }

  return NextResponse.redirect(data.action_link, { status: 303 })
}
