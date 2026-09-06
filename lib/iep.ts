import { createClientSupabaseClient } from "./supabase"

export interface IEPWithStudent {
  id: string
  studentId: string
  studentName: string
  grade: string | null
  startDate: string
  reviewDate: string
  endDate: string
  status: string
}

export interface IEPInput {
  userId: string
  studentId: string
  startDate: string
  reviewDate: string
  endDate: string
  status?: string
  primaryDisability?: string
  accommodations?: string[]
}

/**
 * Fetch all IEPs belonging to a user, joined with basic student info.
 */
export async function getIEPsForUser(userId: string): Promise<IEPWithStudent[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("ieps")
    .select("id, student_id, start_date, review_date, end_date, status, students(first_name, last_name, grade)")
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching IEPs:", error)
    throw new Error(`Failed to fetch IEPs: ${error.message}`)
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    studentId: row.student_id,
    studentName: `${row.students?.first_name ?? ""} ${row.students?.last_name ?? ""}`.trim(),
    grade: row.students?.grade ?? null,
    startDate: row.start_date,
    reviewDate: row.review_date,
    endDate: row.end_date,
    status: row.status,
  }))
}

/**
 * Create a new IEP record.
 */
export async function createIEP(input: IEPInput) {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("ieps")
    .insert({
      user_id: input.userId,
      student_id: input.studentId,
      start_date: input.startDate,
      review_date: input.reviewDate,
      end_date: input.endDate,
      status: input.status ?? "active",
      primary_disability: input.primaryDisability ?? null,
      accommodations: input.accommodations ?? [],
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating IEP:", error)
    throw new Error(`Failed to create IEP: ${error.message}`)
  }

  return data
}

/**
 * Update an existing IEP record. Only fields present in `updates` are changed.
 */
export async function updateIEP(id: string, updates: Partial<IEPInput>) {
  const supabase = createClientSupabaseClient()

  const payload: Record<string, unknown> = {}
  if (updates.studentId !== undefined) payload.student_id = updates.studentId
  if (updates.startDate !== undefined) payload.start_date = updates.startDate
  if (updates.reviewDate !== undefined) payload.review_date = updates.reviewDate
  if (updates.endDate !== undefined) payload.end_date = updates.endDate
  if (updates.status !== undefined) payload.status = updates.status
  if (updates.primaryDisability !== undefined) payload.primary_disability = updates.primaryDisability
  if (updates.accommodations !== undefined) payload.accommodations = updates.accommodations

  const { data, error } = await supabase.from("ieps").update(payload).eq("id", id).select().single()

  if (error) {
    console.error("Error updating IEP:", error)
    throw new Error(`Failed to update IEP: ${error.message}`)
  }

  return data
}
