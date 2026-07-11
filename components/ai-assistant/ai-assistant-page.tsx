// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, ChevronRight, Copy, Loader2, Send, Sparkles, User, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { useAIAssistant } from "./use-ai-assistant"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Sample prompts for quick access
const samplePrompts = [
  "Create a math lesson plan for 5th grade on fractions",
  "Generate a reading comprehension assignment for Charlotte's Web",
  "Design a rubric for a history presentation",
  "Create a differentiated instruction plan for multiplication",
  "Suggest classroom behavior management strategies",
  "Draft a weekly update email to parents",
  "Provide differentiation strategies for mixed-ability classrooms",
  "Design a science experiment about states of matter",
]

export function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI teaching assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [activeTab, setActiveTab] = useState<"chat" | "templates">("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { generateContent, isLoading, error, creditsRemaining } = useAIAssistant({
    onSuccess: (result) => {
      // Show toast for remaining credits if not unlimited
      if (creditsRemaining !== "unlimited" && typeof creditsRemaining === "number") {
        toast({
          title: `${creditsRemaining} AI credits remaining`,
          description:
            creditsRemaining <= 5
              ? "Consider upgrading your plan for unlimited AI assistance."
              : "You can continue using AI assistance.",
        })
      }
    },
    onError: (errorMessage) => {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Determine the type of request based on input content
    let type: any = "chat"
    const inputLower = input.toLowerCase()

    if (inputLower.includes("lesson plan") || inputLower.includes("teach")) {
      type = "lesson-plan"
    } else if (inputLower.includes("assignment") || inputLower.includes("homework")) {
      type = "assignment"
    } else if (inputLower.includes("rubric") || inputLower.includes("grading")) {
      type = "rubric"
    } else if (inputLower.includes("differentiat")) {
      type = "differentiation"
    } else if (inputLower.includes("behavior") || inputLower.includes("classroom management")) {
      type = "behavior"
    } else if (inputLower.includes("parent") || inputLower.includes("email")) {
      type = "email"
    } else if (inputLower.includes("science") || inputLower.includes("experiment")) {
      type = "experiment"
    }

    // Generate content using the AI assistant
    const result = await generateContent(input, type)

    if (result) {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: result,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleUsePrompt = (prompt: string) => {
    setInput(prompt)
    setActiveTab("chat")
  }

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    })
  }

  // Convert markdown-like syntax to formatted HTML
  const formatMessage = (content: string) => {
    // If the content doesn't contain markdown, return as is
    if (!content.includes("#") && !content.includes("*") && !content.includes("-")) {
      return <p>{content}</p>
    }

    // Split by lines and process
    const lines = content.split("\n")
    const formattedLines = lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-xl font-bold mt-4 mb-2">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-lg font-bold mt-3 mb-2">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-base font-bold mt-2 mb-1">
            {line.substring(4)}
          </h3>
        )
      }

      // List items
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4">
            {line.substring(2)}
          </li>
        )
      }
      if (line.match(/^\d+\. /)) {
        const content = line.replace(/^\d+\. /, "")
        return (
          <li key={index} className="ml-4 list-decimal">
            {content}
          </li>
        )
      }

      // Empty line
      if (line.trim() === "") {
        return <br key={index} />
      }

      // Regular paragraph
      return (
        <p key={index} className="my-1">
          {line}
        </p>
      )
    })

    return <div>{formattedLines}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Teaching Assistant</h2>
        <p className="text-muted-foreground">Get help with lesson planning, classroom management, and more.</p>
      </div>

      {typeof creditsRemaining === "number" && creditsRemaining <= 5 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription>
            You have <strong>{creditsRemaining} AI credits</strong> remaining. Consider upgrading to our Pro plan for
            unlimited AI assistance.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
              Lesson Plan Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create detailed, standards-aligned lesson plans for any subject and grade level in seconds.
            </p>
            <Button
              variant="link"
              className="text-blue-600 p-0 h-auto mt-2 text-sm"
              onClick={() => handleUsePrompt("Create a lesson plan for 4th grade on ecosystems")}
            >
              Try an example →
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
              Assignment Creation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate engaging assignments, worksheets, and assessments tailored to your curriculum needs.
            </p>
            <Button
              variant="link"
              className="text-purple-600 p-0 h-auto mt-2 text-sm"
              onClick={() => handleUsePrompt("Create a math worksheet on fractions for 5th grade")}
            >
              Try an example →
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "templates")}>
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="templates">Quick Prompts</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "chat" ? (
        <Card className="flex flex-col h-[calc(100vh-300px)] min-h-[500px]">
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 p-4 rounded-lg",
                    message.role === "assistant" ? "bg-muted/50" : "bg-primary/5",
                  )}
                >
                  <Avatar className="h-8 w-8">
                    {message.role === "assistant" ? (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" alt="AI assistant avatar" />
                        <AvatarFallback>
                          <Bot className="h-5 w-5" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" alt="Your avatar" />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopyToClipboard(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="text-sm">{formatMessage(message.content)}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 p-4 rounded-lg bg-muted/50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" alt="AI assistant avatar" />
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center space-x-2">
              <Textarea
                placeholder="Ask for lesson plans, classroom management tips, parent communication help..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-h-[60px] max-h-[200px]"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Quick Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {samplePrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleUsePrompt(prompt)}
                >
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    <span>{prompt}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pro Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Pro
                </Badge>
                <span>Unlimited AI Credits</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/request-early-access")}>
                Upgrade
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Pro
                </Badge>
                <span>Student-specific Differentiation Strategies</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/request-early-access")}>
                Upgrade
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  Pro
                </Badge>
                <span>Custom Assessment Creation</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/request-early-access")}>
                Upgrade
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
