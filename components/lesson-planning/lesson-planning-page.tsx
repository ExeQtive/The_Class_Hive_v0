"use client"

import { useState } from "react"
import { Plus, Search, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LessonCard } from "@/components/lesson-planning/lesson-card"
import { LessonCalendar } from "@/components/lesson-planning/lesson-calendar"
import { LessonEditor } from "@/components/lesson-planning/lesson-editor"
import { LessonTemplates } from "@/components/lesson-planning/lesson-templates"
import { cn } from "@/lib/utils"

// Sample data for demonstration
const sampleLessons = [
  {
    id: "1",
    title: "Introduction to Fractions",
    subject: "Math",
    grade: "5",
    duration: "45 min",
    date: "2023-05-15",
    status: "published",
    objectives: ["Understand the concept of fractions", "Identify fractions in real-world contexts"],
    materials: ["Fraction strips", "Worksheets", "Interactive whiteboard"],
    standards: ["MATH.5.NF.1", "MATH.5.NF.2"],
  },
  {
    id: "2",
    title: "States of Matter",
    subject: "Science",
    grade: "5",
    duration: "60 min",
    date: "2023-05-16",
    status: "draft",
    objectives: ["Identify the three states of matter", "Describe the properties of solids, liquids, and gases"],
    materials: ["Ice cubes", "Water", "Hot plate", "Balloons"],
    standards: ["SCI.5.PS1.1"],
  },
  {
    id: "3",
    title: "American Revolution Causes",
    subject: "Social Studies",
    grade: "5",
    duration: "50 min",
    date: "2023-05-17",
    status: "published",
    objectives: [
      "Identify key events leading to the American Revolution",
      "Understand the concept of taxation without representation",
    ],
    materials: ["Timeline cards", "Primary source documents", "Map of the 13 colonies"],
    standards: ["SS.5.H.1.3", "SS.5.H.1.5"],
  },
  {
    id: "4",
    title: "Poetry Analysis",
    subject: "Language Arts",
    grade: "5",
    duration: "45 min",
    date: "2023-05-18",
    status: "published",
    objectives: ["Identify poetic devices", "Analyze the theme of a poem"],
    materials: ["Poem handouts", "Highlighters", "Poetry terms chart"],
    standards: ["ELA.5.RL.4", "ELA.5.RL.5"],
  },
  {
    id: "5",
    title: "Watercolor Techniques",
    subject: "Art",
    grade: "5",
    duration: "55 min",
    date: "2023-05-19",
    status: "draft",
    objectives: ["Learn basic watercolor techniques", "Create a landscape using watercolors"],
    materials: ["Watercolor paints", "Brushes", "Watercolor paper", "Water cups"],
    standards: ["ART.5.V.1.1", "ART.5.V.3.1"],
  },
]

interface LessonPlanningPageProps {
  initialView?: "list" | "calendar" | "editor" | "templates"
}

export function LessonPlanningPage({ initialView = "list" }: LessonPlanningPageProps) {
  const [view, setView] = useState<"list" | "calendar" | "editor" | "templates">(initialView)
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLessons = sampleLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === "all" || lesson.subject === subjectFilter
    const matchesStatus = statusFilter === "all" || lesson.status === statusFilter

    return matchesSearch && matchesSubject && matchesStatus
  })

  const handleCreateNewLesson = () => {
    setSelectedLesson({
      id: `new-${Date.now()}`,
      title: "New Lesson",
      subject: "",
      grade: "5",
      duration: "45 min",
      date: new Date().toISOString().split("T")[0],
      status: "draft",
      objectives: [],
      materials: [],
      standards: [],
    })
    setView("editor")
  }

  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson)
    setView("editor")
  }

  const handleSaveLesson = (lesson: any) => {
    // In a real app, this would save to a database
    console.log("Saving lesson:", lesson)
    setView("list")
    setSelectedLesson(null)
  }

  const handleCancelEdit = () => {
    setView("list")
    setSelectedLesson(null)
  }

  const handleUseTemplate = (template: any) => {
    setSelectedLesson({
      ...template,
      id: `new-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "draft",
    })
    setView("editor")
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 shadow-sm mb-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
            Lesson Planning
          </h2>
          <p className="text-teal-700">Create, organize, and schedule your lesson plans with ease.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2 bg-white p-1 rounded-lg shadow-sm border border-teal-100">
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            className={cn(
              "justify-start",
              view === "list"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600"
                : "text-teal-700 hover:text-teal-800 hover:bg-teal-50",
            )}
          >
            List View
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            onClick={() => setView("calendar")}
            className={cn(
              "justify-start",
              view === "calendar"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600"
                : "text-teal-700 hover:text-teal-800 hover:bg-teal-50",
            )}
          >
            Calendar View
          </Button>
          <Button
            variant={view === "templates" ? "default" : "outline"}
            onClick={() => setView("templates")}
            className={cn(
              "justify-start",
              view === "templates"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600"
                : "text-teal-700 hover:text-teal-800 hover:bg-teal-50",
            )}
          >
            Templates
          </Button>
        </div>
        <Button
          onClick={handleCreateNewLesson}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Lesson
        </Button>
      </div>

      {(view === "list" || view === "calendar") && (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gradient-to-r from-teal-50/50 to-cyan-50/50 rounded-lg border border-teal-100/50 shadow-sm">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
            <Input
              placeholder="Search lessons..."
              className="pl-8 border-teal-200 focus:border-teal-400 focus:ring-teal-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px] border-teal-200 focus:ring-teal-400 bg-white">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Social Studies">Social Studies</SelectItem>
              <SelectItem value="Language Arts">Language Arts</SelectItem>
              <SelectItem value="Art">Art</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-teal-200 focus:ring-teal-400 bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {view === "list" && (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson, index) => (
              <div key={lesson.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <LessonCard lesson={lesson} onEdit={() => handleEditLesson(lesson)} />
              </div>
            ))}
            {filteredLessons.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-teal-100 shadow-sm">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-teal-500" />
                </div>
                <p className="text-teal-700 text-center">
                  No lessons found. Try adjusting your filters or create a new lesson.
                </p>
                <Button
                  onClick={handleCreateNewLesson}
                  className="mt-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                >
                  <Plus className="mr-2 h-4 w-4" /> Create New Lesson
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === "calendar" && (
        <LessonCalendar
          lessons={filteredLessons}
          onEditLesson={handleEditLesson}
          onCreateLesson={handleCreateNewLesson}
        />
      )}

      {view === "editor" && selectedLesson && (
        <LessonEditor lesson={selectedLesson} onSave={handleSaveLesson} onCancel={handleCancelEdit} />
      )}

      {view === "templates" && <LessonTemplates onUseTemplate={handleUseTemplate} />}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
