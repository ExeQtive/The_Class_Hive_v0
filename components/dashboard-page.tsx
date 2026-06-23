"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  UserCog,
  BrainCircuit,
  Sparkles,
  User,
  Moon,
  Sun,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import Link from "next/link"
import { LessonPlanningPage } from "@/components/lesson-planning/lesson-planning-page"
import { TaskManagementPage } from "@/components/task-management/task-management-page"
import { ResourceLibraryPage } from "@/components/resource-library/resource-library-page"
import { StudentManagementPage } from "@/components/student-management/student-management-page"
import { ParentCommunicationPage } from "@/components/parent-communication/parent-communication-page"
import { SmallGroupsPage } from "@/components/small-groups/small-groups-page"
import { AIAssistantPage } from "@/components/ai-assistant/ai-assistant-page"

// Sidebar Item Component
function SidebarItem({ icon, title, isActive, isCollapsed, isChildItem = false, onClick }) {
  return (
    <button
      className={cn(
        "flex items-center gap-x-2 py-2 px-3 rounded-md text-muted-foreground hover:text-foreground transition-all duration-200 w-full text-left",
        isActive && "bg-primary/10 text-primary font-medium shadow-sm dark:bg-primary/20",
        isChildItem && "pl-10",
        !isCollapsed && "w-full justify-start",
        isActive ? "hover:bg-primary/15 dark:hover:bg-primary/25" : "hover:bg-muted/80",
      )}
      onClick={onClick}
    >
      {icon}
      {!isCollapsed && <span className={isActive ? "animate-pulse-slow" : ""}>{title}</span>}
    </button>
  )
}

// Sidebar Section Component
function SidebarSection({ title, isCollapsed, children }) {
  return (
    <div className="space-y-1">
      {!isCollapsed && <div className="pl-3 text-xs font-medium text-muted-foreground py-2">{title}</div>}
      {children}
    </div>
  )
}

