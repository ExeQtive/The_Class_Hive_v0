"use client"

import { useState } from "react"
import { Filter, Grid, List, Search, SortAsc, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentGrid } from "@/components/student-management/student-grid"
import { StudentList } from "@/components/student-management/student-list"
import { StudentDetail } from "@/components/student-management/student-detail"
import { StudentForm } from "@/components/student-management/student-form"
import { StudentAttendance } from "@/components/student-management/student-attendance"
import { StudentGroups } from "@/components/student-management/student-groups"
import { StudentPerformance } from "@/components/student-management/student-performance"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Add these animation keyframes
const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
}

const slideIn = {
  from: { transform: "translateY(10px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
}

// Sample data for demonstration
const sampleStudents = [
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
    groups: ["Reading Group A", "Math Advanced"],
    behavior: [
      {
        date: "2023-04-15",
        type: "positive",
        note: "Helped a classmate understand a difficult math concept.",
      },
      {
        date: "2023-03-22",
        type: "concern",
        note: "Had difficulty focusing during afternoon lessons.",
      },
    ],
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
    groups: ["Reading Group A"],
    behavior: [
      {
        date: "2023-04-10",
        type: "positive",
        note: "Excellent creative writing assignment.",
      },
    ],
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
    groups: ["Art Club", "ESL Support"],
    behavior: [
      {
        date: "2023-04-05",
        type: "positive",
        note: "Created an outstanding art project.",
      },
    ],
  },
  {
    id: "student-4",
    firstName: "Noah",
    lastName: "Williams",
    gender: "male",
    grade: "5",
    section: "B",
    dateOfBirth: "2013-09-30",
    guardianName: "David Williams",
    guardianEmail: "david.williams@example.com",
    guardianPhone: "(555) 456-7890",
    address: "101 Cedar Court, Springfield, IL 62704",
    allergies: "None",
    emergencyContact: "Lisa Williams, (555) 654-3210",
    notes: "Athletic and energetic. Excels in physical education and science.",
    avatar: "/placeholder.svg?height=128&width=128&text=NW",
    attendance: {
      present: 40,
      absent: 5,
      tardy: 2,
      total: 47,
    },
    performance: {
      math: 83,
      science: 91,
      reading: 79,
      writing: 76,
      socialStudies: 81,
    },
    groups: ["Science Club", "Sports Team"],
    behavior: [
      {
        date: "2023-03-15",
        type: "concern",
        note: "Talking during quiet work time.",
      },
      {
        date: "2023-04-12",
        type: "positive",
        note: "Great teamwork during science project.",
      },
    ],
  },
  {
    id: "student-5",
    firstName: "Olivia",
    lastName: "Brown",
    gender: "female",
    grade: "5",
    section: "B",
    dateOfBirth: "2013-11-05",
    guardianName: "Robert Brown",
    guardianEmail: "robert.brown@example.com",
    guardianPhone: "(555) 567-8901",
    address: "202 Birch Street, Springfield, IL 62705",
    allergies: "Bee stings (EpiPen in nurse's office)",
    emergencyContact: "Mary Brown, (555) 543-2109",
    notes: "Quiet but insightful. Enjoys reading and creative writing.",
    avatar: "/placeholder.svg?height=128&width=128&text=OB",
    attendance: {
      present: 46,
      absent: 1,
      tardy: 0,
      total: 47,
    },
    performance: {
      math: 88,
      science: 85,
      reading: 96,
      writing: 94,
      socialStudies: 89,
    },
    groups: ["Reading Group A", "Writing Club"],
    behavior: [
      {
        date: "2023-04-18",
        type: "positive",
        note: "Wrote an exceptional creative story.",
      },
    ],
  },
  {
    id: "student-6",
    firstName: "Mason",
    lastName: "Taylor",
    gender: "male",
    grade: "5",
    section: "B",
    dateOfBirth: "2013-01-15",
    guardianName: "Patricia Taylor",
    guardianEmail: "patricia.taylor@example.com",
    guardianPhone: "(555) 678-9012",
    address: "303 Elm Road, Springfield, IL 62706",
    allergies: "None",
    emergencyContact: "James Taylor, (555) 432-1098",
    notes: "Interested in technology and coding. Needs support with organization.",
    avatar: "/placeholder.svg?height=128&width=128&text=MT",
    attendance: {
      present: 41,
      absent: 4,
      tardy: 2,
      total: 47,
    },
    performance: {
      math: 90,
      science: 89,
      reading: 82,
      writing: 78,
      socialStudies: 80,
    },
    groups: ["Math Advanced", "Coding Club"],
    behavior: [
      {
        date: "2023-03-10",
        type: "concern",
        note: "Missing homework assignments.",
      },
      {
        date: "2023-04-08",
        type: "positive",
        note: "Created an impressive coding project.",
      },
    ],
  },
  {
    id: "student-7",
    firstName: "Ava",
    lastName: "Miller",
    gender: "female",
    grade: "5",
    section: "A",
    dateOfBirth: "2013-06-22",
    guardianName: "Thomas Miller",
    guardianEmail: "thomas.miller@example.com",
    guardianPhone: "(555) 789-0123",
    address: "404 Walnut Place, Springfield, IL 62707",
    allergies: "Shellfish",
    emergencyContact: "Susan Miller, (555) 321-0987",
    notes: "Natural leader. Helps organize class activities and supports peers.",
    avatar: "/placeholder.svg?height=128&width=128&text=AM",
    attendance: {
      present: 47,
      absent: 0,
      tardy: 0,
      total: 47,
    },
    performance: {
      math: 91,
      science: 90,
      reading: 93,
      writing: 92,
      socialStudies: 94,
    },
    groups: ["Student Council", "Reading Group A"],
    behavior: [
      {
        date: "2023-04-20",
        type: "positive",
        note: "Helped organize class Earth Day project.",
      },
    ],
  },
  {
    id: "student-8",
    firstName: "Ethan",
    lastName: "Anderson",
    gender: "male",
    grade: "5",
    section: "B",
    dateOfBirth: "2013-03-08",
    guardianName: "Karen Anderson",
    guardianEmail: "karen.anderson@example.com",
    guardianPhone: "(555) 890-1234",
    address: "505 Spruce Avenue, Springfield, IL 62708",
    allergies: "None",
    emergencyContact: "Mark Anderson, (555) 210-9876",
    notes: "Curious and inquisitive. Asks thoughtful questions during lessons.",
    avatar: "/placeholder.svg?height=128&width=128&text=EA",
    attendance: {
      present: 43,
      absent: 2,
      tardy: 2,
      total: 47,
    },
    performance: {
      math: 87,
      science: 93,
      reading: 84,
      writing: 82,
      socialStudies: 86,
    },
    groups: ["Science Club"],
    behavior: [
      {
        date: "2023-03-25",
        type: "positive",
        note: "Asked insightful questions during science lesson.",
      },
    ],
  },
  {
    id: "student-9",
    firstName: "Isabella",
    lastName: "Martinez",
    gender: "female",
    grade: "5",
    section: "A",
    dateOfBirth: "2013-08-14",
    guardianName: "Luis Martinez",
    guardianEmail: "luis.martinez@example.com",
    guardianPhone: "(555) 901-2345",
    address: "606 Aspen Circle, Springfield, IL 62709",
    allergies: "Pollen (seasonal)",
    emergencyContact: "Maria Martinez, (555) 109-8765",
    notes: "Creative and artistic. Enjoys group projects and collaborative work.",
    avatar: "/placeholder.svg?height=128&width=128&text=IM",
    attendance: {
      present: 44,
      absent: 2,
      tardy: 1,
      total: 47,
    },
    performance: {
      math: 84,
      science: 86,
      reading: 89,
      writing: 91,
      socialStudies: 88,
    },
    groups: ["Art Club", "Reading Group B"],
    behavior: [
      {
        date: "2023-04-02",
        type: "positive",
        note: "Excellent collaboration during group project.",
      },
    ],
  },
  {
    id: "student-10",
    firstName: "James",
    lastName: "Wilson",
    gender: "male",
    grade: "5",
    section: "B",
    dateOfBirth: "2013-10-20",
    guardianName: "Elizabeth Wilson",
    guardianEmail: "elizabeth.wilson@example.com",
    guardianPhone: "(555) 012-3456",
    address: "707 Redwood Drive, Springfield, IL 62710",
    allergies: "None",
    emergencyContact: "Richard Wilson, (555) 098-7654",
    notes: "Enjoys history and social studies. Needs encouragement with math.",
    avatar: "/placeholder.svg?height=128&width=128&text=JW",
    attendance: {
      present: 39,
      absent: 6,
      tardy: 2,
      total: 47,
    },
    performance: {
      math: 75,
      science: 80,
      reading: 83,
      writing: 81,
      socialStudies: 95,
    },
    groups: ["Reading Group B", "History Club"],
    behavior: [
      {
        date: "2023-03-18",
        type: "concern",
        note: "Reluctant to participate in math activities.",
      },
      {
        date: "2023-04-14",
        type: "positive",
        note: "Excellent presentation on historical figure.",
      },
    ],
  },
  {
    id: "student-11",
    firstName: "Mia",
    lastName: "Thompson",
    gender: "female",
    grade: "5",
    section: "A",
    dateOfBirth: "2013-04-03",
    guardianName: "William Thompson",
    guardianEmail: "william.thompson@example.com",
    guardianPhone: "(555) 123-4567",
    address: "808 Sequoia Lane, Springfield, IL 62711",
    allergies: "Gluten",
    emergencyContact: "Nancy Thompson, (555) 987-6543",
    notes: "Enthusiastic about learning. Particularly enjoys science experiments.",
    avatar: "/placeholder.svg?height=128&width=128&text=MT",
    attendance: {
      present: 45,
      absent: 1,
      tardy: 1,
      total: 47,
    },
    performance: {
      math: 89,
      science: 94,
      reading: 87,
      writing: 85,
      socialStudies: 83,
    },
    groups: ["Science Club", "Math Advanced"],
    behavior: [
      {
        date: "2023-04-16",
        type: "positive",
        note: "Great enthusiasm during science experiment.",
      },
    ],
  },
  {
    id: "student-12",
    firstName: "Benjamin",
    lastName: "Lee",
    gender: "male",
    grade: "5",
    section: "A",
    dateOfBirth: "2013-12-10",
    guardianName: "Jennifer Lee",
    guardianEmail: "jennifer.lee@example.com",
    guardianPhone: "(555) 234-5678",
    address: "909 Cypress Street, Springfield, IL 62712",
    allergies: "None",
    emergencyContact: "Daniel Lee, (555) 876-5432",
    notes: "Quiet but hardworking. Excels in individual assignments.",
    avatar: "/placeholder.svg?height=128&width=128&text=BL",
    attendance: {
      present: 46,
      absent: 1,
      tardy: 0,
      total: 47,
    },
    performance: {
      math: 95,
      science: 92,
      reading: 88,
      writing: 86,
      socialStudies: 84,
    },
    groups: ["Math Advanced", "Chess Club"],
    behavior: [
      {
        date: "2023-03-30",
        type: "positive",
        note: "Perfect score on math assessment.",
      },
    ],
  },
]

