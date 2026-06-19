"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function StorageInitializer() {
  const { toast } = useToast()
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        // Check if Supabase environment variables are available
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.warn("Supabase environment variables not found. Storage features will be disabled.")
          setError("Supabase configuration missing")
          return
        }

        const response = await fetch("/api/storage-setup")

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API returned ${response.status}: ${errorText}`)
        }

        const data = await response.json()

        if (!data.success) {
          console.error("Failed to initialize storage:", data.error)
          setError(data.error || "Unknown error")
          toast({
            title: "Storage initialization failed",
            description: "There was an error setting up file storage. Some upload features may not work.",
            variant: "destructive",
          })
          return
        }

        setInitialized(true)
        setError(null)
        console.log("Storage buckets initialized:", data.buckets)
      } catch (error) {
        console.error("Error initializing storage:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
        toast({
          title: "Storage initialization failed",
          description: "There was an error setting up file storage. Some features may not work.",
          variant: "destructive",
        })
      }
    }

    initializeStorage()
  }, [toast])

  // This component doesn't render anything visible
  return null
}
