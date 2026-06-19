"use client"

import { BookOpen, Calculator, FileText, Globe, Palette, Pencil, Rocket, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ResourceCategoriesProps {
  onSelectCategory: (category: string) => void
}

export function ResourceCategories({ onSelectCategory }: ResourceCategoriesProps) {
  const categories = [
    {
      name: "Math",
      icon: <Calculator className="h-8 w-8" />,
      description: "Worksheets, activities, and resources for teaching mathematics.",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white",
      borderColor: "border-blue-400",
      hoverColor: "group-hover:from-blue-600 group-hover:to-cyan-700",
    },
    {
      name: "Science",
      icon: <Rocket className="h-8 w-8" />,
      description: "Experiments, demonstrations, and materials for science education.",
      color: "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
      borderColor: "border-green-400",
      hoverColor: "group-hover:from-green-600 group-hover:to-emerald-700",
    },
    {
      name: "Language Arts",
      icon: <Pencil className="h-8 w-8" />,
      description: "Reading, writing, grammar, and literacy resources.",
      color: "bg-gradient-to-br from-purple-500 to-violet-600 text-white",
      borderColor: "border-purple-400",
      hoverColor: "group-hover:from-purple-600 group-hover:to-violet-700",
    },
    {
      name: "Social Studies",
      icon: <Globe className="h-8 w-8" />,
      description: "History, geography, and social sciences materials.",
      color: "bg-gradient-to-br from-amber-500 to-yellow-600 text-white",
      borderColor: "border-amber-400",
      hoverColor: "group-hover:from-amber-600 group-hover:to-yellow-700",
    },
    {
      name: "Art",
      icon: <Palette className="h-8 w-8" />,
      description: "Creative projects, techniques, and visual arts resources.",
      color: "bg-gradient-to-br from-pink-500 to-rose-600 text-white",
      borderColor: "border-pink-400",
      hoverColor: "group-hover:from-pink-600 group-hover:to-rose-700",
    },
    {
      name: "Professional Development",
      icon: <Users className="h-8 w-8" />,
      description: "Teacher training, classroom management, and professional growth.",
      color: "bg-gradient-to-br from-indigo-500 to-violet-600 text-white",
      borderColor: "border-indigo-400",
      hoverColor: "group-hover:from-indigo-600 group-hover:to-violet-700",
    },
    {
      name: "Classroom Management",
      icon: <FileText className="h-8 w-8" />,
      description: "Behavior management, organization, and classroom procedures.",
      color: "bg-gradient-to-br from-orange-500 to-red-600 text-white",
      borderColor: "border-orange-400",
      hoverColor: "group-hover:from-orange-600 group-hover:to-red-700",
    },
    {
      name: "Special Education",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Resources for diverse learners and special education needs.",
      color: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white",
      borderColor: "border-teal-400",
      hoverColor: "group-hover:from-teal-600 group-hover:to-cyan-700",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-100">
        <h3 className="text-xl font-bold mb-2 text-violet-800">Browse by Subject</h3>
        <p className="text-violet-600">Explore educational resources organized by subject area.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden group border border-opacity-50"
            onClick={() => onSelectCategory(category.name)}
          >
            <CardHeader className="pb-2 relative">
              <div
                className={`p-3 rounded-md inline-block ${category.color} transition-all duration-300 ${category.hoverColor}`}
              >
                {category.icon}
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
              <CardTitle className="mt-2">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription>{category.description}</CardDescription>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-black/5 to-transparent rounded-tl-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
