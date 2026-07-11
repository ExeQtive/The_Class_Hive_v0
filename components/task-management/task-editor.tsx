// @ts-nocheck
"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TaskEditorProps {
  task: any
  onSave: (task: any) => void
  onCancel: () => void
}

export function TaskEditor({ task, onSave, onCancel }: TaskEditorProps) {
  const [editedTask, setEditedTask] = useState({ ...task })
  const [date, setDate] = useState<Date | undefined>(task.dueDate ? new Date(task.dueDate) : undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedTask({ ...editedTask, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setEditedTask({ ...editedTask, [name]: value })
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      setEditedTask({
        ...editedTask,
        dueDate: format(date, "yyyy-MM-dd"),
      })
    }
  }

  const handleSave = () => {
    onSave(editedTask)
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>{task.id.startsWith("new") ? "Create New Task" : "Edit Task"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect}/>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select value={editedTask.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select value={editedTask.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select value={editedTask.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grading">Grading</SelectItem>
                  <SelectItem value="lesson-planning">Lesson Planning</SelectItem>
                  <SelectItem value="meetings">Meetings</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="relatedTo">Related To</Label>
            <Input
              id="relatedTo"
              name="relatedTo"
              value={editedTask.relatedTo}
              onChange={handleInputChange}
              placeholder="E.g., Math - Grade 5, Student Name, etc."
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" /> Save Task
        </Button>
      </CardFooter>
    </Card>
  )
}
