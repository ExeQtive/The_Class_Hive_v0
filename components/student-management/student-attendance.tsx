"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"

interface StudentAttendanceProps {
  students: any[]
  onSave: (students: any[]) => void
  onCancel: () => void
}

export function StudentAttendance({ students, onSave, onCancel }: StudentAttendanceProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [attendanceData, setAttendanceData] = useState<any[]>(
    students.map((student) => ({
      ...student,
      todayStatus: "present", // Default status for today
    })),
  )
  const [activeTab, setActiveTab] = useState<"daily" | "summary">("daily")

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData(
      attendanceData.map((student) => {
        if (student.id === studentId) {
          return { ...student, todayStatus: status }
        }
        return student
      }),
    )
  }

  const handleSaveAttendance = () => {
    // Update attendance records
    const updatedStudents = students.map((student) => {
      const studentData = attendanceData.find((s) => s.id === student.id)
      if (studentData) {
        const newAttendance = { ...student.attendance }

        if (studentData.todayStatus === "present") {
          newAttendance.present += 1
        } else if (studentData.todayStatus === "absent") {
          newAttendance.absent += 1
        } else if (studentData.todayStatus === "tardy") {
          newAttendance.tardy += 1
        }

        newAttendance.total += 1

        return {
          ...student,
          attendance: newAttendance,
        }
      }
      return student
    })

    onSave(updatedStudents)
  }

  const getAttendancePercentage = (attendance: any) => {
    if (attendance.total === 0) return 100
    return Math.round((attendance.present / attendance.total) * 100)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="mr-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Students
        </Button>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "daily" | "summary")}>
          <TabsList className="bg-purple-100">
            <TabsTrigger value="daily" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Daily Attendance
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Attendance Summary
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "daily" && (
        <Card className="border-t-4 border-t-purple-500 shadow-md overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-purple-800">Daily Attendance</CardTitle>
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[240px] justify-start text-left font-normal border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                      {format(date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)}/>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
              {attendanceData.map((student, index) => (
                <motion.div
                  key={student.id}
                  variants={item}
                  className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-md bg-white hover:bg-purple-50/50 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-[240px]">
                    <Avatar className="h-10 w-10 border-2 border-purple-200">
                      <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {student.firstName.charAt(0)}
                        {student.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-purple-900">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Grade {student.grade}, Section {student.section}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <RadioGroup
                      value={student.todayStatus}
                      onValueChange={(value) => handleStatusChange(student.id, value)}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="present"
                          id={`present-${student.id}`}
                          className="text-green-600 border-green-400 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label htmlFor={`present-${student.id}`} className="cursor-pointer">
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                          >
                            Present
                          </Badge>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="absent"
                          id={`absent-${student.id}`}
                          className="text-red-600 border-red-400 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                        />
                        <Label htmlFor={`absent-${student.id}`} className="cursor-pointer">
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                            Absent
                          </Badge>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="tardy"
                          id={`tardy-${student.id}`}
                          className="text-amber-600 border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <Label htmlFor={`tardy-${student.id}`} className="cursor-pointer">
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200"
                          >
                            Tardy
                          </Badge>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
          <CardFooter className="border-t flex justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <Button
              variant="outline"
              onClick={onCancel}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAttendance}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Save className="h-4 w-4 mr-2" /> Save Attendance
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === "summary" && (
        <Card className="border-t-4 border-t-purple-500 shadow-md overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-purple-800">Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-purple-800">Student</th>
                    <th className="text-center py-3 px-4 font-medium text-green-600">Present</th>
                    <th className="text-center py-3 px-4 font-medium text-red-600">Absent</th>
                    <th className="text-center py-3 px-4 font-medium text-amber-600">Tardy</th>
                    <th className="text-center py-3 px-4 font-medium text-purple-800">Total Days</th>
                    <th className="text-center py-3 px-4 font-medium text-purple-800">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      className="border-b hover:bg-purple-50/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border-2 border-purple-200">
                            <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                              {student.firstName.charAt(0)}
                              {student.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-purple-900">
                            {student.firstName} {student.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          {student.attendance.present}
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className="bg-red-100 text-red-700 border-red-200">{student.attendance.absent}</Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          {student.attendance.tardy}
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-4 font-medium">{student.attendance.total}</td>
                      <td className="text-center py-3 px-4">
                        <Badge
                          className={cn(
                            getAttendancePercentage(student.attendance) >= 90
                              ? "bg-green-100 text-green-700 border-green-200"
                              : getAttendancePercentage(student.attendance) >= 80
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-red-100 text-red-700 border-red-200",
                          )}
                        >
                          {getAttendancePercentage(student.attendance)}%
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
