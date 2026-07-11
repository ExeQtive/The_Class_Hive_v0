// @ts-nocheck
// @ts-nocheck
"use client"

import { Calendar, Edit, Mail, MoreHorizontal, Phone, Trash, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface StudentListProps {
  students: any[]
  onView: (student: any) => void
  onEdit: (student: any) => void
  onDelete: (studentId: string) => void
}

export function StudentList({ students, onView, onEdit, onDelete }: StudentListProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  const getAttendancePercentage = (attendance: any) => {
    if (attendance.total === 0) return 100
    return Math.round((attendance.present / attendance.total) * 100)
  }

  const getAveragePerformance = (performance: any) => {
    return Math.round(
      (performance.math + performance.science + performance.reading + performance.writing + performance.socialStudies) /
        5,
    )
  }

  return (
    <div className="space-y-4">
      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-2">No students found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or add a new student.</p>
        </div>
      ) : (
        students.map((student, index) => (
          <Card
            key={student.id}
            className="overflow-hidden border-teal-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 duration-500"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div
                  className="w-full md:w-48 h-32 bg-gradient-to-br from-teal-400 to-cyan-500 relative cursor-pointer flex-shrink-0 flex items-center justify-center"
                  onClick={() => onView(student)}
                >
                  <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                    <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                    <AvatarFallback className="text-lg bg-white text-teal-600">
                      {student.firstName.charAt(0)}
                      {student.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3
                        className="font-medium text-teal-700 hover:text-teal-500 cursor-pointer transition-colors duration-200"
                        onClick={() => onView(student)}
                      >
                        {student.firstName} {student.lastName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 text-teal-700"
                        >
                          Grade {student.grade}, Section {student.section}
                        </Badge>
                        <div className="text-xs text-teal-600 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(student.dateOfBirth)}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(student)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(student)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(student.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <div className="space-y-1">
                      <div className="text-sm flex items-center">
                        <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Guardian:</span>
                      </div>
                      <div className="text-sm">{student.guardianName}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                      </div>
                      <div className="text-sm truncate">{student.guardianEmail}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                      </div>
                      <div className="text-sm">{student.guardianPhone}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {student.groups.map((group: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {group}
                      </Badge>
                    ))}
                    {student.groups.length === 0 && (
                      <span className="text-xs text-muted-foreground">No groups assigned</span>
                    )}
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "text-sm font-medium px-3 py-1 rounded-full",
                          getAttendancePercentage(student.attendance) >= 90
                            ? "bg-green-100 text-green-700"
                            : getAttendancePercentage(student.attendance) >= 80
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700",
                        )}
                      >
                        Attendance: {getAttendancePercentage(student.attendance)}%
                      </div>
                      <div
                        className={cn(
                          "text-sm font-medium px-3 py-1 rounded-full",
                          getAveragePerformance(student.performance) >= 90
                            ? "bg-green-100 text-green-700"
                            : getAveragePerformance(student.performance) >= 80
                              ? "bg-amber-100 text-amber-700"
                              : getAveragePerformance(student.performance) >= 70
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700",
                        )}
                      >
                        Performance: {getAveragePerformance(student.performance)}%
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 text-teal-700 hover:bg-teal-100 hover:text-teal-800"
                      onClick={() => onView(student)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
