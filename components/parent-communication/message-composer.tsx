"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, PaperclipIcon, Save, Send, Trash, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for demonstration
const sampleParents = [
  {
    id: "parent-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    student: {
      id: "student-1",
      name: "Emma Johnson",
      grade: "5",
      section: "A",
    },
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
  },
  {
    id: "parent-2",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "(555) 234-5678",
    student: {
      id: "student-2",
      name: "Liam Smith",
      grade: "5",
      section: "A",
    },
    avatar: "/placeholder.svg?height=40&width=40&text=MS",
  },
  {
    id: "parent-3",
    name: "Elena Garcia",
    email: "elena.garcia@example.com",
    phone: "(555) 345-6789",
    student: {
      id: "student-3",
      name: "Sophia Garcia",
      grade: "5",
      section: "A",
    },
    avatar: "/placeholder.svg?height=40&width=40&text=EG",
  },
  {
    id: "parent-4",
    name: "David Williams",
    email: "david.williams@example.com",
    phone: "(555) 456-7890",
    student: {
      id: "student-4",
      name: "Noah Williams",
      grade: "5",
      section: "B",
    },
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
  {
    id: "parent-5",
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "(555) 567-8901",
    student: {
      id: "student-5",
      name: "Olivia Brown",
      grade: "5",
      section: "B",
    },
    avatar: "/placeholder.svg?height=40&width=40&text=RB",
  },
  {
    id: "parent-6",
    name: "Patricia Taylor",
    email: "patricia.taylor@example.com",
    phone: "(555) 678-9012",
    student: {
      id: "student-6",
      name: "Mason Taylor",
      grade: "5",
      section: "B",
    },
    avatar: "/placeholder.svg?height=40&width=40&text=PT",
  },
]

const parentGroups = [
  {
    id: "all-parents",
    name: "All Parents",
    type: "group",
  },
  {
    id: "grade-5a-parents",
    name: "Grade 5A Parents",
    type: "group",
  },
  {
    id: "grade-5b-parents",
    name: "Grade 5B Parents",
    type: "group",
  },
]

interface MessageComposerProps {
  replyTo: any | null
  onSend: (messageData: any) => void
  onCancel: () => void
  templates: any[]
}