// Sample student groups
const sampleGroups = [
  {
    id: "group-1",
    name: "Reading Group A",
    description: "Advanced reading group focusing on chapter books and literary analysis",
    students: ["student-1", "student-2", "student-5", "student-7"],
    meetingTime: "Mondays and Wednesdays, 10:00 AM",
    notes: "Currently reading 'The Lion, the Witch and the Wardrobe'",
  },
  {
    id: "group-2",
    name: "Reading Group B",
    description: "Reading group focusing on comprehension and vocabulary building",
    students: ["student-9", "student-10"],
    meetingTime: "Mondays and Wednesdays, 10:00 AM",
    notes: "Working on reading fluency and comprehension strategies",
  },
  {
    id: "group-3",
    name: "Math Advanced",
    description: "Advanced math group for students ready for challenging concepts",
    students: ["student-1", "student-6", "student-11", "student-12"],
    meetingTime: "Tuesdays and Thursdays, 9:30 AM",
    notes: "Currently working on pre-algebra concepts",
  },
  {
    id: "group-4",
    name: "Science Club",
    description: "Extracurricular group for students interested in science experiments and projects",
    students: ["student-4", "student-8", "student-11"],
    meetingTime: "Fridays, 2:30 PM",
    notes: "Preparing for the science fair next month",
  },
  {
    id: "group-5",
    name: "Art Club",
    description: "Creative arts group exploring various media and techniques",
    students: ["student-3", "student-9"],
    meetingTime: "Tuesdays, 2:30 PM",
    notes: "Currently working on watercolor landscapes",
  },
  {
    id: "group-6",
    name: "ESL Support",
    description: "English language support for multilingual students",
    students: ["student-3"],
    meetingTime: "Mondays and Thursdays, 11:00 AM",
    notes: "Focusing on academic vocabulary and writing skills",
  },
  {
    id: "group-7",
    name: "Student Council",
    description: "Student leadership group planning school events and initiatives",
    students: ["student-7"],
    meetingTime: "Fridays, 1:00 PM",
    notes: "Planning the end-of-year celebration",
  },
  {
    id: "group-8",
    name: "Writing Club",
    description: "Creative writing group for students interested in storytelling and poetry",
    students: ["student-5"],
    meetingTime: "Wednesdays, 2:30 PM",
    notes: "Working on personal narrative writing",
  },
  {
    id: "group-9",
    name: "Coding Club",
    description: "Introduction to computer programming and computational thinking",
    students: ["student-6"],
    meetingTime: "Thursdays, 2:30 PM",
    notes: "Learning Scratch programming basics",
  },
  {
    id: "group-10",
    name: "History Club",
    description: "Exploring historical events and figures through projects and discussions",
    students: ["student-10"],
    meetingTime: "Wednesdays, 1:00 PM",
    notes: "Researching local history for upcoming field trip",
  },
  {
    id: "group-11",
    name: "Chess Club",
    description: "Learning chess strategies and playing matches",
    students: ["student-12"],
    meetingTime: "Tuesdays, 12:00 PM (lunch)",
    notes: "Preparing for interschool chess tournament",
  },
  {
    id: "group-12",
    name: "Sports Team",
    description: "School sports team practicing various athletic activities",
    students: ["student-4"],
    meetingTime: "Mondays and Fridays, 3:00 PM",
    notes: "Training for track and field events",
  },
]

