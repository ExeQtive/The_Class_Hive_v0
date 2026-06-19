"use client"

import { useState } from "react"

type AIRequestType = "lesson-plan" | "email" | "behavior" | "differentiation" | "experiment" | "assignment" | "rubric"

interface UseAIAssistantProps {
  onSuccess?: (result: string) => void
  onError?: (error: string) => void
}

export function useAIAssistant({ onSuccess, onError }: UseAIAssistantProps = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [creditsRemaining, setCreditsRemaining] = useState<number | "unlimited" | null>(null)

  const generateContent = async (prompt: string, type: AIRequestType) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          type,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content")
      }

      setResult(data.result)
      setCreditsRemaining(data.creditsRemaining)

      if (onSuccess) {
        onSuccess(data.result)
      }

      return data.result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)

      if (onError) {
        onError(errorMessage)
      }

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    generateContent,
    isLoading,
    result,
    error,
    creditsRemaining,
  }
}
