import { describe, it, expect, vi, beforeEach } from "vitest"

const mockFrom = vi.fn()

vi.mock("@/lib/supabase", () => ({
  createClientSupabaseClient: () => ({ from: mockFrom }),
}))

function makeChain(result: { data: any; error: any }) {
  const chain: any = {
    insert: vi.fn(() => chain),
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    single: vi.fn(() => Promise.resolve(result)),
    then: (resolve: any, reject: any) => Promise.resolve(result).then(resolve, reject),
  }
  return chain
}

import { createStudent, getStudentsForUser } from "./students"

beforeEach(() => {
  mockFrom.mockReset()
})

describe("getStudentsForUser", () => {
  it("returns mapped students for a user", async () => {
    mockFrom.mockReturnValue(
      makeChain({
        data: [
          { id: "s-1", user_id: "user-1", first_name: "Alex", last_name: "Johnson", grade: "5", section: "A" },
        ],
        error: null,
      }),
    )

    const result = await getStudentsForUser("user-1")

    expect(mockFrom).toHaveBeenCalledWith("students")
    expect(result).toEqual([
      { id: "s-1", userId: "user-1", firstName: "Alex", lastName: "Johnson", grade: "5", section: "A" },
    ])
  })

  it("throws a descriptive error when the query fails", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "connection refused" } }))
    await expect(getStudentsForUser("user-1")).rejects.toThrow("Failed to fetch students: connection refused")
  })
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
