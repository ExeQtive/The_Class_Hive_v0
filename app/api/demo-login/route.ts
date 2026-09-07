import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const DEMO_EMAIL = "demo@theclasshive.com"
const DEMO_USER_ID = "c5369e01-0a8c-4706-9372-32196919fd19"

function daysFromNow(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// Monday of the current week, plus `days` — used to keep seeded lessons inside
// whatever week the dashboard's "this week" filter currently considers current.
function currentWeekPlus(days: number) {
  const now = new Date()
  const day = now.getDay() // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + diffToMonday)
  monday.setDate(monday.getDate() + days)
  return monday.toISOString().slice(0, 10)
}

const LESSON_DATE_OFFSETS: Record<string, number> = {
  "Fractions Introduction": 1, // Tuesday
  "States of Matter": 2,
  "Poetry Analysis": 3,
  "American Revolution Overview": 4, // Friday
}

const TASK_DUE_OFFSETS: Record<string, number> = {
  "Grade Math Quizzes": 0,
  "Prepare Science Lesson": 1,
  "Reply to Parent Emails": 1,
  "Update Student Records": 2,
  "Prepare Parent-Teacher Conference Notes": 3,
  "Order Classroom Supplies": 5,
  "Plan Field Trip Logistics": 7,
}

/**
 * Keeps the demo account's seed data looking current. The seeded dates are
 * static, so without this a lesson seeded for "this week" silently drops out
 * of the dashboard's "Upcoming Lessons" count once the calendar week rolls
 * over. Runs on every demo-login click — cheap (11 rows), so no need to
 * check first whether a refresh is actually needed.
 */
async function refreshDemoDates(admin: any) {
  const results = await Promise.all([
    ...Object.entries(LESSON_DATE_OFFSETS).map(([title, offset]) =>
      admin.from("lessons").update({ date: currentWeekPlus(offset) }).eq("user_id", DEMO_USER_ID).eq("title", title),
    ),
    ...Object.entries(TASK_DUE_OFFSETS).map(([title, offset]) =>
      admin.from("tasks").update({ due_date: daysFromNow(offset) }).eq("user_id", DEMO_USER_ID).eq("title", title),
    ),
  ])

  const failed = results.filter((r) => r.error)
  if (failed.length > 0) {
    throw new Error(`${failed.length} date refresh update(s) failed: ${failed.map((r) => r.error.message).join("; ")}`)
  }
}

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

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  try {
    await refreshDemoDates(admin)
  } catch (error) {
    // Best-effort — a stale date shouldn't block the demo from loading at all.
    console.error("Error refreshing demo dates:", error)
  }

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
