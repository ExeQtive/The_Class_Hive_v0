"use client"

import { CheckCircle, Clock, Edit, MoreHorizontal, Trash, XCircle } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TaskListProps {
  tasks: any[]
  onEdit: (task: any) => void
  onView: (task: any) => void
  onToggleStatus: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export function TaskList({ tasks, onEdit, onView, onToggleStatus, onDelete }: TaskListProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return format(new Date(dateString), "MMM d, yyyy")
  }

  const isOverdue = (task: any) => {
    if (task.status === "completed") return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(task.dueDate)
    return dueDate < today
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      grading: "Grading",
      "lesson-planning": "Lesson Planning",
      meetings: "Meetings",
      administrative: "Administrative",
      supplies: "Supplies",
      planning: "Planning",
    }
    return categories[category] || category
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-white border-0">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      grading: "bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500",
      "lesson-planning": "bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500",
      meetings: "bg-gradient-to-r from-rose-400 to-red-400 hover:from-rose-500 hover:to-red-500",
      administrative: "bg-gradient-to-r from-slate-400 to-gray-400 hover:from-slate-500 hover:to-gray-500",
      supplies: "bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500",
      planning: "bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500",
    }

    return (
      <Badge
        variant="outline"
        className={`text-xs border-0 text-white ${colors[category] || "bg-gradient-to-r from-gray-400 to-slate-400"}`}
      >
        {getCategoryLabel(category)}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-2">No tasks found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new task.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            className={cn(
              "transition-all hover:shadow-md",
              task.status === "completed" ? "opacity-70" : "",
              isOverdue(task) ? "border-destructive/50" : "",
              task.priority === "high" ? "border-l-4 border-l-red-500" : "",
              task.priority === "medium" ? "border-l-4 border-l-amber-400" : "",
              task.priority === "low" ? "border-l-4 border-l-emerald-400" : "",
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.status === "completed"}
                  onCheckedChange={() => onToggleStatus(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={cn(
                        "text-lg font-medium cursor-pointer hover:text-primary transition-colors",
                        task.status === "completed" ? "line-through text-muted-foreground" : "",
                      )}
                      onClick={() => onView(task)}
                    >
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {getPriorityBadge(task.priority)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
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
                          <DropdownMenuItem onClick={() => onToggleStatus(task.id)}>
                            {task.status === "completed" ? (
                              <>
                                <XCircle className="mr-2 h-4 w-4" />
                                Mark as Incomplete
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Complete
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => onDelete(task.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-4 py-3 border-t flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3.5 w-3.5" />
                <span
                  className={cn(isOverdue(task) && task.status !== "completed" ? "text-destructive font-medium" : "")}
                >
                  {isOverdue(task) && task.status !== "completed" ? "Overdue: " : "Due: "}
                  {formatDate(task.dueDate)}
                </span>
              </div>
              {getCategoryBadge(task.category)}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
