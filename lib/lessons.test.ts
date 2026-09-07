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
    single: vi.fn(() => Promise.resolve(result)),
    then: (resolve: any, reject: any) => Promise.resolve(result).then(resolve, reject),
  }
  return chain
}

import { getLessonsForUser, createLesson } from "./lessons"

beforeEach(() => {
  mockFrom.mockReset()
})

describe("getLessonsForUser", () => {
  it("returns mapped lessons for a user", async () => {
    mockFrom.mockReturnValue(
      makeChain({
        data: [
          {
            id: "lesson-1",
            user_id: "user-1",
            title: "Fractions Introduction",
            subject: "Math",
            grade: "5",
            duration: "45 min",
            date: "2026-09-01",
            status: "published",
            objectives: ["Understand fractions"],
            materials: [],
            standards: [],
            content: null,
          },
        ],
        error: null,
      }),
    )

    const result = await getLessonsForUser("user-1")

    expect(mockFrom).toHaveBeenCalledWith("lessons")
    expect(result).toEqual([
      {
        id: "lesson-1",
        userId: "user-1",
        title: "Fractions Introduction",
        subject: "Math",
        grade: "5",
        duration: "45 min",
        date: "2026-09-01",
        status: "published",
        objectives: ["Understand fractions"],
        materials: [],
        standards: [],
        content: null,
      },
    ])
  })

  it("throws a descriptive error when the query fails", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "connection refused" } }))
    await expect(getLessonsForUser("user-1")).rejects.toThrow("Failed to fetch lessons: connection refused")
  })

  it("returns an empty array when there are no lessons", async () => {
    mockFrom.mockReturnValue(makeChain({ data: [], error: null }))
    const result = await getLessonsForUser("user-1")
    expect(result).toEqual([])
  })
})

describe("createLesson", () => {
  it("inserts a new lesson row", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "lesson-2" }, error: null }))

    const result = await createLesson({ userId: "user-1", title: "States of Matter" })

    expect(result).toEqual({ id: "lesson-2" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "insert failed" } }))
    await expect(createLesson({ userId: "user-1", title: "States of Matter" })).rejects.toThrow(
      "Failed to create lesson: insert failed",
    )
  })
})
