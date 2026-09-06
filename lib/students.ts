import { createClientSupabaseClient } from "./supabase"

export interface StudentInput {
  userId: string
  firstName: string
  lastName: string
  grade?: string
  section?: string
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
