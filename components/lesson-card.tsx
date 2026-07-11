// @ts-nocheck
// @ts-nocheck
"use client"

// components/lesson-card.tsx
import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Lesson } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarIcon, Clock, Edit, MoreHorizontal, Trash } from "lucide-react"

interface LessonCardProps {
  lesson: Lesson
  onEdit: () => void
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onEdit }) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-t-4 border-t-teal-500 group">
      <CardHeader className="pb-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              variant={lesson.status === "published" ? "default" : "secondary"}
              className="mb-2 bg-white/20 hover:bg-white/30"
            >
              {lesson.status === "published" ? "Published" : "Draft"}
            </Badge>
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
            <CardDescription className="text-white/80">
              {lesson.subject} - Grade {lesson.grade}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg">
                <Edit className="mr-2 h-4 w-4 text-teal-500" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg">
                <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                Schedule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer flex items-center p-2 gap-x-2 rounded-lg">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm p-2 rounded-lg bg-teal-50 group-hover:bg-teal-100 transition-colors">
            <CalendarIcon className="mr-2 h-4 w-4 text-teal-500" />
            <span>{formatDate(lesson.date)}</span>
          </div>
          <div className="flex items-center text-sm p-2 rounded-lg bg-cyan-50 group-hover:bg-cyan-100 transition-colors">
            <Clock className="mr-2 h-4 w-4 text-cyan-500" />
            <span>{lesson.duration}</span>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
            <h4 className="text-sm font-medium mb-2 text-purple-700">Objectives:</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5">
              {lesson.objectives.slice(0, 2).map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
              {lesson.objectives.length > 2 && (
                <li className="text-muted-foreground">+{lesson.objectives.length - 2} more</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="flex flex-wrap gap-1">
          {lesson.standards.slice(0, 2).map((standard, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-white">
              {standard}
            </Badge>
          ))}
          {lesson.standards.length > 2 && (
            <Badge variant="outline" className="text-xs bg-white">
              +{lesson.standards.length - 2}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="text-teal-600 hover:text-teal-700 hover:bg-teal-100"
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default LessonCard