export function StudentManagementPage() {
  const [view, setView] = useState<"grid" | "list" | "detail" | "form" | "attendance" | "groups" | "performance">(
    "grid",
  )
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid")
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [sectionFilter, setSectionFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [groupFilter, setGroupFilter] = useState("all")
  const [sortBy, setSortBy] = useState("lastName")
  const [students, setStudents] = useState(sampleStudents)
  const [groups, setGroups] = useState(sampleGroups)

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      student.guardianName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter
    const matchesSection = sectionFilter === "all" || student.section === sectionFilter
    const matchesGender = genderFilter === "all" || student.gender === genderFilter
    const matchesGroup = groupFilter === "all" || (student.groups && student.groups.includes(groupFilter))

    return matchesSearch && matchesGrade && matchesSection && matchesGender && matchesGroup
  })

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "lastName") {
      return a.lastName.localeCompare(b.lastName)
    } else if (sortBy === "firstName") {
      return a.firstName.localeCompare(b.firstName)
    } else if (sortBy === "grade") {
      return a.grade.localeCompare(b.grade) || a.lastName.localeCompare(b.lastName)
    } else if (sortBy === "attendance") {
      return (b.attendance.present / b.attendance.total) * 100 - (a.attendance.present / a.attendance.total) * 100
    } else if (sortBy === "performance") {
      const aAvg =
        (a.performance.math +
          a.performance.science +
          a.performance.reading +
          a.performance.writing +
          a.performance.socialStudies) /
        5
      const bAvg =
        (b.performance.math +
          b.performance.science +
          b.performance.reading +
          b.performance.writing +
          b.performance.socialStudies) /
        5
      return bAvg - aAvg
    } else {
      return 0
    }
  })

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student)
    setView("detail")
  }

  const handleAddStudent = () => {
    setSelectedStudent(null)
    setView("form")
  }

  const handleEditStudent = (student: any) => {
    setSelectedStudent(student)
    setView("form")
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter((student) => student.id !== studentId))

    // Also remove student from any groups
    setGroups(
      groups.map((group) => ({
        ...group,
        students: group.students.filter((id) => id !== studentId),
      })),
    )

    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent(null)
      setView(displayMode)
    }
  }

  const handleSaveStudent = (student: any) => {
    // In a real app, this would save to a database
    const isNewStudent = !student.id || student.id.startsWith("new-")

    if (isNewStudent) {
      // Add new student
      const newStudent = {
        ...student,
        id: `student-${Date.now()}`,
        attendance: {
          present: 0,
          absent: 0,
          tardy: 0,
          total: 0,
        },
        performance: {
          math: 0,
          science: 0,
          reading: 0,
          writing: 0,
          socialStudies: 0,
        },
        groups: [],
        behavior: [],
      }
      setStudents([...students, newStudent])
    } else {
      // Update existing student
      setStudents(students.map((s) => (s.id === student.id ? { ...s, ...student } : s)))
    }

    setView(displayMode)
    setSelectedStudent(null)
  }

  const handleSaveGroups = (updatedGroups: any[]) => {
    setGroups(updatedGroups)

    // Update student group memberships
    const studentGroupMap: Record<string, string[]> = {}

    // Initialize with empty arrays for all students
    students.forEach((student) => {
      studentGroupMap[student.id] = []
    })

    // Fill in group memberships
    updatedGroups.forEach((group) => {
      group.students.forEach((studentId: string) => {
        if (studentGroupMap[studentId]) {
          studentGroupMap[studentId].push(group.name)
        }
      })
    })

    // Update students with new group memberships
    setStudents(
      students.map((student) => ({
        ...student,
        groups: studentGroupMap[student.id] || [],
      })),
    )

    setView(displayMode)
  }

  const handleUpdateAttendance = (updatedStudents: any[]) => {
    setStudents(
      students.map((student) => {
        const updatedStudent = updatedStudents.find((s) => s.id === student.id)
        return updatedStudent ? { ...student, attendance: updatedStudent.attendance } : student
      }),
    )
    setView(displayMode)
  }

  const handleUpdatePerformance = (updatedStudents: any[]) => {
    setStudents(
      students.map((student) => {
        const updatedStudent = updatedStudents.find((s) => s.id === student.id)
        return updatedStudent ? { ...student, performance: updatedStudent.performance } : student
      }),
    )
    setView(displayMode)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setGradeFilter("all")
    setSectionFilter("all")
    setGenderFilter("all")
    setGroupFilter("all")
  }

  const handleBackToStudents = () => {
    setSelectedStudent(null)
    setView(displayMode)
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-90"></div>
        <div className="relative z-10 px-6 py-8 text-white">
          <h2 className="text-3xl font-bold tracking-tight">Student Management</h2>
          <p className="text-white/80 mt-2">Manage student information, groups, and performance.</p>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
          <div className="w-64 h-64 rounded-full bg-white opacity-10"></div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="grid"
          className="w-full"
          value={view === "detail" || view === "form" ? displayMode : view}
          onValueChange={(value) => {
            if (value === "grid" || value === "list") {
              setDisplayMode(value as "grid" | "list")
            }
            setView(value as any)
          }}
        >
          <TabsList className="bg-gradient-to-r from-teal-100/50 to-cyan-100/50 p-1 rounded-xl">
            <TabsTrigger
              value="grid"
              className={cn(
                "flex items-center transition-all duration-200",
                view === "grid" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className={cn(
                "flex items-center transition-all duration-200",
                view === "list" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              className={cn(
                "transition-all duration-200",
                view === "attendance" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className={cn(
                "transition-all duration-200",
                view === "performance" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="groups"
              className={cn(
                "transition-all duration-200",
                view === "groups" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              Groups
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          onClick={handleAddStudent}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      {(view === "grid" || view === "list") && (
        <div className="flex flex-col md:flex-row gap-4 items-start bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-100 mb-4 animate-fadeIn">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
            <Input
              placeholder="Search students..."
              className="pl-8 border-teal-200 focus-visible:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Students</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Grade</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setGradeFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", gradeFilter === "all" ? "bg-primary/10" : "")}>
                      All Grades
                    </Badge>
                  </DropdownMenuItem>
                  {["5"].map((grade) => (
                    <DropdownMenuItem key={grade} onClick={() => setGradeFilter(grade)}>
                      <Badge variant="outline" className={cn("mr-2", gradeFilter === grade ? "bg-primary/10" : "")}>
                        Grade {grade}
                      </Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Section</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSectionFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", sectionFilter === "all" ? "bg-primary/10" : "")}>
                      All Sections
                    </Badge>
                  </DropdownMenuItem>
                  {["A", "B"].map((section) => (
                    <DropdownMenuItem key={section} onClick={() => setSectionFilter(section)}>
                      <Badge variant="outline" className={cn("mr-2", sectionFilter === section ? "bg-primary/10" : "")}>
                        Section {section}
                      </Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Gender</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setGenderFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", genderFilter === "all" ? "bg-primary/10" : "")}>
                      All
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGenderFilter("male")}>
                    <Badge variant="outline" className={cn("mr-2", genderFilter === "male" ? "bg-primary/10" : "")}>
                      Male
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGenderFilter("female")}>
                    <Badge variant="outline" className={cn("mr-2", genderFilter === "female" ? "bg-primary/10" : "")}>
                      Female
                    </Badge>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Group</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setGroupFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", groupFilter === "all" ? "bg-primary/10" : "")}>
                      All Groups
                    </Badge>
                  </DropdownMenuItem>
                  {groups.map((group) => (
                    <DropdownMenuItem key={group.id} onClick={() => setGroupFilter(group.name)}>
                      <Badge
                        variant="outline"
                        className={cn("mr-2", groupFilter === group.name ? "bg-primary/10" : "")}
                      >
                        {group.name}
                      </Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <Button variant="ghost" size="sm" className="w-full justify-center" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("lastName")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "lastName" ? "bg-primary/10" : "")}>
                    Last Name
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("firstName")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "firstName" ? "bg-primary/10" : "")}>
                    First Name
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("grade")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "grade" ? "bg-primary/10" : "")}>
                    Grade
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("attendance")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "attendance" ? "bg-primary/10" : "")}>
                    Attendance
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("performance")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "performance" ? "bg-primary/10" : "")}>
                    Performance
                  </Badge>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchQuery ||
              gradeFilter !== "all" ||
              sectionFilter !== "all" ||
              genderFilter !== "all" ||
              groupFilter !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {view === "grid" && (
        <StudentGrid
          students={sortedStudents}
          onView={handleViewStudent}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      )}

      {view === "list" && (
        <StudentList
          students={sortedStudents}
          onView={handleViewStudent}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      )}

      {view === "attendance" && (
        <StudentAttendance students={students} onSave={handleUpdateAttendance} onCancel={handleBackToStudents} />
      )}

      {view === "performance" && (
        <StudentPerformance students={students} onSave={handleUpdatePerformance} onCancel={handleBackToStudents} />
      )}

      {view === "groups" && (
        <StudentGroups groups={groups} students={students} onSave={handleSaveGroups} onCancel={handleBackToStudents} />
      )}

      {view === "detail" && selectedStudent && (
        <StudentDetail
          student={selectedStudent}
          groups={groups.filter((group) => selectedStudent.groups.includes(group.name))}
          onBack={handleBackToStudents}
          onEdit={() => handleEditStudent(selectedStudent)}
          onDelete={handleDeleteStudent}
        />
      )}

      {view === "form" && (
        <StudentForm student={selectedStudent} onSave={handleSaveStudent} onCancel={handleBackToStudents} />
      )}
    </div>
  )
}
