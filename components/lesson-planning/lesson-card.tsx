"use client"

import { CalendarIcon, Clock, Edit, GraduationCap, ListChecks, Target } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LessonCardProps {
  lesson: any
  onEdit: () => void
}

export function LessonCard({ lesson, onEdit }: LessonCardProps) {
  const statusColor =
    lesson.status === "published"
      ? "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200"
      : "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"

  const subjectColors: Record<string, string> = {
    Math: "from-blue-500 to-indigo-500",
    Science: "from-green-500 to-teal-500",
    "Social Studies": "from-amber-500 to-orange-500",
    "Language Arts": "from-purple-500 to-pink-500",
    Art: "from-pink-500 to-rose-500",
    Music: "from-indigo-500 to-violet-500",
    "Physical Education": "from-red-500 to-orange-500",
  }

  const gradientColor = subjectColors[lesson.subject] || "from-teal-500 to-cyan-500"

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 border-t-4 border-t-teal-500 h-full flex flex-col">
      <CardHeader className={`pb-2 bg-gradient-to-r ${gradientColor} text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-white">{lesson.title}</h3>
            <p className="text-white/80 text-sm">
              {lesson.subject} • Grade {lesson.grade}
            </p>
          </div>
          <Badge className={cn("ml-2", statusColor)}>{lesson.status === "published" ? "Published" : "Draft"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-1">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4 text-teal-500" />
            <span>{new Date(lesson.date).toLocaleDateString()}</span>
            <Clock className="ml-4 mr-2 h-4 w-4 text-teal-500" />
            <span>{lesson.duration}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-start">
              <Target className="mr-2 h-4 w-4 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-teal-700">Objectives:</p>
                <ul className="text-sm list-disc pl-5 mt-1 text-muted-foreground">
                  {lesson.objectives.slice(0, 2).map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))}
                  {lesson.objectives.length > 2 && (
                    <li className="text-muted-foreground">+{lesson.objectives.length - 2} more</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <ListChecks className="mr-2 h-4 w-4 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-teal-700">Materials:</p>
                <p className="text-sm text-muted-foreground">
                  {lesson.materials.slice(0, 3).join(", ")}
                  {lesson.materials.length > 3 && `, +${lesson.materials.length - 3} more`}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <GraduationCap className="mr-2 h-4 w-4 text-teal-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-teal-700">Standards:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {lesson.standards.map((standard: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                      {standard}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-gradient-to-r from-teal-50 to-cyan-50">
        <Button
          onClick={onEdit}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
        >
          <Edit className="mr-2 h-4 w-4" /> Edit Lesson
        </Button>
      </CardFooter>
    </Card>
  )
}
