import { describe, it, expect, vi, beforeEach } from "vitest"

const mockFrom = vi.fn()

vi.mock("@/lib/supabase", () => ({
  createClientSupabaseClient: () => ({ from: mockFrom }),
}))

function makeChain(result: { data: any; error: any }) {
  const chain: any = {
    insert: vi.fn(() => chain),
    select: vi.fn(() => chain),
    single: vi.fn(() => Promise.resolve(result)),
  }
  return chain
}

import { createStudent } from "./students"

beforeEach(() => {
  mockFrom.mockReset()
})

describe("createStudent", () => {
  it("inserts a new student row and returns it", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "s-1" }, error: null }))

    const result = await createStudent({
      userId: "user-1",
      firstName: "Alex",
      lastName: "Johnson",
      grade: "5",
      section: "A",
    })

    expect(mockFrom).toHaveBeenCalledWith("students")
    expect(result).toEqual({ id: "s-1" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "insert failed" } }))

    await expect(
      createStudent({ userId: "user-1", firstName: "Alex", lastName: "Johnson", grade: "5", section: "A" }),
    ).rejects.toThrow("Failed to create student: insert failed")
  })
})
