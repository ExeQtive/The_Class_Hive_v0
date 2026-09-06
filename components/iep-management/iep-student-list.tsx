"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, FileEdit, Search } from "lucide-react"
import { getCurrentUser } from "@/lib/supabase"
import { getIEPsForUser, type IEPWithStudent } from "@/lib/iep"

type ReviewStatus = "Current" | "Review Soon" | "Overdue"

function getReviewStatus(reviewDate: string): ReviewStatus {
  const daysUntilReview = (new Date(reviewDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  if (daysUntilReview < 0) return "Overdue"
  if (daysUntilReview <= 30) return "Review Soon"
  return "Current"
}

function getStatusColor(status: ReviewStatus) {
  switch (status) {
    case "Current":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Review Soon":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }
}

export function IEPStudentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ieps, setIeps] = useState<IEPWithStudent[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [signedOut, setSignedOut] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const user = await getCurrentUser()
      if (cancelled) return

      if (!user) {
        setSignedOut(true)
        return
      }

      try {
        const data = await getIEPsForUser(user.id)
        if (!cancelled) setIeps(data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load IEPs")
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (signedOut) {
    return <div className="py-12 text-center text-muted-foreground">Please sign in to view your students.</div>
  }

  if (error) {
    return <div className="py-12 text-center text-destructive">{error}</div>
  }

  if (ieps === null) {
    return <div className="py-12 text-center text-muted-foreground">Loading students…</div>
  }

  const filteredStudents = ieps.filter((iep) => iep.studentName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Review Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((iep) => {
                const status = getReviewStatus(iep.reviewDate)
                return (
                  <TableRow key={iep.id}>
                    <TableCell className="font-medium">{iep.studentName}</TableCell>
                    <TableCell>{iep.grade}</TableCell>
                    <TableCell>{new Date(iep.reviewDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(status)} variant="outline">
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
