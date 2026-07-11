// @ts-nocheck
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"

// Sample data - in a real app, this would come from your database
const attendanceData = [
  { name: "Mon", value: 95 },
  { name: "Tue", value: 92 },
  { name: "Wed", value: 98 },
  { name: "Thu", value: 90 },
  { name: "Fri", value: 85 },
]

const gradeDistributionData = [
  { name: "A", value: 12 },
  { name: "B", value: 18 },
  { name: "C", value: 8 },
  { name: "D", value: 4 },
  { name: "F", value: 2 },
]

const COLORS = ["#4f46e5", "#8b5cf6", "#d946ef", "#f43f5e", "#f97316"]

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("attendance")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>View attendance and grade distribution data.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attendance" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance"]}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="grades" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} students`, "Count"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
