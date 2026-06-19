// Mock data for development and preview

export const mockUsers = [
  {
    id: "user1",
    name: "Demo Teacher",
    email: "teacher@example.com",
    role: "teacher",
    subscriptionPlan: "pro",
    isLifetimeMember: false,
    aiCreditsRemaining: 25,
    trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
  {
    id: "user2",
    name: "Premium User",
    email: "premium@example.com",
    role: "teacher",
    subscriptionPlan: "school",
    isLifetimeMember: true,
    aiCreditsRemaining: 999,
    trialEndsAt: null,
  },
]

export const mockStudents = [
  {
    id: "student1",
    firstName: "Alex",
    lastName: "Johnson",
    grade: "5",
    section: "A",
    userId: "user1",
  },
  {
    id: "student2",
    firstName: "Maya",
    lastName: "Williams",
    grade: "5",
    section: "A",
    userId: "user1",
  },
  // Add more mock students as needed
]

export const mockLessons = [
  {
    id: "lesson1",
    title: "Introduction to Fractions",
    subject: "Math",
    grade: "5",
    duration: "45 minutes",
    date: new Date(2023, 5, 15),
    status: "published",
    objectives: ["Understand basic fractions", "Compare fractions"],
    userId: "user1",
  },
  // Add more mock lessons as needed
]

export const mockTasks = [
  {
    id: "task1",
    title: "Grade Math Tests",
    description: "Review and grade the recent math assessments",
    dueDate: new Date(2023, 5, 20),
    priority: "high",
    status: "todo",
    category: "Grading",
    userId: "user1",
  },
  // Add more mock tasks as needed
]

export const mockResources = [
  {
    id: "resource1",
    title: "Fraction Worksheets",
    description: "Printable worksheets for practicing fractions",
    type: "document",
    url: "/mock/resources/fractions.pdf",
    category: "Math",
    tags: ["fractions", "worksheets", "grade 5"],
    userId: "user1",
  },
  // Add more mock resources as needed
]

// Mock function to simulate database operations
export function getMockData(type: string, userId: string) {
  switch (type) {
    case "students":
      return mockStudents.filter((student) => student.userId === userId)
    case "lessons":
      return mockLessons.filter((lesson) => lesson.userId === userId)
    case "tasks":
      return mockTasks.filter((task) => task.userId === userId)
    case "resources":
      return mockResources.filter((resource) => resource.userId === userId)
    default:
      return []
  }
}

// Mock function to simulate user authentication
export function getMockUser(email: string) {
  return mockUsers.find((user) => user.email === email) || null
}
