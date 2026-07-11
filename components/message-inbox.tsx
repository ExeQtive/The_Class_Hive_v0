// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { ArrowLeft, DownloadCloud, Reply, Trash } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  from: {
    id: string
    name: string
    avatar: string
    email: string
    student?: {
      name: string
    }
  }
  to: {
    name: string
    email: string
  }
  subject: string
  content: string
  date: Date
  read: boolean
  labels?: string[]
  attachments?: any[]
}

interface MessageInboxProps {
  messages: Message[]
  onReplyToMessage: (message: Message) => void
}

const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffDays = Math.floor(diff / (1000 * 3600 * 24))

  if (diffDays < 1) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: "short" })
  } else {
    return date.toLocaleDateString()
  }
}

const formatFullDate = (date: Date) => {
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function MessageInbox({ messages, onReplyToMessage }: MessageInboxProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null)

  const onSelectMessage = (message: Message | null) => {
    setSelectedMessage(message)
  }

  if (selectedMessage) {
    return (
      <>
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b flex items-center">
          <Button variant="ghost" size="sm" className="mr-2 hover:bg-white/50" onClick={() => onSelectMessage(null)}>
            <ArrowLeft className="h-4 w-4 text-purple-500" />
          </Button>
          <div className="font-medium">{selectedMessage.subject}</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-3 mt-1 ring-2 ring-primary/20">
                <AvatarImage
                  src={
                    selectedMessage.from.id !== "teacher-1"
                      ? selectedMessage.from.avatar
                      : "/placeholder.svg?height=40&width=40"
                  }
                  alt={selectedMessage.from.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  {selectedMessage.from.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">
                  {selectedMessage.from.id !== "teacher-1" ? selectedMessage.from.name : "Me"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedMessage.from.id !== "teacher-1" && selectedMessage.from.student
                    ? `Parent of ${selectedMessage.from.student.name}`
                    : "Teacher"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  To: {selectedMessage.to.name || selectedMessage.to.email}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{formatFullDate(selectedMessage.date)}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReplyToMessage(selectedMessage)}
                className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:bg-purple-100"
              >
                <Reply className="h-4 w-4 mr-1 text-purple-500" />
                Reply
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive bg-red-50 border-red-200 hover:bg-red-100"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="whitespace-pre-wrap p-4 rounded-lg bg-white border animate-fade-in">
            {selectedMessage.content}
          </div>

          {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <div className="font-medium mb-2">Attachments</div>
                <div className="flex flex-wrap gap-2">
                  {selectedMessage.attachments.map((attachment: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center border rounded-md p-2 bg-gradient-to-r from-cyan-50 to-teal-50 hover:from-cyan-100 hover:to-teal-100 transition-colors cursor-pointer"
                    >
                      <DownloadCloud className="h-4 w-4 mr-2 text-cyan-500" />
                      <div>
                        <div className="text-sm">{attachment.name}</div>
                        <div className="text-xs text-muted-foreground">{attachment.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <CardFooter className="border-t p-3 bg-gradient-to-r from-purple-50 to-pink-50">
          <Button
            variant="default"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors"
            onClick={() => onReplyToMessage(selectedMessage)}
          >
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </CardFooter>
      </>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "border-b last:border-b-0 p-3 cursor-pointer transition-all duration-200",
            selectedMessage?.id === message.id ? "bg-primary/10" : "hover:bg-muted/50",
            !message.read && "bg-primary/5",
            hoveredMessageId === message.id && "shadow-md",
          )}
          onClick={() => onSelectMessage(message)}
          onMouseEnter={() => setHoveredMessageId(message.id)}
          onMouseLeave={() => setHoveredMessageId(null)}
        >
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center">
              <Avatar className={cn("h-8 w-8 mr-2", !message.read && "ring-2 ring-primary/50")}>
                <AvatarImage
                  src={message.from.id !== "teacher-1" ? message.from.avatar : "/placeholder.svg?height=32&width=32"}
                  alt={message.from.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  {message.from.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className={cn("font-medium", !message.read && "font-bold")}>
                  {message.from.id !== "teacher-1" ? message.from.name : "Me"}
                </div>
                {message.from.id !== "teacher-1" && message.from.student && (
                  <div className="text-xs text-muted-foreground">Parent of {message.from.student.name}</div>
                )}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{formatDate(message.date)}</div>
          </div>
          <div className={cn("text-sm mb-1 line-clamp-1", !message.read && "font-medium")}>{message.subject}</div>
          <div className="text-xs text-muted-foreground line-clamp-1">{message.content}</div>
          <div className="flex mt-2 gap-1">
            {message.labels &&
              message.labels.map((label: string) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="text-xs px-1 py-0 h-5 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                >
                  {label}
                </Badge>
              ))}
            {message.attachments && message.attachments.length > 0 && (
              <Badge
                variant="outline"
                className="text-xs px-1 py-0 h-5 bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200"
              >
                <DownloadCloud className="h-3 w-3 mr-1 text-cyan-500" />
                {message.attachments.length}
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
