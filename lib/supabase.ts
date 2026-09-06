import { createClient } from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-safe Supabase instance — used by server components and client components alike.
// Uses cookie-based sessions (via @supabase/ssr) so middleware/server code can read the
// signed-in user; a plain createClient() session lives only in localStorage and is
// invisible to middleware.
export const supabase = createBrowserClient(supabaseUrl, supabaseKey)

// Named export kept for backward compatibility with existing imports
export const createClientSupabaseClient = () =>
  createBrowserClient(supabaseUrl, supabaseKey)

export const createServerSupabaseClient = () =>
  createClient(supabaseUrl, supabaseKey)

// Returns the currently signed-in Supabase Auth user, or null if signed out.
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}