"use client"

import { CalendarIcon, Clock, Edit, Trash, XCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TaskDetailViewProps {
  task: any
  onEdit: () => void
  onClose: () => void
  onDelete: (taskId: string) => void
  onToggleStatus: (taskId: string) => void
}

export function TaskDetailView({ task, onEdit, onClose, onDelete, onToggleStatus }: TaskDetailViewProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return format(new Date(dateString), "MMMM d, yyyy")
  }

  const isOverdue = () => {
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
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge>Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        )
      case "todo":
        return <Badge variant="outline">To Do</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {getStatusBadge(task.status)}
              {getPriorityBadge(task.priority)}
            </div>
            <CardTitle className="text-xl">{task.title}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <p className="text-sm">{task.description || "No description provided."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Due Date</h3>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className={cn(isOverdue() ? "text-destructive font-medium" : "")}>
                  {formatDate(task.dueDate)}
                  {isOverdue() && task.status !== "completed" && " (Overdue)"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Category</h3>
              <Badge variant="outline">{getCategoryLabel(task.category)}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Related To</h3>
              <p className="text-sm">{task.relatedTo || "Not specified"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Created</h3>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            </div>
          </div>

          {task.status === "completed" && task.completedAt && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Completed</h3>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                <span>{formatDate(task.completedAt)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <Button variant="destructive" onClick={() => onDelete(task.id)}>
          <Trash className="h-4 w-4 mr-2" /> Delete
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onToggleStatus(task.id)}>
            {task.status === "completed" ? (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Mark as Incomplete
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </>
            )}
          </Button>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
