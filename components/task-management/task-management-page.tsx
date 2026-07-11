"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, CheckCircle2, Filter, Plus, Search, SortAsc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-management/task-list"
import { TaskEditor } from "@/components/task-management/task-editor"
import { TaskCalendarView } from "@/components/task-management/task-calendar-view"
import { TaskKanbanView } from "@/components/task-management/task-kanban-view"
import { TaskDetailView } from "@/components/task-management/task-detail-view"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for demonstration
const sampleTasks = [
  {
    id: "task-1",
    title: "Grade Math Quizzes",
    description: "Grade the 5th grade math quizzes from Monday's assessment.",
    dueDate: "2023-05-15",
    priority: "high",
    status: "todo",
    category: "grading",
    assignedTo: "self",
    createdAt: "2023-05-10",
    relatedTo: "Math - Grade 5",
  },
  {
    id: "task-2",
    title: "Prepare Science Lesson",
    description: "Create lesson plan for the states of matter unit.",
    dueDate: "2023-05-16",
    priority: "medium",
    status: "in-progress",
    category: "lesson-planning",
    assignedTo: "self",
    createdAt: "2023-05-11",
    relatedTo: "Science - Grade 5",
  },
  {
    id: "task-3",
    title: "Parent-Teacher Conference",
    description: "Meet with Tommy's parents to discuss progress.",
    dueDate: "2023-05-17",
    priority: "high",
    status: "todo",
    category: "meetings",
    assignedTo: "self",
    createdAt: "2023-05-12",
    relatedTo: "Student - Tommy Johnson",
  },
  {
    id: "task-4",
    title: "Update Student Records",
    description: "Update attendance and grades in the school system.",
    dueDate: "2023-05-18",
    priority: "low",
    status: "todo",
    category: "administrative",
    assignedTo: "self",
    createdAt: "2023-05-12",
    relatedTo: "Administrative",
  },
  {
    id: "task-5",
    title: "Order Art Supplies",
    description: "Order new watercolor paints and brushes for the art project.",
    dueDate: "2023-05-19",
    priority: "medium",
    status: "todo",
    category: "supplies",
    assignedTo: "self",
    createdAt: "2023-05-13",
    relatedTo: "Art - Grade 5",
  },
  {
    id: "task-6",
    title: "Review IEP Documentation",
    description: "Review and update IEP documentation for special education students.",
    dueDate: "2023-05-20",
    priority: "high",
    status: "todo",
    category: "administrative",
    assignedTo: "self",
    createdAt: "2023-05-13",
    relatedTo: "Special Education",
  },
  {
    id: "task-7",
    title: "Create Reading Groups",
    description: "Organize students into reading groups based on assessment results.",
    dueDate: "2023-05-15",
    priority: "medium",
    status: "completed",
    category: "planning",
    assignedTo: "self",
    createdAt: "2023-05-10",
    relatedTo: "Language Arts - Grade 5",
    completedAt: "2023-05-14",
  },
  {
    id: "task-8",
    title: "Staff Meeting Preparation",
    description: "Prepare materials for the weekly staff meeting.",
    dueDate: "2023-05-16",
    priority: "medium",
    status: "completed",
    category: "meetings",
    assignedTo: "self",
    createdAt: "2023-05-11",
    relatedTo: "Administrative",
    completedAt: "2023-05-15",
  },
]

