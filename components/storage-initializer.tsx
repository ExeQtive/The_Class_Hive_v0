"use client"

import { useEffect, useState } from "react"

export function StorageInitializer() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          return
        }

        const response = await fetch("/api/storage-setup")
        if (!response.ok) return

        const data = await response.json()
        if (data.success) {
          setInitialized(true)
        }
      } catch {
        // Storage setup is optional for Sprint 0 — fail silently
      }
    }

    initializeStorage()
  }, [])

  return null
}