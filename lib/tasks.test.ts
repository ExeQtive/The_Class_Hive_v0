import { describe, it, expect, vi, beforeEach } from "vitest"

const mockFrom = vi.fn()

vi.mock("@/lib/supabase", () => ({
  createClientSupabaseClient: () => ({ from: mockFrom }),
}))

function makeChain(result: { data: any; error: any }) {
  const chain: any = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    order: vi.fn(() => chain),
    insert: vi.fn(() => chain),
    update: vi.fn(() => chain),
    single: vi.fn(() => Promise.resolve(result)),
    then: (resolve: any, reject: any) => Promise.resolve(result).then(resolve, reject),
  }
  return chain
}

import { getTasksForUser, createTask, updateTaskStatus } from "./tasks"

beforeEach(() => {
  mockFrom.mockReset()
})

describe("getTasksForUser", () => {
  it("returns mapped tasks for a user", async () => {
    mockFrom.mockReturnValue(
      makeChain({
        data: [
          {
            id: "task-1",
            user_id: "user-1",
            title: "Grade Math Quizzes",
            description: "Grade the quizzes",
            due_date: "2026-09-07",
            priority: "high",
            status: "todo",
            category: "grading",
          },
        ],
        error: null,
      }),
    )

    const result = await getTasksForUser("user-1")

    expect(mockFrom).toHaveBeenCalledWith("tasks")
    expect(result).toEqual([
      {
        id: "task-1",
        userId: "user-1",
        title: "Grade Math Quizzes",
        description: "Grade the quizzes",
        dueDate: "2026-09-07",
        priority: "high",
        status: "todo",
        category: "grading",
      },
    ])
  })

  it("throws a descriptive error when the query fails", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "connection refused" } }))
    await expect(getTasksForUser("user-1")).rejects.toThrow("Failed to fetch tasks: connection refused")
  })
})

describe("createTask", () => {
  it("inserts a new task row", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "task-2" }, error: null }))
    const result = await createTask({ userId: "user-1", title: "Prepare Science Lesson" })
    expect(result).toEqual({ id: "task-2" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "insert failed" } }))
    await expect(createTask({ userId: "user-1", title: "Prepare Science Lesson" })).rejects.toThrow(
      "Failed to create task: insert failed",
    )
  })
})

describe("updateTaskStatus", () => {
  it("updates the task status", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "task-1", status: "completed" }, error: null }))
    const result = await updateTaskStatus("task-1", "completed")
    expect(result).toEqual({ id: "task-1", status: "completed" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "update failed" } }))
    await expect(updateTaskStatus("task-1", "completed")).rejects.toThrow("Failed to update task: update failed")
  })
})
