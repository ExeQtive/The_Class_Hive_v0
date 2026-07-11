// @ts-nocheck
// @ts-nocheck
"use client"

import { CheckCircle, Edit, MoreHorizontal, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TaskKanbanViewProps {
  tasks: any[]
  onEdit: (task: any) => void
  onView: (task: any) => void
  onToggleStatus: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export function TaskKanbanView({ tasks, onEdit, onView, onToggleStatus, onDelete }: TaskKanbanViewProps) {
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d")
  }

  const isOverdue = (task: any) => {
    if (task.status === "completed") return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(task.dueDate)
    return dueDate < today
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="ml-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge className="ml-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge className="ml-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white border-0">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      grading: "from-purple-100 to-indigo-100 border-purple-300",
      "lesson-planning": "from-blue-100 to-cyan-100 border-blue-300",
      meetings: "from-rose-100 to-red-100 border-rose-300",
      administrative: "from-slate-100 to-gray-100 border-slate-300",
      supplies: "from-amber-100 to-yellow-100 border-amber-300",
      planning: "from-emerald-100 to-green-100 border-emerald-300",
    }

    return colors[category] || "from-gray-100 to-slate-100 border-gray-300"
  }

  const TaskCard = ({ task }: { task: any }) => (
    <Card
      className={`mb-3 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br ${getCategoryColor(task.category)} border`}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <div
            className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
            onClick={() => onView(task)}
          >
            {task.title}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(task)}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {task.status !== "completed" && (
                <DropdownMenuItem onClick={() => onToggleStatus(task.id)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Complete
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(task.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className={cn("text-xs", isOverdue(task) ? "text-destructive font-medium" : "text-muted-foreground")}>
          {formatDate(task.dueDate)}
        </div>
        {getPriorityBadge(task.priority)}
      </CardFooter>
    </Card>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-3">
        <div className="rounded-md p-3 border bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium flex items-center">
              <Badge variant="outline" className="mr-2 bg-white">
                {todoTasks.length}
              </Badge>
              <span className="text-blue-700">To Do</span>
            </h3>
          </div>
          <div className="space-y-2">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {todoTasks.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground bg-white/50 rounded-md">
                No tasks to do
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-md p-3 border bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium flex items-center">
              <Badge variant="outline" className="mr-2 bg-white">
                {inProgressTasks.length}
              </Badge>
              <span className="text-amber-700">In Progress</span>
            </h3>
          </div>
          <div className="space-y-2">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {inProgressTasks.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground bg-white/50 rounded-md">
                No tasks in progress
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-md p-3 border bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium flex items-center">
              <Badge variant="outline" className="mr-2 bg-white">
                {completedTasks.length}
              </Badge>
              <span className="text-green-700">Completed</span>
            </h3>
          </div>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {completedTasks.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground bg-white/50 rounded-md">
                No completed tasks
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
