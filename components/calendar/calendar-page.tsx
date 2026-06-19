"use client"

import { useState, useEffect } from "react"
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

// Sample event data
const initialEvents = [
  {
    id: 1,
    title: "Math Test - Grade 5",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: "10:00 AM",
    type: "assessment",
    description: "Chapter 7 test on fractions and decimals",
  },
  {
    id: 2,
    title: "Parent-Teacher Conference",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: "3:30 PM",
    type: "meeting",
    description: "Meeting with Emma's parents to discuss progress",
  },
  {
    id: 3,
    title: "Science Fair Preparation",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    time: "1:15 PM",
    type: "class",
    description: "Help students finalize their science fair projects",
  },
  {
    id: 4,
    title: "Staff Meeting",
    date: new Date(new Date().setDate(new Date().getDate())),
    time: "8:00 AM",
    type: "meeting",
    description: "Weekly staff meeting in the conference room",
  },
  {
    id: 5,
    title: "Field Trip - Museum",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: "9:00 AM",
    type: "event",
    description: "Class field trip to the Natural History Museum",
  },
]

// Sample tasks data
const sampleTasks = [
  {
    id: "task-1",
    title: "Grade Math Quizzes",
    description: "Grade the 5th grade math quizzes from Monday's assessment.",
    dueDate: format(new Date(new Date().setDate(new Date().getDate() + 3)), "yyyy-MM-dd"),
    priority: "high",
    status: "todo",
    category: "grading",
  },
  {
    id: "task-2",
    title: "Prepare Science Lesson",
    description: "Create lesson plan for the states of matter unit.",
    dueDate: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
    priority: "medium",
    status: "in-progress",
    category: "lesson-planning",
  },
  {
    id: "task-3",
    title: "Update Student Records",
    description: "Update attendance and grades in the school system.",
    dueDate: format(new Date(new Date().setDate(new Date().getDate() + 4)), "yyyy-MM-dd"),
    priority: "low",
    status: "todo",
    category: "administrative",
  },
]

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState(initialEvents)
  const [tasks, setTasks] = useState(sampleTasks)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "",
    type: "class",
    description: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showTasksInCalendar, setShowTasksInCalendar] = useState(true)

  // In a real app, this would fetch the user's preferences from an API or local storage
  useEffect(() => {
    // Simulating fetching user preferences
    const fetchUserPreferences = () => {
      // This would be replaced with actual API call or localStorage access
      const userPreferences = {
        showTasksInCalendar: localStorage.getItem("showTasksInMainCalendar") === "true",
      }
      setShowTasksInCalendar(userPreferences.showTasksInCalendar !== false) // Default to true if not set
    }

    fetchUserPreferences()
  }, [])

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const handlePreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7))
  }

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }

  const handleAddEvent = () => {
    const newEventWithId = {
      ...newEvent,
      id: events.length + 1,
      date: selectedDate || new Date(),
    }
    setEvents([...events, newEventWithId])
    setNewEvent({
      title: "",
      date: new Date(),
      time: "",
      type: "class",
      description: "",
    })
    setIsAddEventOpen(false)
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200"
      case "assessment":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
      case "event":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200"
      case "task":
        return "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  // Get tasks for a specific day
  const getTasksForDay = (day: Date) => {
    if (!showTasksInCalendar) return []

    const dateString = format(day, "yyyy-MM-dd")
    return tasks.filter((task) => task.dueDate === dateString)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
            Calendar
          </h2>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </div>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>Create a new event on your calendar.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      placeholder="e.g. 3:30 PM"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Add details about this event"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                  onClick={handleAddEvent}
                >
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-end mb-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="show-tasks" className="text-sm">
            Show Tasks
          </Label>
          <Switch id="show-tasks" checked={showTasksInCalendar} onCheckedChange={setShowTasksInCalendar} />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => {
          const isToday = isSameDay(day, new Date())
          const isWeekend = day.getDay() === 0 || day.getDay() === 6
          return (
            <div key={index} className="text-center">
              <div className="font-medium text-sm mb-1">{format(day, "EEE")}</div>
              <div
                className={cn(
                  "rounded-full w-8 h-8 mx-auto flex items-center justify-center text-sm",
                  isToday && "bg-teal-500 text-white",
                )}
              >
                {format(day, "d")}
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => (
          <Card key={index} className="min-h-[200px] transition-all hover:shadow-md flex flex-col">
            <CardHeader className="p-3">
              <CardTitle className="text-sm font-medium">{format(day, "MMMM d")}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex-grow">
              <div className="space-y-2">
                {events
                  .filter((event) => isSameDay(event.date, day))
                  .map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "p-2 rounded-md border text-xs transition-all cursor-pointer",
                        getEventTypeColor(event.type),
                      )}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-80">{event.time}</div>
                    </div>
                  ))}

                {showTasksInCalendar &&
                  getTasksForDay(day).map((task) => (
                    <div
                      key={task.id}
                      className={cn(
                        "p-2 rounded-md border text-xs transition-all cursor-pointer",
                        getTaskPriorityColor(task.priority),
                      )}
                    >
                      <div className="flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1 flex-shrink-0" />
                        <div className="font-medium truncate">{task.title}</div>
                      </div>
                      <div className="text-xs opacity-80">Task Due</div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="p-2 mt-auto">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50 flex items-center justify-center"
                onClick={() => {
                  setSelectedDate(day)
                  setIsAddEventOpen(true)
                }}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
        <div className="space-y-3">
          {events
            .filter((event) => event.date >= new Date())
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 5)
            .map((event) => (
              <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="flex">
                  <div
                    className={cn(
                      "w-2",
                      event.type === "class"
                        ? "bg-teal-500"
                        : event.type === "assessment"
                          ? "bg-amber-500"
                          : event.type === "meeting"
                            ? "bg-purple-500"
                            : "bg-cyan-500",
                    )}
                  />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(event.date, "EEEE, MMMM d")} • {event.time}
                        </p>
                      </div>
                      <Badge variant="outline" className={cn(getEventTypeColor(event.type))}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    {event.description && <p className="text-sm mt-2 text-muted-foreground">{event.description}</p>}
                  </div>
                </div>
              </Card>
            ))}

          {showTasksInCalendar &&
            tasks
              .filter((task) => new Date(task.dueDate) >= new Date())
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 3)
              .map((task) => (
                <Card key={task.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="flex">
                    <div
                      className={cn(
                        "w-2",
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-amber-500"
                            : "bg-blue-500",
                      )}
                    />
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-teal-500" />
                            {task.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Due: {format(new Date(task.dueDate), "EEEE, MMMM d")}
                          </p>
                        </div>
                        <Badge variant="outline" className={cn(getTaskPriorityColor(task.priority))}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </Badge>
                      </div>
                      {task.description && <p className="text-sm mt-2 text-muted-foreground">{task.description}</p>}
                    </div>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </div>
  )
}
