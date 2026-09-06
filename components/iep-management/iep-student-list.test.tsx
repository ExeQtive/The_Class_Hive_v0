import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const mockGetCurrentUser = vi.fn()
const mockGetIEPsForUser = vi.fn()

vi.mock("@/lib/supabase", () => ({
  getCurrentUser: () => mockGetCurrentUser(),
}))

vi.mock("@/lib/iep", () => ({
  getIEPsForUser: (userId: string) => mockGetIEPsForUser(userId),
}))

import { IEPStudentList } from "./iep-student-list"

beforeEach(() => {
  mockGetCurrentUser.mockReset()
  mockGetIEPsForUser.mockReset()
})

describe("IEPStudentList", () => {
  it("shows a loading state before data arrives", async () => {
    mockGetCurrentUser.mockReturnValue(new Promise(() => {})) // never resolves
    render(<IEPStudentList />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("renders fetched IEPs with student name, grade, review date and status", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: "user-1" })
    mockGetIEPsForUser.mockResolvedValue([
      {
        id: "iep-1",
        studentId: "s-1",
        studentName: "Alex Johnson",
        grade: "5th",
        startDate: "2025-01-01",
        reviewDate: "2099-01-01",
        endDate: "2101-01-01",
        status: "active",
      },
    ])

    render(<IEPStudentList />)

    await waitFor(() => expect(screen.getByText("Alex Johnson")).toBeInTheDocument())
    expect(mockGetIEPsForUser).toHaveBeenCalledWith("user-1")
    expect(screen.getByText("5th")).toBeInTheDocument()
    expect(screen.getByText("Current")).toBeInTheDocument()
  })

  it("filters the list by student name via the search box", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: "user-1" })
    mockGetIEPsForUser.mockResolvedValue([
      {
        id: "iep-1",
        studentId: "s-1",
        studentName: "Alex Johnson",
        grade: "5th",
        startDate: "2025-01-01",
        reviewDate: "2099-01-01",
        endDate: "2101-01-01",
        status: "active",
      },
      {
        id: "iep-2",
        studentId: "s-2",
        studentName: "Jamie Smith",
        grade: "3rd",
        startDate: "2025-01-01",
        reviewDate: "2099-01-01",
        endDate: "2101-01-01",
        status: "active",
      },
    ])

    const user = userEvent.setup()
    render(<IEPStudentList />)

    await waitFor(() => expect(screen.getByText("Alex Johnson")).toBeInTheDocument())
    await user.type(screen.getByPlaceholderText(/search students/i), "Jamie")

    expect(screen.queryByText("Alex Johnson")).not.toBeInTheDocument()
    expect(screen.getByText("Jamie Smith")).toBeInTheDocument()
  })

  it("shows an empty state when the user has no IEPs", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: "user-1" })
    mockGetIEPsForUser.mockResolvedValue([])

    render(<IEPStudentList />)

    await waitFor(() => expect(screen.getByText(/no students found/i)).toBeInTheDocument())
  })

  it("shows an error message when the fetch fails", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: "user-1" })
    mockGetIEPsForUser.mockRejectedValue(new Error("Failed to fetch IEPs: connection refused"))

    render(<IEPStudentList />)

    await waitFor(() => expect(screen.getByText(/failed to fetch ieps/i)).toBeInTheDocument())
  })

  it("prompts sign-in when there is no current user", async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    render(<IEPStudentList />)

    await waitFor(() => expect(screen.getByText(/sign in/i)).toBeInTheDocument())
    expect(mockGetIEPsForUser).not.toHaveBeenCalled()
  })
})
