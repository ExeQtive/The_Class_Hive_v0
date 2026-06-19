"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LessonCalendarProps {
  lessons: any[]
  onEditLesson: (lesson: any) => void
  onCreateLesson: () => void
}

export function LessonCalendar({ lessons, onEditLesson, onCreateLesson }: LessonCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAddingLesson, setIsAddingLesson] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [newLesson, setNewLesson] = useState({
    title: "",
    subject: "Math",
    grade: "5",
    duration: "45 min",
    date: "",
    status: "draft",
    objectives: [],
    materials: [],
    standards: [],
  })

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const getLessonsForDay = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return lessons.filter((lesson) => lesson.date === dateString)
  }

  const handleAddLesson = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    setNewLesson({
      ...newLesson,
      date: dateString,
    })
    setSelectedDay(day)
    setIsAddingLesson(true)
  }

  const handleSaveLesson = () => {
    if (!newLesson.title || !newLesson.subject) return

    // In a real app, this would save to a database
    // For now, we'll just close the dialog
    setIsAddingLesson(false)

    // Call the parent's create lesson function
    onCreateLesson()
  }

  const createCalendarDays = () => {
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-28 border border-muted bg-muted/10"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const dayLessons = getLessonsForDay(day)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      days.push(
        <div
          key={`day-${day}`}
          className={cn(
            "h-28 border p-1 relative transition-all duration-200 group",
            isToday
              ? "bg-teal-50 border-teal-200 shadow-sm"
              : isWeekend
                ? "bg-muted/5"
                : "bg-white hover:bg-teal-50/30",
          )}
        >
          <div className="flex justify-between items-start">
            <span
              className={cn(
                "inline-block w-7 h-7 text-center leading-7 text-sm rounded-full",
                isToday ? "bg-teal-500 text-white font-medium" : isWeekend ? "text-muted-foreground" : "",
              )}
            >
              {day}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-teal-600 hover:text-teal-700 hover:bg-teal-100"
              onClick={() => handleAddLesson(day)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-24px)]">
            {dayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  "text-xs p-1 rounded cursor-pointer truncate border animate-scale-in",
                  lesson.status === "published"
                    ? "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200"
                    : "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200",
                )}
                onClick={() => onEditLesson(lesson)}
              >
                {lesson.title}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold text-teal-800">
            {monthNames[month]} {year}
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={handleToday} className="text-teal-600 hover:text-teal-700 hover:bg-teal-100">
          Today
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-0 border rounded-lg overflow-hidden shadow-sm">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center py-2 font-medium text-sm bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800"
          >
            {day}
          </div>
        ))}
        {createCalendarDays()}
      </div>

      <div className="flex items-center space-x-4 mt-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
          <span className="text-sm">Published</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
          <span className="text-sm">Draft</span>
        </div>
      </div>

      <Dialog open={isAddingLesson} onOpenChange={setIsAddingLesson}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Lesson</DialogTitle>
            <DialogDescription>
              Create a new lesson for {selectedDay && `${monthNames[month]} ${selectedDay}, ${year}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                placeholder="Enter lesson title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={newLesson.subject}
                  onValueChange={(value) => setNewLesson({ ...newLesson, subject: value })}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Language Arts">Language Arts</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Physical Education">Physical Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={newLesson.duration}
                  onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                  placeholder="e.g., 45 min"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="objectives">Objectives (one per line)</Label>
              <Textarea
                id="objectives"
                placeholder="Enter lesson objectives"
                onChange={(e) => setNewLesson({ ...newLesson, objectives: e.target.value.split("\n").filter(Boolean) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingLesson(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLesson} className="bg-gradient-to-r from-teal-500 to-cyan-500">
              Save Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
