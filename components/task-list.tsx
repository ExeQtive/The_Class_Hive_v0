"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, formatDate, isOverdue } from "@/lib/utils"
import type { Task } from "@/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCategoryLabel } from "@/constants"

interface TaskListProps {
  tasks: Task[]
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
  onView: (task: Task) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleStatus, onDelete, onEdit, onView }) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="animate-pulse-slow">
            High
          </Badge>
        )
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            "transition-all duration-300 hover:shadow-lg group",
            task.status === "completed" ? "opacity-70" : "",
            isOverdue(task) ? "border-destructive/50" : "",
            task.status === "completed" ? "bg-muted/20" : "",
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={() => onToggleStatus(task.id)}
                className={cn(
                  "mt-1 transition-colors",
                  task.priority === "high"
                    ? "data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    : task.priority === "medium"
                      ? "data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      : "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                )}
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2">
                        <DropdownMenuItem
                          onClick={() => onView(task)}
                          className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(task)}
                          className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                        >
                          <Edit className="mr-2 h-4 w-4 text-teal-500" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onToggleStatus(task.id)}
                          className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                        >
                          {task.status === "completed" ? (
                            <>
                              <XCircle className="mr-2 h-4 w-4 text-amber-500" />
                              Mark as Incomplete
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Mark as Complete
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                          onClick={() => onDelete(task.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1 group-hover:text-foreground/80 transition-colors">
                  {task.description}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t flex justify-between bg-gradient-to-r from-white to-muted/30">
            <div className="flex items-center text-sm text-muted-foreground p-1.5 px-3 rounded-full bg-white shadow-sm">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span
                className={cn(isOverdue(task) && task.status !== "completed" ? "text-destructive font-medium" : "")}
              >
                {isOverdue(task) && task.status !== "completed" ? "Overdue: " : "Due: "}
                {formatDate(task.dueDate)}
              </span>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                task.category === "grading"
                  ? "bg-purple-50 border-purple-200 text-purple-700"
                  : task.category === "lesson-planning"
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : task.category === "meetings"
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : task.category === "administrative"
                        ? "bg-blue-50 border-blue-200 text-blue-700"
                        : task.category === "supplies"
                          ? "bg-pink-50 border-pink-200 text-pink-700"
                          : "bg-cyan-50 border-cyan-200 text-cyan-700",
              )}
            >
              {getCategoryLabel(task.category)}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default TaskList
