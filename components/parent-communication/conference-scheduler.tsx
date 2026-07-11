"use client"

import { useState } from "react"
import { format, addDays, startOfWeek } from "date-fns"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ConferenceSchedulerProps {
  students?: any[]
  onSchedule?: (conference: any) => void
  onCancel?: () => void
  existingConferences?: any[]
}

export default function ConferenceScheduler({
  students = [],
  onSchedule = () => {},
  onCancel = () => {},
  existingConferences = [],
}: ConferenceSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [notes, setNotes] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [studentSelectorOpen, setStudentSelectorOpen] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

  const timeSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ]

  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(currentWeekStart, i))

  const isTimeSlotBooked = (day: Date, timeSlot: string) => {
    return existingConferences.some(
      (conf) => format(new Date(conf.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd") && conf.timeSlot === timeSlot,
    )
  }

  const getBookingDetails = (day: Date, timeSlot: string) => {
    return existingConferences.find(
      (conf) => format(new Date(conf.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd") && conf.timeSlot === timeSlot,
    )
  }

  const handlePreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7))
  }

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  const handleSchedule = () => {
    if (selectedDate && selectedTimeSlot && selectedStudent) {
      onSchedule({
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        student: selectedStudent,
        notes,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="border-orange-200 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-orange-900">Schedule Parent-Teacher Conference</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-gradient-to-b from-white to-orange-50/30">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <Label className="text-orange-900">Conference Date</Label>
              <div className="mt-1">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-orange-200 text-orange-700 hover:text-orange-900 hover:bg-orange-50 hover:border-orange-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-orange-600" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date)
                        setCalendarOpen(false)
                      }}
                      className="border border-orange-100"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <Label className="text-orange-900">Student</Label>
              <Popover open={studentSelectorOpen} onOpenChange={setStudentSelectorOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between mt-1 border-orange-200 text-orange-700 hover:text-orange-900 hover:bg-orange-50 hover:border-orange-300"
                  >
                    {selectedStudent ? (
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-2">
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-[10px] text-white">
                            {selectedStudent.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedStudent.name}
                      </div>
                    ) : (
                      <span>Select student</span>
                    )}
                    <ChevronLeft className="h-4 w-4 ml-2 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="max-h-[200px] overflow-y-auto p-1">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className={cn(
                          "flex items-center p-2 rounded-md cursor-pointer",
                          selectedStudent?.id === student.id
                            ? "bg-orange-100 text-orange-900"
                            : "hover:bg-orange-50 text-orange-700",
                        )}
                        onClick={() => {
                          setSelectedStudent(student)
                          setStudentSelectorOpen(false)
                        }}
                      >
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-[10px] text-white">
                            {student.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-orange-600">{student.grade}</div>
                        </div>
                        {selectedStudent?.id === student.id && <Check className="h-4 w-4 ml-auto text-orange-600" />}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-orange-900">Available Time Slots</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 border-orange-200 text-orange-700 hover:text-orange-900 hover:bg-orange-50"
                  onClick={handlePreviousWeek}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-orange-700">
                  {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 4), "MMM d, yyyy")}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 border-orange-200 text-orange-700 hover:text-orange-900 hover:bg-orange-50"
                  onClick={handleNextWeek}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border rounded-md border-orange-200 overflow-hidden">
              <div className="grid grid-cols-6 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                <div className="p-2 text-center text-orange-700 font-medium text-sm border-r border-orange-100">
                  Time
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day.toString()}
                    className="p-2 text-center text-orange-700 font-medium text-sm border-r last:border-r-0 border-orange-100"
                  >
                    <div>{format(day, "EEE")}</div>
                    <div className="text-xs">{format(day, "MMM d")}</div>
                  </div>
                ))}
              </div>
              <div className="max-h-[300px] overflow-y-auto bg-white">
                {timeSlots.map((timeSlot) => (
                  <div
                    key={timeSlot}
                    className="grid grid-cols-6 border-b last:border-b-0 border-orange-100 hover:bg-orange-50/30"
                  >
                    <div className="p-2 text-center text-orange-700 text-sm border-r border-orange-100 flex items-center justify-center">
                      <Clock className="h-3 w-3 mr-1 text-orange-600" />
                      {timeSlot}
                    </div>
                    {weekDays.map((day) => {
                      const isBooked = isTimeSlotBooked(day, timeSlot)
                      const bookingDetails = isBooked ? getBookingDetails(day, timeSlot) : null
                      const isSelected =
                        selectedDate &&
                        selectedTimeSlot &&
                        format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
                        selectedTimeSlot === timeSlot

                      return (
                        <div
                          key={day.toString()}
                          className={cn(
                            "p-2 text-center text-sm border-r last:border-r-0 border-orange-100",
                            isBooked
                              ? "bg-orange-50"
                              : isSelected
                                ? "bg-gradient-to-r from-orange-100 to-amber-100"
                                : "cursor-pointer hover:bg-orange-50",
                          )}
                          onClick={() => {
                            if (!isBooked) {
                              setSelectedDate(day)
                              setSelectedTimeSlot(timeSlot)
                            }
                          }}
                        >
                          {isBooked ? (
                            <div className="flex flex-col items-center">
                              <Badge className={cn("text-xs px-1.5 py-0.5", getStatusColor(bookingDetails?.status))}>
                                {bookingDetails?.status || "Booked"}
                              </Badge>
                              <span className="text-xs text-orange-600 mt-1">
                                {bookingDetails?.student?.name || "Reserved"}
                              </span>
                            </div>
                          ) : isSelected ? (
                            <div className="flex items-center justify-center text-orange-700">
                              <Check className="h-4 w-4 mr-1 text-orange-600" />
                              Selected
                            </div>
                          ) : (
                            <div className="flex items-center justify-center text-orange-600 opacity-0 group-hover:opacity-100">
                              <Plus className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-orange-900">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-orange-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-h-[100px]"
              placeholder="Add any notes or topics you'd like to discuss during the conference"
            />
          </div>

          {selectedDate && selectedTimeSlot && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-md border border-orange-100">
              <div className="font-medium text-orange-900 mb-1">Conference Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-orange-700">
                  <CalendarIcon className="h-4 w-4 mr-2 text-orange-600" />
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center text-orange-700">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  {selectedTimeSlot}
                </div>
                {selectedStudent && (
                  <div className="flex items-center text-orange-700 sm:col-span-2">
                    <Avatar className="h-4 w-4 mr-2">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-amber-600 text-[8px] text-white">
                        {selectedStudent.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedStudent.name} ({selectedStudent.grade})
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <Separator className="bg-orange-100" />
      <CardFooter className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-orange-200 text-orange-700 hover:text-orange-900 hover:bg-orange-100 hover:border-orange-300"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSchedule}
          disabled={!selectedDate || !selectedTimeSlot || !selectedStudent}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md transition-all"
        >
          Schedule Conference
        </Button>
      </CardFooter>
    </Card>
  )
}
