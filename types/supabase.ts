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
          user_id: string
          first_name: string
          last_name: string
          gender: string | null
          grade: string | null
          section: string | null
          date_of_birth: string | null
          guardian_name: string | null
          guardian_email: string | null
          guardian_phone: string | null
          address: string | null
          allergies: string | null
          emergency_contact: string | null
          notes: string | null
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          gender?: string | null
          grade?: string | null
          section?: string | null
          date_of_birth?: string | null
          guardian_name?: string | null
          guardian_email?: string | null
          guardian_phone?: string | null
          address?: string | null
          allergies?: string | null
          emergency_contact?: string | null
          notes?: string | null
          avatar?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string
          last_name?: string
          gender?: string | null
          grade?: string | null
          section?: string | null
          date_of_birth?: string | null
          guardian_name?: string | null
          guardian_email?: string | null
          guardian_phone?: string | null
          address?: string | null
          allergies?: string | null
          emergency_contact?: string | null
          notes?: string | null
          avatar?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ieps: {
        Row: {
          id: string
          user_id: string
          student_id: string
          start_date: string
          review_date: string
          end_date: string
          status: string
          primary_disability: string | null
          accommodations: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          student_id: string
          start_date: string
          review_date: string
          end_date: string
          status?: string
          primary_disability?: string | null
          accommodations?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          student_id?: string
          start_date?: string
          review_date?: string
          end_date?: string
          status?: string
          primary_disability?: string | null
          accommodations?: Json
          created_at?: string
          updated_at?: string
        }
      }
      iep_goals: {
        Row: {
          id: string
          iep_id: string
          area: string
          description: string
          objective: string
          progress: number
          last_updated: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          iep_id: string
          area: string
          description: string
          objective: string
          progress?: number
          last_updated?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          iep_id?: string
          area?: string
          description?: string
          objective?: string
          progress?: number
          last_updated?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
