"use client"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

interface StudentPerformanceProps {
  students: any[]
  onSave: (students: any[]) => void
  onCancel: () => void
}

export function StudentPerformance({ students, onSave, onCancel }: StudentPerformanceProps) {
  const [performanceData, setPerformanceData] = useState<any[]>(
    students.map((student) => ({
      ...student,
      performance: { ...student.performance },
    })),
  )
  const [activeTab, setActiveTab] = useState<"grades" | "analytics">("grades")

  const handleGradeChange = (studentId: string, subject: string, value: string) => {
    const numValue = Number.parseInt(value)
    if (isNaN(numValue) || numValue < 0 || numValue > 100) return

    setPerformanceData(
      performanceData.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            performance: {
              ...student.performance,
              [subject]: numValue,
            },
          }
        }
        return student
      }),
    )
  }

  const handleSavePerformance = () => {
    onSave(performanceData)
  }

  const getAveragePerformance = (performance: any) => {
    return Math.round(
      (performance.math + performance.science + performance.reading + performance.writing + performance.socialStudies) /
        5,
    )
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600"
    if (grade >= 80) return "text-amber-600"
    if (grade >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const getGradeBadgeColor = (grade: number) => {
    if (grade >= 90) return "bg-green-100 text-green-700 border-green-200"
    if (grade >= 80) return "bg-amber-100 text-amber-700 border-amber-200"
    if (grade >= 70) return "bg-orange-100 text-orange-700 border-orange-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  // Prepare data for class average chart
  const classAverages = {
    math: Math.round(students.reduce((sum, student) => sum + student.performance.math, 0) / students.length),
    science: Math.round(students.reduce((sum, student) => sum + student.performance.science, 0) / students.length),
    reading: Math.round(students.reduce((sum, student) => sum + student.performance.reading, 0) / students.length),
    writing: Math.round(students.reduce((sum, student) => sum + student.performance.writing, 0) / students.length),
    socialStudies: Math.round(
      students.reduce((sum, student) => sum + student.performance.socialStudies, 0) / students.length,
    ),
  }

  const chartData = [
    { subject: "Math", average: classAverages.math },
    { subject: "Science", average: classAverages.science },
    { subject: "Reading", average: classAverages.reading },
    { subject: "Writing", average: classAverages.writing },
    { subject: "Social Studies", average: classAverages.socialStudies },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="mr-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-100"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Students
        </Button>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "grades" | "analytics")}>
          <TabsList className="bg-cyan-100">
            <TabsTrigger value="grades" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Grade Entry
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              Performance Analytics
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "grades" && (
        <Card className="border-t-4 border-t-cyan-500 shadow-md overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardTitle className="text-cyan-800">Student Grades</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
              {performanceData.map((student, index) => (
                <motion.div
                  key={student.id}
                  className="border rounded-md p-4 bg-white hover:bg-cyan-50/50 transition-colors shadow-sm"
                  variants={item}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-cyan-200">
                        <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                        <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                          {student.firstName.charAt(0)}
                          {student.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-cyan-900">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Grade {student.grade}, Section {student.section}
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={cn("mt-2 md:mt-0", getGradeBadgeColor(getAveragePerformance(student.performance)))}
                    >
                      Average: {getAveragePerformance(student.performance)}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor={`math-${student.id}`} className="text-sm text-cyan-700 font-medium">
                        Math
                      </Label>
                      <Input
                        id={`math-${student.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={student.performance.math}
                        onChange={(e) => handleGradeChange(student.id, "math", e.target.value)}
                        className={cn(
                          "mt-1 border-cyan-200 focus-visible:ring-cyan-500",
                          getGradeColor(student.performance.math),
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`science-${student.id}`} className="text-sm text-cyan-700 font-medium">
                        Science
                      </Label>
                      <Input
                        id={`science-${student.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={student.performance.science}
                        onChange={(e) => handleGradeChange(student.id, "science", e.target.value)}
                        className={cn(
                          "mt-1 border-cyan-200 focus-visible:ring-cyan-500",
                          getGradeColor(student.performance.science),
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`reading-${student.id}`} className="text-sm text-cyan-700 font-medium">
                        Reading
                      </Label>
                      <Input
                        id={`reading-${student.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={student.performance.reading}
                        onChange={(e) => handleGradeChange(student.id, "reading", e.target.value)}
                        className={cn(
                          "mt-1 border-cyan-200 focus-visible:ring-cyan-500",
                          getGradeColor(student.performance.reading),
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`writing-${student.id}`} className="text-sm text-cyan-700 font-medium">
                        Writing
                      </Label>
                      <Input
                        id={`writing-${student.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={student.performance.writing}
                        onChange={(e) => handleGradeChange(student.id, "writing", e.target.value)}
                        className={cn(
                          "mt-1 border-cyan-200 focus-visible:ring-cyan-500",
                          getGradeColor(student.performance.writing),
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`socialStudies-${student.id}`} className="text-sm text-cyan-700 font-medium">
                        Social Studies
                      </Label>
                      <Input
                        id={`socialStudies-${student.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={student.performance.socialStudies}
                        onChange={(e) => handleGradeChange(student.id, "socialStudies", e.target.value)}
                        className={cn(
                          "mt-1 border-cyan-200 focus-visible:ring-cyan-500",
                          getGradeColor(student.performance.socialStudies),
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
          <CardFooter className="border-t flex justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
            <Button
              variant="outline"
              onClick={onCancel}
              className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-100"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePerformance}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Save className="h-4 w-4 mr-2" /> Save Grades
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <Card className="border-t-4 border-t-cyan-500 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
              <CardTitle className="text-cyan-800">Class Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    performance: {
                      label: "Performance",
                    },
                    average: {
                      label: "Average",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="subject" tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                      <Bar
                        dataKey="average"
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                      <ChartTooltip content={<ChartTooltipContent labelKey="performance" />} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0891b2" stopColor="#0891b2" />
                          <stop offset="100%" stopColor="#0ea5e9" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-cyan-500 shadow-md overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-cyan-50 to-blue-50">
              <CardTitle className="text-cyan-800">Student Performance Ranking</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-cyan-50">
                      <th className="text-left py-3 px-4 font-medium text-cyan-800">Rank</th>
                      <th className="text-left py-3 px-4 font-medium text-cyan-800">Student</th>
                      <th className="text-center py-3 px-4 font-medium text-cyan-800">Math</th>
                      <th className="text-center py-3 px-4 font-medium text-cyan-800">Science</th>
                      <th className="text-center py-3 px-4 font-medium text-cyan-800">Reading</th>
                      <th className="text-center py-3 px-4 font-medium text-cyan-800">Writing</th>
                      <th className="text-center py-3 px-4 font-medium text-cyan-800">Social Studies</th>
                      <th className="text-center py-3 px-4 font-medium text-cyan-800">Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...students]
                      .sort((a, b) => getAveragePerformance(b.performance) - getAveragePerformance(a.performance))
                      .map((student, index) => (
                        <motion.tr
                          key={student.id}
                          className="border-b hover:bg-cyan-50/50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <td className="py-3 px-4 font-medium">{index + 1}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 border-2 border-cyan-200">
                                <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                                  {student.firstName.charAt(0)}
                                  {student.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium text-cyan-900">
                                {student.firstName} {student.lastName}
                              </div>
                            </div>
                          </td>
                          <td className={cn("text-center py-3 px-4", getGradeColor(student.performance.math))}>
                            {student.performance.math}%
                          </td>
                          <td className={cn("text-center py-3 px-4", getGradeColor(student.performance.science))}>
                            {student.performance.science}%
                          </td>
                          <td className={cn("text-center py-3 px-4", getGradeColor(student.performance.reading))}>
                            {student.performance.reading}%
                          </td>
                          <td className={cn("text-center py-3 px-4", getGradeColor(student.performance.writing))}>
                            {student.performance.writing}%
                          </td>
                          <td className={cn("text-center py-3 px-4", getGradeColor(student.performance.socialStudies))}>
                            {student.performance.socialStudies}%
                          </td>
                          <td className="text-center py-3 px-4">
                            <Badge className={getGradeBadgeColor(getAveragePerformance(student.performance))}>
                              {getAveragePerformance(student.performance)}%
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