export function MessageComposer({ replyTo, onSend, onCancel, templates }: MessageComposerProps) {
  const [recipient, setRecipient] = useState<any | null>(replyTo || null)
  const [subject, setSubject] = useState(replyTo?.subject || "")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<any[]>([])
  const [showParentSelector, setShowParentSelector] = useState(false)
  const [selectedParents, setSelectedParents] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

  useEffect(() => {
    if (replyTo?.originalMessage) {
      setContent(`\n\n\n------- Original Message -------\n${replyTo.originalMessage}`)
    }
  }, [replyTo])

  const handleSelectParent = (parentId: string) => {
    const parent = sampleParents.find((p) => p.id === parentId)
    if (parent) {
      setRecipient(parent)
      setShowParentSelector(false)
    }
  }

  const handleSelectGroup = (groupId: string) => {
    const group = parentGroups.find((g) => g.id === groupId)
    if (group) {
      setRecipient(group)
      setShowParentSelector(false)
    }
  }

  const handleToggleParent = (parentId: string) => {
    setSelectedParents((prev) => (prev.includes(parentId) ? prev.filter((id) => id !== parentId) : [...prev, parentId]))
  }

  const handleCreateGroup = () => {
    if (selectedParents.length === 0 && !selectedGroup) return

    if (selectedGroup) {
      handleSelectGroup(selectedGroup)
    } else {
      // Create a custom group from selected parents
      const selectedParentObjects = sampleParents.filter((parent) => selectedParents.includes(parent.id))
      const customGroup = {
        id: `custom-group-${Date.now()}`,
        name: `Custom Group (${selectedParentObjects.length})`,
        type: "group",
        members: selectedParentObjects,
      }
      setRecipient(customGroup)
    }
    setShowParentSelector(false)
  }

  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSubject(template.subject)
      setContent(template.content)
      setShowTemplateSelector(false)
    }
  }

  const handleSendMessage = () => {
    if (!recipient || !subject || !content) return

    const messageData = {
      to: recipient,
      subject,
      content,
      attachments,
      replyToId: replyTo?.id,
    }

    onSend(messageData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type,
        url: "#", // In a real app, this would be a URL to the uploaded file
      }))
      setAttachments([...attachments, ...newFiles])
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full border-amber-200 shadow-md">
      <CardHeader className="border-b border-amber-200 bg-amber-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-amber-800">{replyTo ? "Reply to Message" : "Compose New Message"}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-amber-800">
              To
            </Label>
            {recipient ? (
              <div className="flex items-center justify-between border border-amber-200 rounded-md p-2 bg-amber-50">
                <div className="flex items-center">
                  {recipient.avatar ? (
                    <Avatar className="h-8 w-8 mr-2 border border-amber-200">
                      <AvatarImage src={recipient.avatar} alt={recipient.name} />
                      <AvatarFallback className="bg-amber-100 text-amber-800">
                        {recipient.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-amber-900">{recipient.name}</div>
                    {recipient.student && (
                      <div className="text-xs text-amber-600">
                        Parent of {recipient.student.name} (Grade {recipient.student.grade})
                      </div>
                    )}
                    {recipient.type === "group" && (
                      <div className="flex items-center">
                        <Badge variant="outline" className="text-xs border-amber-300 text-amber-700 bg-amber-50">
                          Group
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowParentSelector(true)}
                  className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                >
                  Change
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-800"
                onClick={() => setShowParentSelector(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Select Recipient
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-amber-800">
              Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              className="border-amber-200 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content" className="text-amber-800">
                Message
              </Label>
              <Dialog open={showTemplateSelector} onOpenChange={setShowTemplateSelector}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                  >
                    Use Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-amber-200">
                  <DialogHeader>
                    <DialogTitle className="text-amber-800">Select Message Template</DialogTitle>
                    <DialogDescription className="text-amber-600">
                      Choose a template to use for your message.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="border border-amber-200 rounded-md p-3 cursor-pointer hover:bg-amber-50 transition-colors"
                        onClick={() => handleApplyTemplate(template.id)}
                      >
                        <div className="font-medium text-amber-800">{template.title}</div>
                        <div className="text-sm text-amber-600">{template.subject}</div>
                        <Badge variant="outline" className="mt-2 text-xs border-amber-300 text-amber-700 bg-amber-50">
                          {template.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowTemplateSelector(false)}
                      className="border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[200px] border-amber-200 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-amber-800">Attachments</Label>
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-amber-200 rounded-md p-2 bg-amber-50"
                >
                  <div className="flex items-center">
                    <PaperclipIcon className="h-4 w-4 mr-2 text-amber-600" />
                    <div>
                      <div className="text-sm font-medium text-amber-800">{file.name}</div>
                      <div className="text-xs text-amber-600">{file.size}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-700 hover:text-red-600 hover:bg-amber-100"
                    onClick={() => handleRemoveAttachment(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center">
                <Input type="file" id="file-upload" className="hidden" multiple onChange={handleFileChange} />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button
                    variant="outline"
                    type="button"
                    className="mr-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                  >
                    <PaperclipIcon className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                </Label>
                <span className="text-xs text-amber-600">
                  {attachments.length > 0 ? `${attachments.length} files attached` : "No files attached"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-amber-200 flex justify-between bg-amber-50">
        <Button variant="outline" onClick={onCancel} className="border-amber-300 text-amber-700 hover:bg-amber-100">
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!recipient || !subject || !content}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </CardFooter>

      <Dialog open={showParentSelector} onOpenChange={setShowParentSelector}>
        <DialogContent className="max-w-2xl bg-white border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-amber-800">Select Recipients</DialogTitle>
            <DialogDescription className="text-amber-600">
              Choose individual parents or groups to send your message to.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block text-amber-800">Parent Groups</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {parentGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedGroup === group.id}
                      onCheckedChange={() => {
                        setSelectedGroup(selectedGroup === group.id ? "" : group.id)
                        setSelectedParents([])
                      }}
                      className="border-amber-300 text-amber-600 focus:ring-amber-500"
                    />
                    <Label htmlFor={`group-${group.id}`} className="cursor-pointer text-amber-700">
                      {group.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-amber-200 pt-4">
              <Label className="text-sm font-medium mb-2 block text-amber-800">Individual Parents</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                {sampleParents.map((parent) => (
                  <div key={parent.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`parent-${parent.id}`}
                      checked={selectedParents.includes(parent.id)}
                      onCheckedChange={() => {
                        handleToggleParent(parent.id)
                        setSelectedGroup("")
                      }}
                      className="border-amber-300 text-amber-600 focus:ring-amber-500"
                    />
                    <Label htmlFor={`parent-${parent.id}`} className="cursor-pointer flex items-center">
                      <Avatar className="h-6 w-6 mr-2 border border-amber-200">
                        <AvatarImage src={parent.avatar} alt={parent.name} />
                        <AvatarFallback className="bg-amber-100 text-amber-800">
                          {parent.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-amber-800">{parent.name}</div>
                        <div className="text-xs text-amber-600">
                          {parent.student.name} (Grade {parent.student.grade})
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-amber-200 pt-4">
              <Label className="text-sm font-medium mb-2 block text-amber-800">Quick Select</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedParents(sampleParents.filter((p) => p.student.section === "A").map((p) => p.id))
                    setSelectedGroup("")
                  }}
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  All Section A Parents
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedParents(sampleParents.filter((p) => p.student.section === "B").map((p) => p.id))
                    setSelectedGroup("")
                  }}
                  className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                  All Section B Parents
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowParentSelector(false)}
              className="border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateGroup}
              disabled={selectedParents.length === 0 && !selectedGroup}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Select Recipients
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
