import { createClientSupabaseClient } from "./supabase"

export interface Resource {
  id: string
  userId: string
  title: string
  description: string | null
  type: string | null
  format: string | null
  subject: string | null
  gradeLevel: string[]
  tags: string[]
  isFavorite: boolean
}

export interface ResourceInput {
  userId: string
  title: string
  description?: string
  type?: string
  format?: string
  subject?: string
  gradeLevel?: string[]
  tags?: string[]
  url?: string
}

/**
 * Fetch all resources belonging to a user, most recently added first.
 */
export async function getResourcesForUser(userId: string): Promise<Resource[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resources:", error)
    throw new Error(`Failed to fetch resources: ${error.message}`)
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    type: row.type,
    format: row.format,
    subject: row.subject,
    gradeLevel: row.grade_level ?? [],
    tags: row.tags ?? [],
    isFavorite: row.is_favorite ?? false,
  }))
}

/**
 * Create a new resource record.
 */
export async function createResource(input: ResourceInput) {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("resources")
    .insert({
      user_id: input.userId,
      title: input.title,
      description: input.description ?? null,
      type: input.type ?? null,
      format: input.format ?? null,
      subject: input.subject ?? null,
      grade_level: input.gradeLevel ?? [],
      tags: input.tags ?? [],
      url: input.url ?? null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating resource:", error)
    throw new Error(`Failed to create resource: ${error.message}`)
  }

  return data
}