export function TaskManagementPage() {
  const [view, setView] = useState<"list" | "calendar" | "kanban" | "editor" | "detail">("list")
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [sortBy, setSortBy] = useState("dueDate")
  const [tasks, setTasks] = useState(sampleTasks)
  const [showTaskCalendar, setShowTaskCalendar] = useState(true)

  // In a real app, this would fetch the user's preferences from an API or local storage
  useEffect(() => {
    // Simulating fetching user preferences
    const fetchUserPreferences = () => {
      // This would be replaced with actual API call or localStorage access
      const userPreferences = {
        showTaskCalendar: localStorage.getItem("showTaskCalendar") === "true",
      }
      setShowTaskCalendar(userPreferences.showTaskCalendar !== false) // Default to true if not set
    }

    fetchUserPreferences()
  }, [])

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter
    const matchesDate = !dateFilter || task.dueDate === format(dateFilter, "yyyy-MM-dd")

    return matchesSearch && matchesPriority && matchesStatus && matchesCategory && matchesDate
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      )
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    } else {
      return 0
    }
  })

  const handleCreateNewTask = () => {
    setSelectedTask({
      id: `new-${Date.now()}`,
      title: "",
      description: "",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "medium",
      status: "todo",
      category: "",
      assignedTo: "self",
      createdAt: new Date().toISOString().split("T")[0],
      relatedTo: "",
    })
    setView("editor")
  }

  const handleEditTask = (task: any) => {
    setSelectedTask(task)
    setView("editor")
  }

  const handleViewTaskDetails = (task: any) => {
    setSelectedTask(task)
    setView("detail")
  }

  const handleSaveTask = (task: any) => {
    // In a real app, this would save to a database
    const isNewTask = task.id.startsWith("new-")

    if (isNewTask) {
      // Add new task
      setTasks([...tasks, { ...task, id: `task-${Date.now()}` }])
    } else {
      // Update existing task
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    }

    setView("list")
    setSelectedTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null)
      setView("list")
    }
  }

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "completed" ? "todo" : "completed"
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === "completed" ? new Date().toISOString().split("T")[0] : undefined,
          }
        }
        return task
      }),
    )
  }

  const handleCancelEdit = () => {
    setView("list")
    setSelectedTask(null)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setPriorityFilter("all")
    setStatusFilter("all")
    setCategoryFilter("all")
    setDateFilter(undefined)
  }

  // Available views based on user preferences
  const availableViews = [
    { value: "list", label: "List View" },
    ...(showTaskCalendar ? [{ value: "calendar", label: "Calendar" }] : []),
    { value: "kanban", label: "Kanban" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
          Task Management
        </h2>
        <p className="text-muted-foreground">Create, organize, and track your tasks.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="list" className="w-full" onValueChange={(value) => setView(value as any)} value={view}>
          <TabsList>
            {availableViews.map((viewOption) => (
              <TabsTrigger key={viewOption.value} value={viewOption.value}>
                {viewOption.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button
          onClick={handleCreateNewTask}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
        >
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      {(view === "list" || view === "calendar" || view === "kanban") && (
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Priority</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", priorityFilter === "all" ? "opacity-100" : "opacity-0")}
                    />
                    All Priorities
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", priorityFilter === "high" ? "opacity-100" : "opacity-0")}
                    />
                    <Badge variant="destructive" className="mr-2">
                      High
                    </Badge>{" "}
                    High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", priorityFilter === "medium" ? "opacity-100" : "opacity-0")}
                    />
                    <Badge className="mr-2">Medium</Badge> Medium Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", priorityFilter === "low" ? "opacity-100" : "opacity-0")}
                    />
                    <Badge variant="outline" className="mr-2">
                      Low
                    </Badge>{" "}
                    Low Priority
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", statusFilter === "all" ? "opacity-100" : "opacity-0")}
                    />
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("todo")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", statusFilter === "todo" ? "opacity-100" : "opacity-0")}
                    />
                    To Do
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", statusFilter === "in-progress" ? "opacity-100" : "opacity-0")}
                    />
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", statusFilter === "completed" ? "opacity-100" : "opacity-0")}
                    />
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Category</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "all" ? "opacity-100" : "opacity-0")}
                    />
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("grading")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "grading" ? "opacity-100" : "opacity-0")}
                    />
                    Grading
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("lesson-planning")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "lesson-planning" ? "opacity-100" : "opacity-0")}
                    />
                    Lesson Planning
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("meetings")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "meetings" ? "opacity-100" : "opacity-0")}
                    />
                    Meetings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("administrative")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "administrative" ? "opacity-100" : "opacity-0")}
                    />
                    Administrative
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("supplies")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "supplies" ? "opacity-100" : "opacity-0")}
                    />
                    Supplies
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("planning")}>
                    <CheckCircle2
                      className={cn("mr-2 h-4 w-4", categoryFilter === "planning" ? "opacity-100" : "opacity-0")}
                    />
                    Planning
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <Button variant="ghost" size="sm" className="w-full justify-center" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {dateFilter ? format(dateFilter, "PPP") : "Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter}/>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("dueDate")}>
                  <CheckCircle2 className={cn("mr-2 h-4 w-4", sortBy === "dueDate" ? "opacity-100" : "opacity-0")} />
                  Due Date
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("priority")}>
                  <CheckCircle2 className={cn("mr-2 h-4 w-4", sortBy === "priority" ? "opacity-100" : "opacity-0")} />
                  Priority
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("title")}>
                  <CheckCircle2 className={cn("mr-2 h-4 w-4", sortBy === "title" ? "opacity-100" : "opacity-0")} />
                  Title
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchQuery ||
              priorityFilter !== "all" ||
              statusFilter !== "all" ||
              categoryFilter !== "all" ||
              dateFilter) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {view === "list" && (
        <TaskList
          tasks={sortedTasks}
          onEdit={handleEditTask}
          onView={handleViewTaskDetails}
          onToggleStatus={handleToggleTaskStatus}
          onDelete={handleDeleteTask}
        />
      )}

      {view === "calendar" && showTaskCalendar && (
        <TaskCalendarView
          tasks={tasks}
          onEdit={handleEditTask}
          onView={handleViewTaskDetails}
          onCreateTask={handleCreateNewTask}
        />
      )}

      {view === "kanban" && (
        <TaskKanbanView
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onView={handleViewTaskDetails}
          onToggleStatus={handleToggleTaskStatus}
          onDelete={handleDeleteTask}
        />
      )}

      {view === "editor" && selectedTask && (
        <TaskEditor task={selectedTask} onSave={handleSaveTask} onCancel={handleCancelEdit} />
      )}

      {view === "detail" && selectedTask && (
        <TaskDetailView
          task={selectedTask}
          onEdit={() => setView("editor")}
          onClose={() => {
            setSelectedTask(null)
            setView("list")
          }}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleTaskStatus}
        />
      )}

      {!showTaskCalendar && view === "calendar" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Calendar View Disabled</CardTitle>
            <CardDescription>The calendar view for tasks has been disabled in your settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You can enable the calendar view in your settings under the "Features" tab.
            </p>
            <Button variant="outline" onClick={() => setView("list")}>
              Return to List View
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
