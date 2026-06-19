"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Clock,
  Edit,
  FileText,
  Layers,
  Plus,
  Search,
  Trash,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"

// Sample data for demonstration
const sampleGroups = [
  {
    id: "group-1",
    name: "Reading Intervention",
    subject: "Reading",
    students: [
      {
        id: "student-1",
        name: "Emma Johnson",
        avatar: "/placeholder.svg?height=32&width=32&text=EJ",
        performance: 65,
      },
      {
        id: "student-2",
        name: "Liam Smith",
        avatar: "/placeholder.svg?height=32&width=32&text=LS",
        performance: 72,
      },
      {
        id: "student-3",
        name: "Sophia Garcia",
        avatar: "/placeholder.svg?height=32&width=32&text=SG",
        performance: 58,
      },
      {
        id: "student-4",
        name: "Noah Williams",
        avatar: "/placeholder.svg?height=32&width=32&text=NW",
        performance: 63,
      },
    ],
    schedule: "Monday, Wednesday, Friday - 10:30 AM",
    location: "Reading Corner",
    goals: ["Improve reading fluency", "Develop comprehension strategies", "Build vocabulary"],
    progress: 68,
    recentActivities: [
      {
        id: "activity-1",
        date: "2023-05-15",
        title: "Phonics Practice",
        description: "Worked on consonant blends and digraphs.",
        completed: true,
      },
      {
        id: "activity-2",
        date: "2023-05-12",
        title: "Reading Comprehension",
        description: "Practiced identifying main ideas and supporting details.",
        completed: true,
      },
      {
        id: "activity-3",
        date: "2023-05-10",
        title: "Vocabulary Building",
        description: "Introduced new vocabulary words from the current story.",
        completed: true,
      },
    ],
  },
  {
    id: "group-2",
    name: "Math Enrichment",
    subject: "Math",
    students: [
      {
        id: "student-5",
        name: "Olivia Brown",
        avatar: "/placeholder.svg?height=32&width=32&text=OB",
        performance: 92,
      },
      {
        id: "student-6",
        name: "Mason Taylor",
        avatar: "/placeholder.svg?height=32&width=32&text=MT",
        performance: 88,
      },
      {
        id: "student-7",
        name: "Ava Martinez",
        avatar: "/placeholder.svg?height=32&width=32&text=AM",
        performance: 95,
      },
    ],
    schedule: "Tuesday, Thursday - 1:15 PM",
    location: "Math Lab",
    goals: [
      "Explore advanced problem-solving strategies",
      "Develop mathematical reasoning",
      "Introduce algebraic concepts",
    ],
    progress: 91,
    recentActivities: [
      {
        id: "activity-4",
        date: "2023-05-16",
        title: "Problem Solving Challenge",
        description: "Students worked on multi-step word problems.",
        completed: true,
      },
      {
        id: "activity-5",
        date: "2023-05-11",
        title: "Geometry Exploration",
        description: "Investigated properties of 3D shapes.",
        completed: true,
      },
    ],
  },
  {
    id: "group-3",
    name: "Writing Workshop",
    subject: "Writing",
    students: [
      {
        id: "student-8",
        name: "Ethan Anderson",
        avatar: "/placeholder.svg?height=32&width=32&text=EA",
        performance: 78,
      },
      {
        id: "student-9",
        name: "Isabella Thomas",
        avatar: "/placeholder.svg?height=32&width=32&text=IT",
        performance: 82,
      },
      {
        id: "student-10",
        name: "James Wilson",
        avatar: "/placeholder.svg?height=32&width=32&text=JW",
        performance: 75,
      },
      {
        id: "student-11",
        name: "Charlotte Lee",
        avatar: "/placeholder.svg?height=32&width=32&text=CL",
        performance: 85,
      },
      {
        id: "student-12",
        name: "Benjamin Harris",
        avatar: "/placeholder.svg?height=32&width=32&text=BH",
        performance: 79,
      },
    ],
    schedule: "Monday, Wednesday - 2:00 PM",
    location: "Classroom 205",
    goals: ["Develop writing process skills", "Improve organization and structure", "Enhance grammar and mechanics"],
    progress: 80,
    recentActivities: [
      {
        id: "activity-6",
        date: "2023-05-15",
        title: "Narrative Writing",
        description: "Worked on developing characters and setting.",
        completed: true,
      },
      {
        id: "activity-7",
        date: "2023-05-10",
        title: "Editing Practice",
        description: "Focused on punctuation and sentence structure.",
        completed: true,
      },
      {
        id: "activity-8",
        date: "2023-05-08",
        title: "Peer Review",
        description: "Students provided feedback on each other's writing.",
        completed: true,
      },
    ],
  },
  {
    id: "group-4",
    name: "Science Explorers",
    subject: "Science",
    students: [
      {
        id: "student-13",
        name: "Mia Clark",
        avatar: "/placeholder.svg?height=32&width=32&text=MC",
        performance: 88,
      },
      {
        id: "student-14",
        name: "Alexander Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32&text=AR",
        performance: 91,
      },
      {
        id: "student-15",
        name: "Abigail Lewis",
        avatar: "/placeholder.svg?height=32&width=32&text=AL",
        performance: 86,
      },
      {
        id: "student-16",
        name: "Daniel Walker",
        avatar: "/placeholder.svg?height=32&width=32&text=DW",
        performance: 84,
      },
    ],
    schedule: "Tuesday, Thursday - 10:30 AM",
    location: "Science Lab",
    goals: [
      "Develop scientific inquiry skills",
      "Conduct hands-on experiments",
      "Learn scientific concepts through exploration",
    ],
    progress: 87,
    recentActivities: [
      {
        id: "activity-9",
        date: "2023-05-16",
        title: "Plant Growth Experiment",
        description: "Set up experiment to observe factors affecting plant growth.",
        completed: true,
      },
      {
        id: "activity-10",
        date: "2023-05-11",
        title: "Weather Patterns",
        description: "Collected and analyzed weather data.",
        completed: true,
      },
    ],
  },
]

