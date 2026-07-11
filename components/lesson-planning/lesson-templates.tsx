// @ts-nocheck
// @ts-nocheck
"use client"

import { BookOpen, FileText, Lightbulb, Microscope, Music, Palette, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface LessonTemplatesProps {
  onUseTemplate: (template: any) => void
}

// Sample template data
const templates = [
  {
    id: "template-1",
    title: "5E Science Lesson",
    subject: "Science",
    icon: <Microscope className="h-5 w-5" />,
    description: "A structured science lesson using the 5E model: Engage, Explore, Explain, Elaborate, Evaluate.",
    objectives: [
      "Students will engage with a scientific phenomenon",
      "Students will explore through hands-on activities",
      "Students will explain their understanding",
      "Students will elaborate on concepts",
      "Students will evaluate their learning",
    ],
    materials: ["Science notebooks", "Lab equipment", "Visual aids"],
    standards: ["NGSS.5-PS1-1", "NGSS.5-PS1-2"],
    structure: "5E Model",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "template-2",
    title: "Math Problem-Based Learning",
    subject: "Math",
    icon: <FileText className="h-5 w-5" />,
    description: "A problem-based approach to teaching mathematical concepts through real-world scenarios.",
    objectives: [
      "Students will identify the mathematical problem",
      "Students will develop solution strategies",
      "Students will apply mathematical concepts",
      "Students will reflect on their problem-solving process",
    ],
    materials: ["Problem scenario handouts", "Manipulatives", "Graph paper"],
    standards: ["MATH.5.OA.1", "MATH.5.OA.2"],
    structure: "Problem-Based Learning",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "template-3",
    title: "Reading Workshop",
    subject: "Language Arts",
    icon: <BookOpen className="h-5 w-5" />,
    description: "A structured reading workshop with mini-lesson, independent reading, and group discussion.",
    objectives: [
      "Students will apply reading strategies",
      "Students will analyze text elements",
      "Students will make connections to the text",
      "Students will participate in meaningful discussion",
    ],
    materials: ["Reading materials", "Reading response journals", "Anchor charts"],
    standards: ["ELA.5.RL.1", "ELA.5.RL.2"],
    structure: "Workshop Model",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "template-4",
    title: "Social Studies Inquiry",
    subject: "Social Studies",
    icon: <Users className="h-5 w-5" />,
    description: "An inquiry-based approach to exploring historical events and social concepts.",
    objectives: [
      "Students will develop inquiry questions",
      "Students will gather and evaluate sources",
      "Students will analyze evidence",
      "Students will communicate conclusions",
    ],
    materials: ["Primary sources", "Secondary sources", "Research organizers"],
    standards: ["SS.5.H.1", "SS.5.C.1"],
    structure: "Inquiry-Based Learning",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "template-5",
    title: "Art Appreciation & Creation",
    subject: "Art",
    icon: <Palette className="h-5 w-5" />,
    description: "A lesson combining art appreciation with hands-on creative expression.",
    objectives: [
      "Students will analyze artistic elements",
      "Students will interpret artistic meaning",
      "Students will apply artistic techniques",
      "Students will create original artwork",
    ],
    materials: ["Art examples", "Art supplies", "Reflection sheets"],
    standards: ["ART.5.V.1", "ART.5.C.1"],
    structure: "Appreciation & Creation",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "template-6",
    title: "Music Performance & Analysis",
    subject: "Music",
    icon: <Music className="h-5 w-5" />,
    description: "A comprehensive music lesson combining performance, analysis, and appreciation.",
    objectives: [
      "Students will analyze musical elements",
      "Students will perform musical pieces",
      "Students will evaluate musical performances",
      "Students will connect music to cultural contexts",
    ],
    materials: ["Musical instruments", "Sheet music", "Audio recordings"],
    standards: ["MUS.5.O.1", "MUS.5.H.1"],
    structure: "Performance & Analysis",
    color: "from-indigo-500 to-violet-500",
  },
]

export function LessonTemplates({ onUseTemplate }: LessonTemplatesProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
          Lesson Templates
        </h3>
        <p className="text-muted-foreground">Start with a template to quickly create structured, effective lessons.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group border-t-4 border-t-teal-500">
              <CardHeader className={`pb-2 bg-gradient-to-r ${template.color} text-white`}>
                <div className="flex items-center space-x-2">
                  <div className="rounded-md bg-white/20 p-2 text-white">{template.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="text-white/80">{template.subject}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-teal-700">Structure:</span> {template.structure}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-teal-700">Objectives:</span> {template.objectives.length}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.standards.map((standard, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-gradient-to-r from-teal-50 to-cyan-50">
                <Button
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 group-hover:shadow-md"
                  onClick={() => onUseTemplate(template)}
                >
                  <Lightbulb className="h-4 w-4 mr-2 animate-pulse-slow" /> Use This Template
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
