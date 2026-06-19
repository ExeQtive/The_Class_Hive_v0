"use client"

import { Edit, MoreHorizontal, Trash, User } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface StudentGridProps {
  students: any[]
  onView: (student: any) => void
  onEdit: (student: any) => void
  onDelete: (studentId: string) => void
}

export function StudentGrid({ students, onView, onEdit, onDelete }: StudentGridProps) {
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
    <div>
      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-2">No students found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or add a new student.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {students.map((student, index) => (
            <Card
              key={student.id}
              className="overflow-hidden flex flex-col h-full border-teal-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-teal-50 to-transparent">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-200 to-cyan-200 transform scale-110 opacity-30 animate-pulse"></div>
                  <Avatar className="h-24 w-24 mb-4 border-2 border-white shadow-md relative z-10">
                    <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                    <AvatarFallback className="text-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                      {student.firstName.charAt(0)}
                      {student.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <h3
                    className="font-medium text-lg hover:text-teal-600 cursor-pointer transition-colors duration-200"
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
                  <div
                    className={cn(
                      "rounded-lg p-2 text-center border transition-all duration-300",
                      getAttendancePercentage(student.attendance) >= 90
                        ? "bg-green-50 border-green-200"
                        : getAttendancePercentage(student.attendance) >= 80
                          ? "bg-amber-50 border-amber-200"
                          : "bg-red-50 border-red-200",
                    )}
                  >
                    <div className="text-xs text-muted-foreground">Attendance</div>
                    <div
                      className={cn(
                        "font-medium text-lg",
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
                  <div
                    className={cn(
                      "rounded-lg p-2 text-center border transition-all duration-300",
                      getAveragePerformance(student.performance) >= 90
                        ? "bg-green-50 border-green-200"
                        : getAveragePerformance(student.performance) >= 80
                          ? "bg-amber-50 border-amber-200"
                          : getAveragePerformance(student.performance) >= 70
                            ? "bg-orange-50 border-orange-200"
                            : "bg-red-50 border-red-200",
                    )}
                  >
                    <div className="text-xs text-muted-foreground">Performance</div>
                    <div
                      className={cn(
                        "font-medium text-lg",
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
                <div className="space-y-2">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="font-medium">Guardian</div>
                      <div className="text-muted-foreground">{student.guardianName}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {student.groups.slice(0, 2).map((group: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {group}
                      </Badge>
                    ))}
                    {student.groups.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{student.groups.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto bg-gradient-to-r from-teal-50 to-cyan-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(student)}
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-100/50"
                >
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