export function SmallGroupsPage() {
  const [activeTab, setActiveTab] = useState("groups")
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()

  const filteredGroups = sampleGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Fix the handleSelectGroup function to ensure it properly sets the selected group and changes the tab
  const handleSelectGroup = (group: any) => {
    setSelectedGroup(group)
    setActiveTab("detail")
  }

  const handleDeleteGroup = (id: string) => {
    setGroupToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // In a real app, this would delete the group via an API
    setShowDeleteConfirm(false)
    setGroupToDelete(null)
    if (selectedGroup && selectedGroup.id === groupToDelete) {
      setSelectedGroup(null)
      setActiveTab("groups")
    }
  }

  // Function to get subject color
  const getSubjectColor = (subject: string) => {
    const subjectMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      Reading: {
        bg: "bg-indigo-100 dark:bg-indigo-950/50",
        text: "text-indigo-600 dark:text-indigo-300",
        border: "border-indigo-200 dark:border-indigo-800",
        gradient: "from-indigo-400 to-blue-500 dark:from-indigo-600 dark:to-blue-600",
      },
      Math: {
        bg: "bg-cyan-100 dark:bg-cyan-950/50",
        text: "text-cyan-600 dark:text-cyan-300",
        border: "border-cyan-200 dark:border-cyan-800",
        gradient: "from-cyan-400 to-blue-500 dark:from-cyan-600 dark:to-blue-600",
      },
      Writing: {
        bg: "bg-purple-100 dark:bg-purple-950/50",
        text: "text-purple-600 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
        gradient: "from-purple-400 to-indigo-500 dark:from-purple-600 dark:to-indigo-600",
      },
      Science: {
        bg: "bg-teal-100 dark:bg-teal-950/50",
        text: "text-teal-600 dark:text-teal-300",
        border: "border-teal-200 dark:border-teal-800",
        gradient: "from-teal-400 to-green-500 dark:from-teal-600 dark:to-green-600",
      },
      "Social Studies": {
        bg: "bg-amber-100 dark:bg-amber-950/50",
        text: "text-amber-600 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
        gradient: "from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-600",
      },
    }
    return (
      subjectMap[subject] || {
        bg: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-700 dark:text-gray-300",
        border: "border-gray-200 dark:border-gray-700",
        gradient: "from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700",
      }
    )
  }

  // Function to get performance color
  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700"
    if (performance >= 80) return "from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700"
    if (performance >= 70) return "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700"
    if (performance >= 60) return "from-indigo-400 to-blue-500 dark:from-indigo-500 dark:to-blue-600"
    return "from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
            Small Groups
          </h2>
          <p className="text-indigo-600 dark:text-indigo-400 mt-1">
            Create and manage small groups for targeted instruction and intervention.
          </p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-600 dark:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 text-white shadow-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Small Group
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-1 rounded-lg"
      >
        <TabsList className="grid grid-cols-3 bg-white/70 dark:bg-background/70 backdrop-blur-sm">
          <TabsTrigger
            value="groups"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-blue-600 data-[state=active]:text-white"
          >
            All Groups
          </TabsTrigger>
          <TabsTrigger
            value="detail"
            disabled={!selectedGroup}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-blue-600 data-[state=active]:text-white"
          >
            Group Details
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 dark:data-[state=active]:from-indigo-600 dark:data-[state=active]:to-blue-600 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="mt-6">
          <div className="mb-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <Input
                type="search"
                placeholder="Search groups by name or subject..."
                className="pl-8 border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="science">Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGroups.length === 0 ? (
              <Card className="col-span-full border-indigo-100 dark:border-indigo-800 shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-indigo-50 dark:from-background dark:to-indigo-950/20">
                  <div className="rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 p-4 mb-4 text-white shadow-lg">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-indigo-900 dark:text-indigo-100">No Groups Found</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-center mb-6 max-w-md">
                    {searchQuery
                      ? "No groups match your search criteria. Try a different search term."
                      : "You haven't created any small groups yet. Create your first group to get started."}
                  </p>
                  <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-600 dark:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 text-white shadow-md"
                  >
                    Create Small Group
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredGroups.map((group) => {
                const subjectColor = getSubjectColor(group.subject)
                const progressColor = getPerformanceColor(group.progress)

                return (
                  <Card
                    key={group.id}
                    className="border-indigo-100 dark:border-indigo-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-indigo-900 dark:text-indigo-100">{group.name}</CardTitle>
                          <CardDescription className="text-indigo-600 dark:text-indigo-400 mt-1">
                            {group.students.length} students • {group.subject}
                          </CardDescription>
                        </div>
                        <Badge className={cn("ml-2", subjectColor.bg, subjectColor.text, subjectColor.border)}>
                          {group.subject}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {group.students.slice(0, 5).map((student) => (
                          <Avatar key={student.id} className="h-8 w-8 border-2 border-background shadow-sm">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className={cn("bg-gradient-to-br text-white", progressColor)}>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {group.students.length > 5 && (
                          <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-medium border-2 border-background shadow-sm">
                            +{group.students.length - 5}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                          {group.schedule}
                        </div>
                        <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                          <Layers className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                          {group.location}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                            Overall Progress
                          </span>
                          <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                            {group.progress}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full bg-gradient-to-r rounded-full", progressColor)}
                            style={{ width: `${group.progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-t border-indigo-50 dark:border-indigo-900 gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                        onClick={() => handleSelectGroup(group)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-900 dark:hover:text-rose-300"
                        onClick={() => handleDeleteGroup(group.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="detail" className="mt-6">
          {selectedGroup ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center text-white shadow-md",
                      "bg-gradient-to-br",
                      getSubjectColor(selectedGroup.subject).gradient,
                    )}
                  >
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{selectedGroup.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          getSubjectColor(selectedGroup.subject).bg,
                          getSubjectColor(selectedGroup.subject).text,
                          getSubjectColor(selectedGroup.subject).border,
                        )}
                      >
                        {selectedGroup.subject}
                      </Badge>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {selectedGroup.students.length} students
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end md:self-auto">
                  <Button
                    variant="outline"
                    className="border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Group
                  </Button>
                  <Button
                    variant="outline"
                    className="border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-900 dark:hover:text-rose-300"
                    onClick={() => handleDeleteGroup(selectedGroup.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Group
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-indigo-100 dark:border-indigo-800 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900">
                    <CardTitle className="text-indigo-900 dark:text-indigo-100">Group Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-indigo-50 dark:border-indigo-900">
                      <h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Schedule & Location</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                          {selectedGroup.schedule}
                        </div>
                        <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                          <Layers className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
                          {selectedGroup.location}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b border-indigo-50 dark:border-indigo-900">
                      <h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Group Goals</h4>
                      <ul className="space-y-1 text-indigo-600 dark:text-indigo-400">
                        {selectedGroup.goals.map((goal: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 text-white flex items-center justify-center text-xs mr-2 mt-0.5 shadow-sm">
                              {index + 1}
                            </div>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Overall Progress</h4>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-indigo-600 dark:text-indigo-400">Progress toward goals</span>
                        <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                          {selectedGroup.progress}%
                        </span>
                      </div>
                      <div className="h-3 w-full bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full bg-gradient-to-r rounded-full",
                            getPerformanceColor(selectedGroup.progress),
                          )}
                          style={{ width: `${selectedGroup.progress}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-100 dark:border-indigo-800 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900">
                    <CardTitle className="text-indigo-900 dark:text-indigo-100">Students</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-indigo-50 dark:divide-indigo-900">
                      {selectedGroup.students.map((student: any) => (
                        <div
                          key={student.id}
                          className="p-3 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2 border-2 border-background shadow-sm">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback
                                  className={cn(
                                    "bg-gradient-to-br text-white",
                                    getPerformanceColor(student.performance),
                                  )}
                                >
                                  {student.name
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-indigo-900 dark:text-indigo-100 font-medium">{student.name}</div>
                            </div>
                            <div className="flex items-center">
                              <div
                                className={cn(
                                  "text-xs font-medium px-2 py-0.5 rounded-full",
                                  student.performance >= 90
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : student.performance >= 80
                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                      : student.performance >= 70
                                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                        : student.performance >= 60
                                          ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
                                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
                                )}
                              >
                                {student.performance}%
                              </div>
                            </div>
                          </div>
                          <div className="mt-1 pl-10">
                            <div className="h-1.5 w-full bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full bg-gradient-to-r rounded-full",
                                  getPerformanceColor(student.performance),
                                )}
                                style={{ width: `${student.performance}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-t border-indigo-50 dark:border-indigo-900">
                    <Button
                      variant="outline"
                      className="w-full border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="border-indigo-100 dark:border-indigo-800 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900">
                  <CardTitle className="text-indigo-900 dark:text-indigo-100">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-indigo-50 dark:divide-indigo-900">
                    {selectedGroup.recentActivities.map((activity: any) => (
                      <div
                        key={activity.id}
                        className="p-4 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-indigo-900 dark:text-indigo-100">{activity.title}</h4>
                            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{activity.description}</p>
                          </div>
                          <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(activity.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-t border-indigo-50 dark:border-indigo-900 justify-between">
                  <Button
                    variant="outline"
                    className="border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View All Activities
                  </Button>
                  <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-600 dark:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 text-white shadow-md">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card className="border-indigo-100 dark:border-indigo-800 shadow-md">
              <CardContent className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-indigo-50 dark:from-background dark:to-indigo-950/20">
                <div className="rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600 p-4 mb-4 text-white shadow-lg">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-indigo-900 dark:text-indigo-100">No Group Selected</h3>
                <p className="text-indigo-600 dark:text-indigo-400 text-center mb-6 max-w-md">
                  Select a group from the list to view its details or create a new group.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                    onClick={() => setActiveTab("groups")}
                  >
                    View All Groups
                  </Button>
                  <Button
                    onClick={() => setShowCreateDialog(true)}
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-600 dark:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 text-white shadow-md"
                  >
                    Create Small Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-indigo-100 dark:border-indigo-800 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900">
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Group Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-indigo-600 dark:text-indigo-400">Total Groups</div>
                    <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{sampleGroups.length}</div>
                  </div>
                  <Separator className="bg-indigo-50 dark:bg-indigo-900" />
                  <div className="flex items-center justify-between">
                    <div className="text-indigo-600 dark:text-indigo-400">Total Students in Groups</div>
                    <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                      {sampleGroups.reduce((acc, group) => acc + group.students.length, 0)}
                    </div>
                  </div>
                  <Separator className="bg-indigo-50 dark:bg-indigo-900" />
                  <div className="flex items-center justify-between">
                    <div className="text-indigo-600 dark:text-indigo-400">Average Group Size</div>
                    <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                      {(
                        sampleGroups.reduce((acc, group) => acc + group.students.length, 0) / sampleGroups.length
                      ).toFixed(1)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 dark:border-indigo-800 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900">
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Groups by Subject</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {["Reading", "Math", "Writing", "Science"].map((subject) => {
                    const count = sampleGroups.filter((g) => g.subject === subject).length
                    const subjectColor = getSubjectColor(subject)
                    return (
                      <div key={subject} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={cn("h-3 w-3 rounded-full mr-2", subjectColor.bg, subjectColor.border)} />
                            <span className={subjectColor.text}>{subject}</span>
                          </div>
                          <span className="font-medium text-indigo-900 dark:text-indigo-100">{count}</span>
                        </div>
                        <div className="h-2 w-full bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full bg-gradient-to-r rounded-full", subjectColor.gradient)}
                            style={{ width: `${(count / sampleGroups.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-100 dark:border-indigo-800 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900">
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {sampleGroups.map((group) => (
                    <div key={group.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div
                          className="text-sm text-indigo-600 dark:text-indigo-400 truncate"
                          style={{ maxWidth: "180px" }}
                        >
                          {group.name}
                        </div>
                        <div className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                          {group.progress}%
                        </div>
                      </div>
                      <div className="h-2 w-full bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full bg-gradient-to-r rounded-full", getPerformanceColor(group.progress))}
                          style={{ width: `${group.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3 border-indigo-100 dark:border-indigo-800 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-b border-indigo-50 dark:border-indigo-900 flex flex-row justify-between items-center">
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Student Performance</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-900 dark:hover:text-indigo-200"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Reports
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sampleGroups.flatMap((group) =>
                      group.students.slice(0, 2).map((student) => (
                        <div
                          key={`${group.id}-${student.id}`}
                          className="flex items-center p-3 rounded-lg border border-indigo-50 dark:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                        >
                          <Avatar className="h-10 w-10 mr-3 border-2 border-background shadow-sm">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback
                              className={cn("bg-gradient-to-br text-white", getPerformanceColor(student.performance))}
                            >
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-indigo-900 dark:text-indigo-100 truncate">
                              {student.name}
                            </div>
                            <div className="text-xs text-indigo-600 dark:text-indigo-400 truncate">{group.name}</div>
                            <div className="mt-1 flex items-center">
                              <div className="flex-1 h-1.5 bg-indigo-50 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full bg-gradient-to-r rounded-full",
                                    getPerformanceColor(student.performance),
                                  )}
                                  style={{ width: `${student.performance}%` }}
                                />
                              </div>
                              <span className="ml-2 text-xs font-medium text-indigo-900 dark:text-indigo-100">
                                {student.performance}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )),
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-t border-indigo-50 dark:border-indigo-900 justify-between">
                <div className="text-sm text-indigo-600 dark:text-indigo-400">
                  Showing top performers from each group
                </div>
                <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-600 dark:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 text-white shadow-md">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Performance Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md border-indigo-100 dark:border-indigo-800">
          <DialogHeader>
            <DialogTitle className="text-indigo-900 dark:text-indigo-100">Create Small Group</DialogTitle>
            <DialogDescription className="text-indigo-600 dark:text-indigo-400">
              Create a new small group for targeted instruction or intervention.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="group-name" className="text-indigo-900 dark:text-indigo-100">
                Group Name
              </Label>
              <Input
                id="group-name"
                placeholder="Enter group name"
                className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-subject" className="text-indigo-900 dark:text-indigo-100">
                Subject
              </Label>
              <Select>
                <SelectTrigger className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="social-studies">Social Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-schedule" className="text-indigo-900 dark:text-indigo-100">
                Schedule
              </Label>
              <Input
                id="group-schedule"
                placeholder="E.g., Monday, Wednesday - 10:30 AM"
                className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-location" className="text-indigo-900 dark:text-indigo-100">
                Location
              </Label>
              <Input
                id="group-location"
                placeholder="Enter location"
                className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-goals" className="text-indigo-900 dark:text-indigo-100">
                Group Goals
              </Label>
              <Textarea
                id="group-goals"
                placeholder="Enter goals, one per line"
                className="min-h-[100px] border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:focus-visible:ring-indigo-400"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              className="border-indigo-100 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowCreateDialog(false)}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 dark:from-indigo-600 dark:to-blue-600 dark:hover:from-indigo-700 dark:hover:to-blue-700 text-white shadow-md"
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="border-rose-200 dark:border-rose-900">
          <DialogHeader>
            <DialogTitle className="text-rose-900 dark:text-rose-100">Delete Group</DialogTitle>
            <DialogDescription className="text-rose-700 dark:text-rose-300">
              Are you sure you want to delete this group? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              className="border-indigo-100 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 dark:from-rose-700 dark:to-red-700 dark:hover:from-rose-800 dark:hover:to-red-800"
            >
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
