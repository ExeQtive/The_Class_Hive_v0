import { createClientSupabaseClient } from "./supabase"

export interface Task {
  id: string
  userId: string
  title: string
  description: string | null
  dueDate: string | null
  priority: string | null
  status: string
  category: string | null
}

export interface TaskInput {
  userId: string
  title: string
  description?: string
  dueDate?: string
  priority?: string
  status?: string
  category?: string
  assignedTo?: string
  relatedTo?: string
}

/**
 * Fetch all tasks belonging to a user, soonest due date first.
 */
export async function getTasksForUser(userId: string): Promise<Task[]> {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true })

  if (error) {
    console.error("Error fetching tasks:", error)
    throw new Error(`Failed to fetch tasks: ${error.message}`)
  }

  return (data ?? []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    dueDate: row.due_date,
    priority: row.priority,
    status: row.status,
    category: row.category,
  }))
}

/**
 * Create a new task record.
 */
export async function createTask(input: TaskInput) {
  const supabase = createClientSupabaseClient()

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: input.userId,
      title: input.title,
      description: input.description ?? null,
      due_date: input.dueDate ?? null,
      priority: input.priority ?? null,
      status: input.status ?? "todo",
      category: input.category ?? null,
      assigned_to: input.assignedTo ?? null,
      related_to: input.relatedTo ?? null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating task:", error)
    throw new Error(`Failed to create task: ${error.message}`)
  }

  return data
}

/**
 * Update an existing task's status (e.g. marking it complete).
 */
export async function updateTaskStatus(id: string, status: string) {
  const supabase = createClientSupabaseClient()

  const payload: Record<string, unknown> = { status }
  if (status === "completed") payload.completed_at = new Date().toISOString()

  const { data, error } = await supabase.from("tasks").update(payload).eq("id", id).select().single()

  if (error) {
    console.error("Error updating task:", error)
    throw new Error(`Failed to update task: ${error.message}`)
  }

  return data
}
