import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-safe Supabase instance — used by server components and client components alike
export const supabase = createClient(supabaseUrl, supabaseKey)

// Named export kept for backward compatibility with existing imports
export const createClientSupabaseClient = () =>
  createClient(supabaseUrl, supabaseKey)

export const createServerSupabaseClient = () =>
  createClient(supabaseUrl, supabaseKey)