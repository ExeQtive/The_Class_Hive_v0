import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const mockGetCurrentUser = vi.fn()
const mockCreateStudent = vi.fn()
const mockCreateIEP = vi.fn()

vi.mock("@/lib/supabase", () => ({
  getCurrentUser: () => mockGetCurrentUser(),
}))

vi.mock("@/lib/students", () => ({
  createStudent: (input: any) => mockCreateStudent(input),
}))

vi.mock("@/lib/iep", () => ({
  createIEP: (input: any) => mockCreateIEP(input),
}))

import { IEPForm } from "./iep-form"

beforeEach(() => {
  mockGetCurrentUser.mockReset()
  mockCreateStudent.mockReset()
  mockCreateIEP.mockReset()
})

describe("IEPForm (create mode)", () => {
  it("creates a student then an IEP, and calls onSave on success", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: "user-1" })
    mockCreateStudent.mockResolvedValue({ id: "s-1" })
    mockCreateIEP.mockResolvedValue({ id: "iep-1" })

    const onSave = vi.fn()
    const user = userEvent.setup()

    render(<IEPForm iep={null} onSave={onSave} onCancel={vi.fn()} />)

    await user.type(screen.getByPlaceholderText(/full name/i), "Alex Johnson")
    await user.click(screen.getByRole("button", { name: /save iep/i }))

    await waitFor(() => expect(mockCreateStudent).toHaveBeenCalled())
    expect(mockCreateStudent).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1", firstName: "Alex", lastName: "Johnson" }),
    )
    expect(mockCreateIEP).toHaveBeenCalledWith(expect.objectContaining({ userId: "user-1", studentId: "s-1" }))
    await waitFor(() => expect(onSave).toHaveBeenCalled())
  })

  it("shows an error and does not call onSave when creation fails", async () => {
    mockGetCurrentUser.mockResolvedValue({ id: "user-1" })
    mockCreateStudent.mockRejectedValue(new Error("Failed to create student: insert failed"))

    const onSave = vi.fn()
    const user = userEvent.setup()

    render(<IEPForm iep={null} onSave={onSave} onCancel={vi.fn()} />)

    await user.type(screen.getByPlaceholderText(/full name/i), "Alex Johnson")
    await user.click(screen.getByRole("button", { name: /save iep/i }))

    await waitFor(() => expect(screen.getByText(/failed to create student/i)).toBeInTheDocument())
    expect(onSave).not.toHaveBeenCalled()
  })

  it("calls onCancel when the back button is clicked", async () => {
    const onCancel = vi.fn()
    const user = userEvent.setup()

    render(<IEPForm iep={null} onSave={vi.fn()} onCancel={onCancel} />)

    await user.click(screen.getByRole("button", { name: "" }))
    expect(onCancel).toHaveBeenCalled()
  })
})
