// Conditional import based on environment
import { db as mockDb } from "./db-mock"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// This is a wrapper around the database client
// In production, this would use Prisma
// In development/preview, it uses mock data
export const db =
  process.env.NODE_ENV === "production"
    //? require("./db-prisma").db // This would be your actual Prisma client
    //: 
    mockDb

export default db

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export async function getUser(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateUser(userId: string, userData: any) {
  const { data, error } = await supabase.from("users").update(userData).eq("id", userId).select()

  if (error) throw error
  return data
}

export async function getLessons(userId: string) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getTasks(userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true })

  if (error) throw error
  return data || []
}

export async function getResources(userId: string) {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getStudents(userId: string) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("teacher_id", userId)
    .order("last_name", { ascending: true })

  if (error) throw error
  return data || []
}

// Add any other database functions you need here
