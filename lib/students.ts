import { createClientSupabaseClient } from "./supabase"

export interface Student {
  id: string
  userId: string
  firstName: string
  lastName: string
  grade: string | null
  section: string | null
}

export interface StudentInput {
  userId: string
  firstName: string
  lastName: string
  grade?: string
  section?: string
}

/**
 * Fetch all students belonging to a user.
 */
export async function getStudentsForUser(userId: string): Promise<Student[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("students")
    .select("id, user_id, first_name, last_name, grade, section")
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching students:", error)
    throw new Error(`Failed to fetch students: ${error.message}`)
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    grade: row.grade,
    section: row.section,
  }))
}

/**
 * Create a new student record.
 */
export async function createStudent(input: StudentInput) {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("students")
    .insert({
      user_id: input.userId,
      first_name: input.firstName,
      last_name: input.lastName,
      grade: input.grade ?? null,
      section: input.section ?? null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating student:", error)
    throw new Error(`Failed to create student: ${error.message}`)
  }

  return data
}
