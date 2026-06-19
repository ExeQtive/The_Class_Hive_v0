"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, FileEdit, Search } from "lucide-react"

// Mock data for demonstration
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    grade: "5th",
    lastReview: "2023-09-15",
    nextReview: "2024-03-15",
    status: "Current",
  },
  {
    id: "2",
    name: "Jamie Smith",
    grade: "3rd",
    lastReview: "2023-08-10",
    nextReview: "2024-02-10",
    status: "Review Soon",
  },
  {
    id: "3",
    name: "Taylor Williams",
    grade: "7th",
    lastReview: "2023-10-05",
    nextReview: "2024-04-05",
    status: "Current",
  },
  {
    id: "4",
    name: "Morgan Brown",
    grade: "4th",
    lastReview: "2023-07-20",
    nextReview: "2024-01-20",
    status: "Overdue",
  },
  {
    id: "5",
    name: "Casey Davis",
    grade: "6th",
    lastReview: "2023-11-12",
    nextReview: "2024-05-12",
    status: "Current",
  },
]

export function IEPStudentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState(mockStudents)

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Review Soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

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
              <TableHead>Last Review</TableHead>
              <TableHead>Next Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{new Date(student.lastReview).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(student.nextReview).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)} variant="outline">
                      {student.status}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
