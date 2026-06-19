import { mockUsers, mockStudents, mockLessons, mockTasks, mockResources } from "./mock-data"

// Mock implementation of database operations
export const db = {
  user: {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) {
        return mockUsers.find((user) => user.id === where.id) || null
      }
      if (where.email) {
        return mockUsers.find((user) => user.email === where.email) || null
      }
      return null
    },
    findMany: async () => {
      return mockUsers
    },
    create: async ({ data }: { data: any }) => {
      // In a real implementation, this would create a new user
      return { ...data, id: `user${mockUsers.length + 1}` }
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      // In a real implementation, this would update a user
      const user = mockUsers.find((user) => user.id === where.id)
      if (!user) return null
      return { ...user, ...data }
    },
  },
  student: {
    findMany: async ({ where }: { where: { userId: string } }) => {
      return mockStudents.filter((student) => student.userId === where.userId)
    },
    create: async ({ data }: { data: any }) => {
      return { ...data, id: `student${mockStudents.length + 1}` }
    },
  },
  lesson: {
    findMany: async ({ where }: { where: { userId: string } }) => {
      return mockLessons.filter((lesson) => lesson.userId === where.userId)
    },
    create: async ({ data }: { data: any }) => {
      return { ...data, id: `lesson${mockLessons.length + 1}` }
    },
  },
  task: {
    findMany: async ({ where }: { where: { userId: string } }) => {
      return mockTasks.filter((task) => task.userId === where.userId)
    },
    create: async ({ data }: { data: any }) => {
      return { ...data, id: `task${mockTasks.length + 1}` }
    },
  },
  resource: {
    findMany: async ({ where }: { where: { userId: string } }) => {
      return mockResources.filter((resource) => resource.userId === where.userId)
    },
    create: async ({ data }: { data: any }) => {
      return { ...data, id: `resource${mockResources.length + 1}` }
    },
  },
  aiUsageLog: {
    create: async ({ data }: { data: any }) => {
      return { ...data, id: `log${Date.now()}` }
    },
  },
}
