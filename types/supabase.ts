export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string | null
          subject: string | null
          grade_level: string | null
          duration: number | null
          objectives: string[] | null
          materials: string[] | null
          procedure: string | null
          assessment: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          subject?: string | null
          grade_level?: string | null
          duration?: number | null
          objectives?: string[] | null
          materials?: string[] | null
          procedure?: string | null
          assessment?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          subject?: string | null
          grade_level?: string | null
          duration?: number | null
          objectives?: string[] | null
          materials?: string[] | null
          procedure?: string | null
          assessment?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: "todo" | "in-progress" | "completed"
          priority: "low" | "medium" | "high"
          due_date: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: "todo" | "in-progress" | "completed"
          priority?: "low" | "medium" | "high"
          due_date?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: "todo" | "in-progress" | "completed"
          priority?: "low" | "medium" | "high"
          due_date?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          description: string | null
          type: string | null
          url: string | null
          file_path: string | null
          tags: string[] | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type?: string | null
          url?: string | null
          file_path?: string | null
          tags?: string[] | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: string | null
          url?: string | null
          file_path?: string | null
          tags?: string[] | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          grade: string | null
          notes: string | null
          has_iep: boolean
          teacher_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email?: string | null
          grade?: string | null
          notes?: string | null
          has_iep?: boolean
          teacher_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          grade?: string | null
          notes?: string | null
          has_iep?: boolean
          teacher_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