function DashboardCard({ title, value, description, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Math Test - Grade 5",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "10:00 AM",
      type: "assessment",
      description: "Chapter 7 test on fractions and decimals",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: "3:30 PM",
      type: "meeting",
      description: "Meeting with Emma's parents to discuss progress",
    },
    {
      id: 3,
      title: "Science Fair Preparation",
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      time: "1:15 PM",
      type: "class",
      description: "Help students finalize their science fair projects",
    },
    {
      id: 4,
      title: "Staff Meeting",
      date: new Date(new Date().setDate(new Date().getDate())),
      time: "8:00 AM",
      type: "meeting",
      description: "Weekly staff meeting in the conference room",
    },
    {
      id: 5,
      title: "Field Trip - Museum",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: "9:00 AM",
      type: "event",
      description: "Class field trip to the Natural History Museum",
    },
  ])
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "",
    type: "class",
    description: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showTasksInCalendar, setShowTasksInCalendar] = useState(true)

  // Task management state
  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      title: "Grade Math Quizzes",
      description: "Grade the 5th grade math quizzes from Monday's assessment.",
      dueDate: format(new Date(new Date().setDate(new Date().getDate() + 3)), "yyyy-MM-dd"),
      priority: "high",
      status: "todo",
      category: "grading",
    },
    {
      id: "task-2",
      title: "Prepare Science Lesson",
      description: "Create lesson plan for the states of matter unit.",
      dueDate: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
      priority: "medium",
      status: "in-progress",
      category: "lesson-planning",
    },
    {
      id: "task-3",
      title: "Update Student Records",
      description: "Update attendance and grades in the school system.",
      dueDate: format(new Date(new Date().setDate(new Date().getDate() + 4)), "yyyy-MM-dd"),
      priority: "low",
      status: "todo",
      category: "administrative",
    },
  ])
  const [taskView, setTaskView] = useState("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")

  // Student management state
  const [students, setStudents] = useState([
    {
      id: "student-1",
      firstName: "Emma",
      lastName: "Johnson",
      gender: "female",
      grade: "5",
      section: "A",
      dateOfBirth: "2013-05-12",
      guardianName: "Sarah Johnson",
      guardianEmail: "sarah.johnson@example.com",
      guardianPhone: "(555) 123-4567",
      address: "123 Maple Street, Springfield, IL 62701",
      allergies: "None",
      emergencyContact: "John Johnson, (555) 987-6543",
      notes: "Excels in math and science. Participates actively in class discussions.",
      avatar: "/placeholder.svg?height=128&width=128&text=EJ",
      attendance: {
        present: 42,
        absent: 2,
        tardy: 3,
        total: 47,
      },
      performance: {
        math: 92,
        science: 88,
        reading: 85,
        writing: 87,
        socialStudies: 90,
      },
    },
    {
      id: "student-2",
      firstName: "Liam",
      lastName: "Smith",
      gender: "male",
      grade: "5",
      section: "A",
      dateOfBirth: "2013-07-18",
      guardianName: "Michael Smith",
      guardianEmail: "michael.smith@example.com",
      guardianPhone: "(555) 234-5678",
      address: "456 Oak Avenue, Springfield, IL 62702",
      allergies: "Peanuts",
      emergencyContact: "Jennifer Smith, (555) 876-5432",
      notes: "Strong in language arts. Needs additional support in mathematics.",
      avatar: "/placeholder.svg?height=128&width=128&text=LS",
      attendance: {
        present: 45,
        absent: 1,
        tardy: 1,
        total: 47,
      },
      performance: {
        math: 78,
        science: 82,
        reading: 94,
        writing: 91,
        socialStudies: 85,
      },
    },
    {
      id: "student-3",
      firstName: "Sophia",
      lastName: "Garcia",
      gender: "female",
      grade: "5",
      section: "A",
      dateOfBirth: "2013-02-24",
      guardianName: "Elena Garcia",
      guardianEmail: "elena.garcia@example.com",
      guardianPhone: "(555) 345-6789",
      address: "789 Pine Lane, Springfield, IL 62703",
      allergies: "Dairy",
      emergencyContact: "Carlos Garcia, (555) 765-4321",
      notes: "Bilingual (English/Spanish). Enjoys art and music activities.",
      avatar: "/placeholder.svg?height=128&width=128&text=SG",
      attendance: {
        present: 44,
        absent: 3,
        tardy: 0,
        total: 47,
      },
      performance: {
        math: 85,
        science: 87,
        reading: 88,
        writing: 90,
        socialStudies: 92,
      },
    },
  ])
  const [studentView, setStudentView] = useState("grid")
  const [studentSearchQuery, setStudentSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Resource library state
  const [resources, setResources] = useState([
    {
      id: "resource-1",
      title: "Fractions Worksheet Bundle",
      description: "A comprehensive set of worksheets covering all fraction operations for grades 4-5.",
      type: "worksheet",
      format: "pdf",
      subject: "Math",
      gradeLevel: ["4", "5"],
      tags: ["fractions", "operations", "printable"],
      thumbnail: "/placeholder.svg?height=400&width=600&text=Fractions+Worksheet",
      url: "#",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2023-04-15",
      downloads: 128,
      favorites: 42,
      isFavorite: true,
    },
    {
      id: "resource-2",
      title: "States of Matter Interactive Presentation",
      description: "An engaging presentation with animations and interactive elements about the states of matter.",
      type: "presentation",
      format: "pptx",
      subject: "Science",
      gradeLevel: ["5"],
      tags: ["states of matter", "interactive", "slides"],
      thumbnail: "/placeholder.svg?height=400&width=600&text=States+of+Matter",
      url: "#",
      uploadedBy: "Michael Chen",
      uploadDate: "2023-03-22",
      downloads: 95,
      favorites: 31,
      isFavorite: false,
    },
    {
      id: "resource-3",
      title: "American Revolution Timeline Activity",
      description:
        "A collaborative timeline activity for students to understand the key events of the American Revolution.",
      type: "activity",
      format: "docx",
      subject: "Social Studies",
      gradeLevel: ["5"],
      tags: ["american revolution", "timeline", "collaborative"],
      thumbnail: "/placeholder.svg?height=400&width=600&text=Revolution+Timeline",
      url: "#",
      uploadedBy: "Emma Wilson",
      uploadDate: "2023-05-02",
      downloads: 76,
      favorites: 18,
      isFavorite: true,
    },
  ])
  const [resourceView, setResourceView] = useState("grid")
  const [resourceSearchQuery, setResourceSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [gradeLevelFilter, setGradeLevelFilter] = useState("all")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)

  // AI Assistant state
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI teaching assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isAILoading, setIsAILoading] = useState(false)
  const [activeAITab, setActiveAITab] = useState("chat")

  // Prevent hydration errors by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calendar helpers
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const handlePreviousWeek = () => {
    setCurrentDate(subDays(currentDate, 7))
  }

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }

  const handleAddEvent = () => {
    const newEventWithId = {
      ...newEvent,
      id: events.length + 1,
      date: selectedDate || new Date(),
    }
    setEvents([...events, newEventWithId])
    setNewEvent({
      title: "",
      date: new Date(),
      time: "",
      type: "class",
      description: "",
    })
    setIsAddEventOpen(false)
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case "class":
        return "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200"
      case "assessment":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
      case "event":
        return "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200"
      case "task":
        return "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
    }
  }

  // Get tasks for a specific day
  const getTasksForDay = (day) => {
    if (!showTasksInCalendar) return []

    const dateString = format(day, "yyyy-MM-dd")
    return tasks.filter((task) => task.dueDate === dateString)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-background border-r flex flex-col h-full transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[240px]",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-3 py-6 flex items-center justify-center">
            <div className={cn("transition-all duration-300", isCollapsed ? "w-10 h-10" : "w-full")}>
              {isCollapsed ? (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600 flex items-center justify-center text-white">
                  <GraduationCap className="h-5 w-5 icon-bounce" />
                </div>
              ) : (
                <div className="flex items-center gap-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600 text-white p-3 rounded-xl">
                  <GraduationCap className="h-6 w-6 icon-bounce" />
                  <span className="text-xl font-bold">TheClassHive</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4 flex-1 px-3 py-3 overflow-y-auto">
            <SidebarSection title="Overview" isCollapsed={isCollapsed}>
              <SidebarItem
                icon={
                  <LayoutDashboard
                    className={cn("h-4 w-4", activePage === "dashboard" && "text-teal-500 dark:text-teal-400")}
                  />
                }
                title="Dashboard"
                isActive={activePage === "dashboard"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("dashboard")}
              />
              <SidebarItem
                icon={
                  <Calendar
                    className={cn("h-4 w-4", activePage === "calendar" && "text-cyan-500 dark:text-cyan-400")}
                  />
                }
                title="Calendar"
                isActive={activePage === "calendar"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("calendar")}
              />
            </SidebarSection>

            <SidebarSection title="Planning & Content" isCollapsed={isCollapsed}>
              <SidebarItem
                icon={
                  <BookOpen
                    className={cn("h-4 w-4", activePage === "lesson-planning" && "text-teal-500 dark:text-teal-400")}
                  />
                }
                title="Lesson Planning"
                isActive={activePage === "lesson-planning"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("lesson-planning")}
              />
              <SidebarItem
                icon={
                  <ClipboardList
                    className={cn("h-4 w-4", activePage === "task-management" && "text-amber-500 dark:text-amber-400")}
                  />
                }
                title="Task Management"
                isActive={activePage === "task-management"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("task-management")}
              />
              <SidebarItem
                icon={
                  <FolderOpen
                    className={cn("h-4 w-4", activePage === "resource-library" && "text-cyan-500 dark:text-cyan-400")}
                  />
                }
                title="Resource Library"
                isActive={activePage === "resource-library"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("resource-library")}
              />
              <SidebarItem
                icon={
                  <FolderOpen
                    className={cn("h-4 w-4", activePage === "file-management" && "text-cyan-500 dark:text-cyan-400")}
                  />
                }
                title="File Management"
                isActive={activePage === "file-management"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("file-management")}
              />
            </SidebarSection>

            <SidebarSection title="Students & Communication" isCollapsed={isCollapsed}>
              <SidebarItem
                icon={
                  <Users
                    className={cn("h-4 w-4", activePage === "student-management" && "text-pink-500 dark:text-pink-400")}
                  />
                }
                title="Student Management"
                isActive={activePage === "student-management"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("student-management")}
              />
              <SidebarItem
                icon={
                  <UserCog
                    className={cn("h-4 w-4", activePage === "iep-management" && "text-purple-500 dark:text-purple-400")}
                  />
                }
                title="IEP Management"
                isActive={activePage === "iep-management"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("iep-management")}
              />
              <SidebarItem
                icon={
                  <MessageSquare
                    className={cn(
                      "h-4 w-4",
                      activePage === "parent-communication" && "text-teal-500 dark:text-teal-400",
                    )}
                  />
                }
                title="Parent Communication"
                isActive={activePage === "parent-communication"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("parent-communication")}
              />
              <SidebarItem
                icon={
                  <Users
                    className={cn("h-4 w-4", activePage === "small-groups" && "text-amber-500 dark:text-amber-400")}
                  />
                }
                title="Small Groups"
                isActive={activePage === "small-groups"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("small-groups")}
              />
            </SidebarSection>

            <SidebarSection title="AI Tools" isCollapsed={isCollapsed}>
              <SidebarItem
                icon={
                  <BrainCircuit
                    className={cn("h-4 w-4", activePage === "ai-assistant" && "text-cyan-500 dark:text-cyan-400")}
                  />
                }
                title="AI Assistant"
                isActive={activePage === "ai-assistant"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("ai-assistant")}
              />
              <SidebarItem
                icon={
                  <Sparkles
                    className={cn("h-4 w-4", activePage === "premium-features" && "text-pink-500 dark:text-pink-400")}
                  />
                }
                title="Premium Features"
                isActive={activePage === "premium-features"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("premium-features")}
              />
            </SidebarSection>

            <SidebarSection title="System" isCollapsed={isCollapsed}>
              <SidebarItem
                icon={
                  <Settings
                    className={cn("h-4 w-4", activePage === "settings" && "text-purple-500 dark:text-purple-400")}
                  />
                }
                title="Settings"
                isActive={activePage === "settings"}
                isCollapsed={isCollapsed}
                onClick={() => setActivePage("settings")}
              />
            </SidebarSection>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-gradient-to-r from-background to-cyan-50/30 dark:from-background dark:to-cyan-950/10">
          <div className="flex items-center gap-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
            >
              <ChevronDown
                className={cn("h-5 w-5 transition-all text-primary", isCollapsed ? "-rotate-90" : "rotate-0")}
              />
            </Button>
            <div>
              <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400">
                {activePage === "dashboard"
                  ? "Dashboard"
                  : activePage === "calendar"
                    ? "Calendar"
                    : activePage === "lesson-planning"
                      ? "Lesson Planning"
                      : activePage === "task-management"
                        ? "Task Management"
                        : activePage === "resource-library"
                          ? "Resource Library"
                          : activePage === "student-management"
                            ? "Student Management"
                            : activePage === "parent-communication"
                              ? "Parent Communication"
                              : activePage === "small-groups"
                                ? "Small Groups"
                                : activePage === "ai-assistant"
                                  ? "AI Assistant"
                                  : activePage === "premium-features"
                                    ? "Premium Features"
                                    : activePage === "iep-management"
                                      ? "IEP Management"
                                      : activePage === "settings"
                                        ? "Settings"
                                        : activePage === "profile"
                                          ? "Profile"
                                          : ""}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-900/50"
            >
              <Sparkles className="h-4 w-4 mr-1 text-amber-500 dark:text-amber-400" />
              <Link href="/pricing">Upgrade</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10 p-0 overflow-hidden border-2 border-teal-200 hover:border-teal-300 dark:border-teal-800 dark:hover:border-teal-700"
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                      TC
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 p-2">
                <div className="flex items-center gap-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                      TC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Teacher Name</span>
                    <span className="text-xs text-muted-foreground">teacher@school.edu</span>
                  </div>
                </div>
                <div className="h-px bg-border my-2"></div>
                <DropdownMenuItem
                  onClick={() => setActivePage("profile")}
                  className="rounded-lg cursor-pointer flex items-center p-2 gap-x-2 text-sm"
                >
                  <User className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActivePage("settings")}
                  className="rounded-lg cursor-pointer flex items-center p-2 gap-x-2 text-sm"
                >
                  <Settings className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <div className="h-px bg-border my-2"></div>
                <DropdownMenuItem className="rounded-lg cursor-pointer flex items-center p-2 gap-x-2 text-sm">
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-background to-cyan-50/30 dark:from-background dark:to-cyan-950/10">
          {mounted && (
            <>
              {activePage === "dashboard" && (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <DashboardCard
                      title="Upcoming Lessons"
                      value="3"
                      description="Lessons scheduled this week"
                      icon={<Calendar className="h-5 w-5 text-teal-500" />}
                    />
                    <DashboardCard
                      title="Active Students"
                      value="24"
                      description="Students in your classes"
                      icon={<Users className="h-5 w-5 text-pink-500" />}
                    />
                    <DashboardCard
                      title="Pending Tasks"
                      value="7"
                      description="Tasks to complete"
                      icon={<ClipboardList className="h-5 w-5 text-amber-500" />}
                    />
                    <DashboardCard
                      title="Resources"
                      value="18"
                      description="Available teaching materials"
                      icon={<FolderOpen className="h-5 w-5 text-cyan-500" />}
                    />
                  </div>

                  <Tabs defaultValue="tasks" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                      <TabsTrigger value="lessons">Lessons</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tasks" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Tasks</CardTitle>
                          <CardDescription>Tasks that need your attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div>
                                  <p className="text-sm font-medium">Grade Math Quizzes</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Due Today
                                  </div>
                                </div>
                              </div>
                              <Badge variant="destructive">High</Badge>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div>
                                  <p className="text-sm font-medium">Prepare Science Lesson</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Due Tomorrow
                                  </div>
                                </div>
                              </div>
                              <Badge>Medium</Badge>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                              <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <div>
                                  <p className="text-sm font-medium">Update Student Records</p>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Due May 16
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">Low</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="messages" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Messages</CardTitle>
                          <CardDescription>Messages from parents</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40&text=SJ" />
                                <AvatarFallback>SJ</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">Sarah Johnson</p>
                                  <span className="text-xs text-muted-foreground">2h ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Will Tommy be able to make up the missed quiz?
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40&text=MC" />
                                <AvatarFallback>MC</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">Michael Chen</p>
                                  <span className="text-xs text-muted-foreground">Yesterday</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Thank you for the feedback on Lily's project.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40&text=AG" />
                                <AvatarFallback>AG</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">Amanda Garcia</p>
                                  <span className="text-xs text-muted-foreground">2d ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Can we schedule a meeting to discuss Kevin's progress?
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="lessons" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Lessons</CardTitle>
                          <CardDescription>Access your lesson plans and materials</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-800">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Fractions Introduction</p>
                                  <p className="text-sm text-muted-foreground">Math • 4th Grade</p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">May 10</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-800">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">States of Matter</p>
                                  <p className="text-sm text-muted-foreground">Science • 4th Grade</p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">May 8</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-800">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-primary mr-3" />
                                <div>
                                  <p className="font-medium">Poetry Analysis</p>
                                  <p className="text-sm text-muted-foreground">Language Arts • 4th Grade</p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">May 5</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Calendar Page */}
              {activePage === "calendar" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
                        Calendar
                      </h2>
                      <p className="text-muted-foreground">Manage your schedule and events</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-sm font-medium">
                        {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
                      </div>
                      <Button variant="outline" size="icon" onClick={handleNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 flex items-center">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Event
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Event</DialogTitle>
                            <DialogDescription>Create a new event on your calendar.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="title">Event Title</Label>
                              <Input
                                id="title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                placeholder="Enter event title"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label>Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !selectedDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <CalendarComponent
                                      mode="single"
                                      selected={selectedDate}
                                      onSelect={setSelectedDate}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                  id="time"
                                  value={newEvent.time}
                                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                  placeholder="e.g. 3:30 PM"
                                />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="type">Event Type</Label>
                              <Select
                                value={newEvent.type}
                                onChange={(value) => setNewEvent({ ...newEvent, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="class">Class</SelectItem>
                                  <SelectItem value="assessment">Assessment</SelectItem>
                                  <SelectItem value="meeting">Meeting</SelectItem>
                                  <SelectItem value="event">Special Event</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                placeholder="Add details about this event"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
                              onClick={handleAddEvent}
                            >
                              Add Event
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="flex items-center justify-end mb-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="show-tasks" className="text-sm">
                        Show Tasks
                      </Label>
                      <Switch id="show-tasks" checked={showTasksInCalendar} onCheckedChange={setShowTasksInCalendar} />
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-4">
                    {days.map((day, index) => {
                      const isToday = isSameDay(day, new Date())
                      const isWeekend = day.getDay() === 0 || day.getDay() === 6
                      return (
                        <div key={index} className="text-center">
                          <div className="font-medium text-sm mb-1">{format(day, "EEE")}</div>
                          <div
                            className={cn(
                              "rounded-full w-8 h-8 mx-auto flex items-center justify-center text-sm",
                              isToday && "bg-teal-500 text-white",
                            )}
                          >
                            {format(day, "d")}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-7 gap-4">
                    {days.map((day, index) => (
                      <Card key={index} className="min-h-[200px] transition-all hover:shadow-md flex flex-col">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm font-medium">{format(day, "MMMM d")}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 flex-grow">
                          <div className="space-y-2">
                            {events
                              .filter((event) => isSameDay(event.date, day))
                              .map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "p-2 rounded-md border text-xs transition-all cursor-pointer",
                                    getEventTypeColor(event.type),
                                  )}
                                >
                                  <div className="font-medium">{event.title}</div>
                                  <div className="text-xs opacity-80">{event.time}</div>
                                </div>
                              ))}

                            {showTasksInCalendar &&
                              getTasksForDay(day).map((task) => (
                                <div
                                  key={task.id}
                                  className={cn(
                                    "p-2 rounded-md border text-xs transition-all cursor-pointer",
                                    getTaskPriorityColor(task.priority),
                                  )}
                                >
                                  <div className="flex items-center">
                                    <CheckSquare className="h-3 w-3 mr-1 flex-shrink-0" />
                                    <div className="font-medium truncate">{task.title}</div>
                                  </div>
                                  <div className="text-xs opacity-80">Task Due</div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-2 mt-auto">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50 flex items-center justify-center"
                            onClick={() => {
                              setSelectedDate(day)
                              setIsAddEventOpen(true)
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Lesson Planning Page */}
              {activePage === "lesson-planning" && <LessonPlanningPage />}

              {/* Task Management Page */}
              {activePage === "task-management" && <TaskManagementPage />}

              {/* Resource Library Page */}
              {activePage === "resource-library" && <ResourceLibraryPage />}

              {/* Student Management Page */}
              {activePage === "student-management" && <StudentManagementPage />}

              {/* Parent Communication Page */}
              {activePage === "parent-communication" && <ParentCommunicationPage />}

              {/* Small Groups Page */}
              {activePage === "small-groups" && <SmallGroupsPage />}

              {/* AI Assistant Page */}
              {activePage === "ai-assistant" && <AIAssistantPage />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function TaskItem({ title, dueDate, priority }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50 dark:bg-red-950/30"
      case "Medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30"
      case "Low":
        return "text-green-500 bg-green-50 dark:bg-green-950/30"
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-800/30"
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-800">
      <div className="flex items-center">
        <CheckSquare className="h-5 w-5 text-primary mr-3" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
        </div>
      </div>
      <span className={cn("text-xs font-medium rounded-full px-2 py-1", getPriorityColor(priority))}>{priority}</span>
    </div>
  )
}

function MessageItem({ sender, preview, time }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-800">
      <div className="flex items-center">
        <MessageSquare className="h-5 w-5 text-primary mr-3" />
        <div>
          <p className="font-medium">{sender}</p>
          <p className="text-sm text-muted-foreground">{preview}</p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  )
}

function LessonItem({ title, subject, grade, date }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-800">
      <div className="flex items-center">
        <BookOpen className="h-5 w-5 text-primary mr-3" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">
            {subject} • {grade}
          </p>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{date}</span>
    </div>
  )
}
