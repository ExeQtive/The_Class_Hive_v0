// @ts-nocheck
// @ts-nocheck
"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Edit, MoreHorizontal, Trash, User } from "lucide-react"
import type { Student } from "@/types"

interface StudentGridProps {
  students: Student[]
  onView: (student: Student) => void
  onEdit: (student: Student) => void
  onDelete: (studentId: string) => void
}

const getAttendancePercentage = (attendance: number): number => {
  return Math.min(attendance, 100)
}

const getAveragePerformance = (performance: number[]): number => {
  if (performance.length === 0) return 0
  const sum = performance.reduce((acc, curr) => acc + curr, 0)
  return Math.round(sum / performance.length)
}

const StudentGrid: React.FC<StudentGridProps> = ({ students, onView, onEdit, onDelete }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {students.map((student) => (
        <Card
          key={student.id}
          className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-purple-50 to-white">
            <Avatar className="h-24 w-24 mb-4 ring-4 ring-white shadow-lg transition-transform group-hover:scale-110">
              <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg">
                {student.firstName.charAt(0)}
                {student.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3
                className="font-medium text-lg hover:text-primary cursor-pointer transition-colors"
                onClick={() => onView(student)}
              >
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Grade {student.grade}, Section {student.section}
              </p>
            </div>
          </div>
          <CardContent className="p-4 pt-0 flex-1">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center transition-all group-hover:from-purple-100 group-hover:to-purple-200">
                <div className="text-xs text-purple-700 font-medium mb-1">Attendance</div>
                <div
                  className={cn(
                    "font-bold text-lg",
                    getAttendancePercentage(student.attendance) >= 90
                      ? "text-green-600"
                      : getAttendancePercentage(student.attendance) >= 80
                        ? "text-amber-600"
                        : "text-red-600",
                  )}
                >
                  {getAttendancePercentage(student.attendance)}%
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 text-center transition-all group-hover:from-pink-100 group-hover:to-pink-200">
                <div className="text-xs text-pink-700 font-medium mb-1">Performance</div>
                <div
                  className={cn(
                    "font-bold text-lg",
                    getAveragePerformance(student.performance) >= 90
                      ? "text-green-600"
                      : getAveragePerformance(student.performance) >= 80
                        ? "text-amber-600"
                        : getAveragePerformance(student.performance) >= 70
                          ? "text-orange-600"
                          : "text-red-600",
                  )}
                >
                  {getAveragePerformance(student.performance)}%
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-3 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors">
                <User className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                <div className="text-sm">
                  <div className="font-medium text-teal-700">Guardian</div>
                  <div className="text-muted-foreground">{student.guardianName}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {student.groups.slice(0, 2).map((group: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200"
                  >
                    {group}
                  </Badge>
                ))}
                {student.groups.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                    +{student.groups.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto bg-gradient-to-r from-purple-50 to-pink-50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(student)}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
            >
              View Details
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-500 hover:bg-pink-100">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 p-2">
                <DropdownMenuItem
                  onClick={() => onView(student)}
                  className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                >
                  <User className="mr-2 h-4 w-4 text-purple-500" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onEdit(student)}
                  className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                >
                  <Edit className="mr-2 h-4 w-4 text-teal-500" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                  onClick={() => onDelete(student.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default StudentGrid
