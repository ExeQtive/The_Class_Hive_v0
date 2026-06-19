"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"

// Import the editor dynamically with client-side only rendering
const ReactQuill = dynamic(() => import("react-quill"), {
  //ssr: false,
  loading: () => <p>Loading editor...</p>,
})

// Import the styles for the editor on the client side only
import "react-quill/dist/quill.snow.css"

export function LessonEditor() {
  const [activeTab, setActiveTab] = useState("overview")
  const [lessonContent, setLessonContent] = useState({
    title: "",
    subject: "",
    gradeLevel: "",
    duration: "",
    objectives: "",
    materials: "",
    procedure: "",
    assessment: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLessonContent((prev) => ({ ...prev, [name]: value }))
  }

  const handleRichTextChange = (value: string, field: string) => {
    setLessonContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Saving lesson:", lessonContent)
    // Here you would typically save to your database
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <Label htmlFor="title">Lesson Title</Label>
          <Input
            id="title"
            name="title"
            value={lessonContent.title}
            onChange={handleChange}
            className="mt-1"
            placeholder="Enter lesson title"
          />
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={lessonContent.subject}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="e.g., Math, Science"
                />
              </div>
              <div>
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Input
                  id="gradeLevel"
                  name="gradeLevel"
                  value={lessonContent.gradeLevel}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="e.g., 3rd Grade, 9-12"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={lessonContent.duration}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., 45 minutes, 1 hour"
              />
            </div>
            <div>
              <Label htmlFor="objectives">Learning Objectives</Label>
              <Textarea
                id="objectives"
                name="objectives"
                value={lessonContent.objectives}
                onChange={handleChange}
                className="mt-1 min-h-[100px]"
                placeholder="Enter learning objectives (one per line)"
              />
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-4">
            <Label>Lesson Procedure</Label>
            <div className="mt-1 border rounded-md">
              <ReactQuill
                theme="snow"
                value={lessonContent.procedure}
                onChange={(value) => handleRichTextChange(value, "procedure")}
                className="min-h-[300px]"
              />
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-4">
            <Label htmlFor="materials">Required Materials</Label>
            <Textarea
              id="materials"
              name="materials"
              value={lessonContent.materials}
              onChange={handleChange}
              className="mt-1 min-h-[300px]"
              placeholder="List all required materials (one per line)"
            />
          </TabsContent>

          <TabsContent value="assessment" className="mt-4">
            <Label>Assessment Methods</Label>
            <div className="mt-1 border rounded-md">
              <ReactQuill
                theme="snow"
                value={lessonContent.assessment}
                onChange={(value) => handleRichTextChange(value, "assessment")}
                className="min-h-[300px]"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Lesson</Button>
        </div>
      </CardContent>
    </Card>
  )
}
