import { createClientSupabaseClient } from "./supabase"

export interface Lesson {
  id: string
  userId: string
  title: string
  subject: string | null
  grade: string | null
  duration: string | null
  date: string | null
  status: string
  objectives: string[]
  materials: string[]
  standards: string[]
  content: string | null
}

export interface LessonInput {
  userId: string
  title: string
  subject?: string
  grade?: string
  duration?: string
  date?: string
  status?: string
  objectives?: string[]
  materials?: string[]
  standards?: string[]
  content?: string
}

/**
 * Fetch all lessons belonging to a user, most recent date first.
 */
export async function getLessonsForUser(userId: string): Promise<Lesson[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching lessons:", error)
    throw new Error(`Failed to fetch lessons: ${error.message}`)
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    subject: row.subject,
    grade: row.grade,
    duration: row.duration,
    date: row.date,
    status: row.status,
    objectives: row.objectives ?? [],
    materials: row.materials ?? [],
    standards: row.standards ?? [],
    content: row.content,
  }))
}

/**
 * Create a new lesson record.
 */
export async function createLesson(input: LessonInput) {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("lessons")
    .insert({
      user_id: input.userId,
      title: input.title,
      subject: input.subject ?? null,
      grade: input.grade ?? null,
      duration: input.duration ?? null,
      date: input.date ?? null,
      status: input.status ?? "draft",
      objectives: input.objectives ?? [],
      materials: input.materials ?? [],
      standards: input.standards ?? [],
      content: input.content ?? null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating lesson:", error)
    throw new Error(`Failed to create lesson: ${error.message}`)
  }

  return data
}
