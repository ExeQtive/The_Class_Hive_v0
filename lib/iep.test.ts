import { describe, it, expect, vi, beforeEach } from "vitest"

const mockFrom = vi.fn()

vi.mock("@/lib/supabase", () => ({
  createClientSupabaseClient: () => ({ from: mockFrom }),
}))

function makeChain(result: { data: any; error: any }) {
  const chain: any = {
    select: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    insert: vi.fn(() => chain),
    update: vi.fn(() => chain),
    single: vi.fn(() => Promise.resolve(result)),
    then: (resolve: any, reject: any) => Promise.resolve(result).then(resolve, reject),
  }
  return chain
}

import { getIEPsForUser, createIEP, updateIEP } from "./iep"

beforeEach(() => {
  mockFrom.mockReset()
})

describe("getIEPsForUser", () => {
  it("returns mapped IEPs with student info", async () => {
    mockFrom.mockReturnValue(
      makeChain({
        data: [
          {
            id: "iep-1",
            student_id: "s-1",
            start_date: "2025-01-01",
            review_date: "2026-01-01",
            end_date: "2028-01-01",
            status: "active",
            students: { first_name: "Alex", last_name: "Johnson", grade: "5th" },
          },
        ],
        error: null,
      }),
    )

    const result = await getIEPsForUser("user-1")

    expect(mockFrom).toHaveBeenCalledWith("ieps")
    expect(result).toEqual([
      {
        id: "iep-1",
        studentId: "s-1",
        studentName: "Alex Johnson",
        grade: "5th",
        startDate: "2025-01-01",
        reviewDate: "2026-01-01",
        endDate: "2028-01-01",
        status: "active",
      },
    ])
  })

  it("throws a descriptive error when the query fails", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "connection refused" } }))
    await expect(getIEPsForUser("user-1")).rejects.toThrow("Failed to fetch IEPs: connection refused")
  })

  it("returns an empty array when there are no IEPs", async () => {
    mockFrom.mockReturnValue(makeChain({ data: [], error: null }))
    const result = await getIEPsForUser("user-1")
    expect(result).toEqual([])
  })
})

describe("createIEP", () => {
  it("inserts a new IEP row", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "iep-2" }, error: null }))

    const result = await createIEP({
      userId: "user-1",
      studentId: "s-1",
      startDate: "2026-01-01",
      reviewDate: "2027-01-01",
      endDate: "2029-01-01",
    })

    expect(result).toEqual({ id: "iep-2" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "insert failed" } }))
    await expect(
      createIEP({
        userId: "user-1",
        studentId: "s-1",
        startDate: "2026-01-01",
        reviewDate: "2027-01-01",
        endDate: "2029-01-01",
      }),
    ).rejects.toThrow("Failed to create IEP: insert failed")
  })
})

describe("updateIEP", () => {
  it("updates only provided fields", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "iep-1", status: "under-review" }, error: null }))
    const result = await updateIEP("iep-1", { status: "under-review" })
    expect(result).toEqual({ id: "iep-1", status: "under-review" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "update failed" } }))
    await expect(updateIEP("iep-1", { status: "under-review" })).rejects.toThrow("Failed to update IEP: update failed")
  })
})
