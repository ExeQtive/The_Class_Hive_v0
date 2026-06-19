"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TaskCalendarViewProps {
  tasks: any[]
  onEdit: (task: any) => void
  onView: (task: any) => void
  onCreateTask: () => void
}

export function TaskCalendarView({ tasks, onEdit, onView, onCreateTask }: TaskCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

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

  const getTasksForDay = (day: number) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return tasks.filter((task) => task.dueDate === dateString)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const createCalendarDays = () => {
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-28 border border-muted bg-muted/20"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const dayTasks = getTasksForDay(day)

      days.push(
        <div
          key={`day-${day}`}
          className={cn("h-28 border border-muted p-1 relative", isToday ? "bg-primary/5 border-primary/20" : "")}
        >
          <div className="flex justify-between items-start">
            <span
              className={cn(
                "inline-block w-6 h-6 text-center text-sm",
                isToday ? "bg-primary text-primary-foreground rounded-full" : "",
              )}
            >
              {day}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 opacity-0 group-hover:opacity-100 hover:opacity-100"
              onClick={onCreateTask}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-24px)]">
            {dayTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "text-xs p-1 rounded cursor-pointer truncate border",
                  task.status === "completed" ? "opacity-60 line-through" : "",
                  getPriorityColor(task.priority),
                )}
                onClick={() => onView(task)}
              >
                {task.title}
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
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-xl font-semibold">
            {monthNames[month]} {year}
          </h3>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={handleToday}>
          Today
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-0">
        {dayNames.map((day) => (
          <div key={day} className="text-center py-2 font-medium text-sm">
            {day}
          </div>
        ))}
        {createCalendarDays()}
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center">
          <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
        </div>
        <div className="flex items-center">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Medium</Badge>
        </div>
        <div className="flex items-center">
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">Low</Badge>
        </div>
      </div>
    </div>
  )
}
