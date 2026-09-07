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

import { getResourcesForUser, createResource } from "./resources"

beforeEach(() => {
  mockFrom.mockReset()
})

describe("getResourcesForUser", () => {
  it("returns mapped resources for a user", async () => {
    mockFrom.mockReturnValue(
      makeChain({
        data: [
          {
            id: "resource-1",
            user_id: "user-1",
            title: "Fractions Worksheet Bundle",
            description: "A worksheet",
            type: "worksheet",
            format: "pdf",
            subject: "Math",
            grade_level: ["4", "5"],
            tags: ["fractions"],
            is_favorite: true,
          },
        ],
        error: null,
      }),
    )

    const result = await getResourcesForUser("user-1")

    expect(mockFrom).toHaveBeenCalledWith("resources")
    expect(result).toEqual([
      {
        id: "resource-1",
        userId: "user-1",
        title: "Fractions Worksheet Bundle",
        description: "A worksheet",
        type: "worksheet",
        format: "pdf",
        subject: "Math",
        gradeLevel: ["4", "5"],
        tags: ["fractions"],
        isFavorite: true,
      },
    ])
  })

  it("throws a descriptive error when the query fails", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "connection refused" } }))
    await expect(getResourcesForUser("user-1")).rejects.toThrow("Failed to fetch resources: connection refused")
  })
})

describe("createResource", () => {
  it("inserts a new resource row", async () => {
    mockFrom.mockReturnValue(makeChain({ data: { id: "resource-2" }, error: null }))
    const result = await createResource({ userId: "user-1", title: "States of Matter Slides" })
    expect(result).toEqual({ id: "resource-2" })
  })

  it("throws a descriptive error on failure", async () => {
    mockFrom.mockReturnValue(makeChain({ data: null, error: { message: "insert failed" } }))
    await expect(createResource({ userId: "user-1", title: "States of Matter Slides" })).rejects.toThrow(
      "Failed to create resource: insert failed",
    )
  })
})
