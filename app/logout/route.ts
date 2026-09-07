import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * Server-side logout — clears the session cookies. POST, not GET: a GET
 * logout route can be triggered by prefetching or link crawlers.
 */
export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  const { origin } = new URL(request.url)
  return NextResponse.redirect(`${origin}/`, { status: 303 })
}
