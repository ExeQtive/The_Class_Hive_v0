"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, PlusCircle } from "lucide-react"

// Mock data for demonstration
const mockGoals = [
  {
    id: "1",
    student: "Alex Johnson",
    goal: "Improve reading comprehension by identifying main ideas in grade-level texts",
    category: "Academic",
    progress: 75,
    status: "On Track",
    dueDate: "2024-05-15",
  },
  {
    id: "2",
    student: "Jamie Smith",
    goal: "Develop strategies to manage anxiety during testing situations",
    category: "Social-Emotional",
    progress: 50,
    status: "In Progress",
    dueDate: "2024-04-10",
  },
  {
    id: "3",
    student: "Taylor Williams",
    goal: "Master multi-digit multiplication with 90% accuracy",
    category: "Academic",
    progress: 30,
    status: "Needs Attention",
    dueDate: "2024-03-20",
  },
  {
    id: "4",
    student: "Morgan Brown",
    goal: "Improve written expression by using complete sentences with proper punctuation",
    category: "Academic",
    progress: 90,
    status: "Almost Complete",
    dueDate: "2024-02-28",
  },
  {
    id: "5",
    student: "Casey Davis",
    goal: "Develop appropriate peer interaction skills during group activities",
    category: "Social-Emotional",
    progress: 60,
    status: "In Progress",
    dueDate: "2024-06-05",
  },
]

export function IEPGoalTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [goals, setGoals] = useState(mockGoals)

  const filteredGoals = goals.filter(
    (goal) =>
      (goal.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.goal.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filter === "all" || goal.category.toLowerCase() === filter.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Almost Complete":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Needs Attention":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-600"
    if (progress >= 50) return "bg-blue-600"
    if (progress >= 25) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search goals or students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="social-emotional">Social-Emotional</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGoals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No goals found
                </TableCell>
              </TableRow>
            ) : (
              filteredGoals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-medium">{goal.student}</TableCell>
                  <TableCell className="max-w-xs truncate">{goal.goal}</TableCell>
                  <TableCell>{goal.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={goal.progress} className={getProgressColor(goal.progress)} />
                      <span className="text-sm">{goal.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(goal.status)} variant="outline">
                      {goal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(goal.dueDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
