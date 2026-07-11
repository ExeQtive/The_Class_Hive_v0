// @ts-nocheck
// @ts-nocheck
"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Inbox, PaperclipIcon, Send, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

export default function EmailBasedCommunication() {
  const [activeTab, setActiveTab] = useState<"messages" | "announcements" | "conferences">("messages")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [recipientType, setRecipientType] = useState("all")
  const [selectedParents, setSelectedParents] = useState<string[]>([])
  const [showParentSelector, setShowParentSelector] = useState(false)
  const [sentMessages, setSentMessages] = useState<any[]>([])
  const [scheduledConferences, setScheduledConferences] = useState<any[]>([])
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [attachments, setAttachments] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Simple function to simulate sending an email
  // In production, this would call your API to send via SendGrid/Resend
  const handleSendEmail = async () => {
    if (!emailSubject || !emailContent) {
      toast({
        title: "Missing information",
        description: "Please provide both subject and content for your message.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    try {
      // In production:
      // await fetch('/api/send-email', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     recipients: getRecipientEmails(),
      //     subject: emailSubject,
      //     content: emailContent,
      //     attachments: attachments
      //   })
      // })

      // Add to local state for demo purposes
      const newMessage = {
        id: `msg-${Date.now()}`,
        subject: emailSubject,
        content: emailContent,
        recipients: getRecipientLabel(),
        recipientCount: getRecipientCount(),
        attachments: attachments,
        date: new Date().toISOString(),
      }

      setSentMessages([newMessage, ...sentMessages])
      setEmailSubject("")
      setEmailContent("")
      setAttachments([])

      toast({
        title: "Message sent",
        description: `Your message has been sent to ${getRecipientCount()} recipients.`,
      })
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getRecipientLabel = () => {
    switch (recipientType) {
      case "all":
        return "All Parents"
      case "5a":
        return "Grade 5A Parents"
      case "5b":
        return "Grade 5B Parents"
      case "custom":
        return `${selectedParents.length} Selected Parents`
      default:
        return "All Parents"
    }
  }

  const getRecipientCount = () => {
    switch (recipientType) {
      case "all":
        return sampleParents.length
      case "5a":
        return sampleParents.filter((p) => p.student.section === "A").length
      case "5b":
        return sampleParents.filter((p) => p.student.section === "B").length
      case "custom":
        return selectedParents.length
      default:
        return sampleParents.length
    }
  }

  const getRecipientEmails = () => {
    let parents = []

    switch (recipientType) {
      case "all":
        parents = sampleParents
        break
      case "5a":
        parents = sampleParents.filter((p) => p.student.section === "A")
        break
      case "5b":
        parents = sampleParents.filter((p) => p.student.section === "B")
        break
      case "custom":
        parents = sampleParents.filter((p) => selectedParents.includes(p.id))
        break
    }

    return parents.map((p) => p.email).join(",")
  }

  const handleToggleParent = (parentId: string) => {
    setSelectedParents((prev) => (prev.includes(parentId) ? prev.filter((id) => id !== parentId) : [...prev, parentId]))
  }

  const handleScheduleConference = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const conferenceData = {
      id: `conf-${Date.now()}`,
      parentName: formData.get("parentName") as string,
      parentEmail: formData.get("parentEmail") as string,
      studentName: formData.get("studentName") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      topic: formData.get("topic") as string,
      notes: formData.get("notes") as string,
      status: "scheduled",
    }

    setScheduledConferences([conferenceData, ...scheduledConferences])

    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()

    toast({
      title: "Conference scheduled",
      description: "The conference invitation has been sent to the parent.",
    })
  }

  const handleSendAnnouncement = () => {
    const announcementTitle = (document.getElementById("announcement-title") as HTMLInputElement)?.value
    const announcementContent = (document.getElementById("announcement-content") as HTMLTextAreaElement)?.value
    const announcementRecipients = (document.getElementById("announcement-recipients") as HTMLSelectElement)?.value

    if (!announcementTitle || !announcementContent) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content for your announcement.",
        variant: "destructive",
      })
      return
    }

    // Add to local state for demo purposes
    const newAnnouncement = {
      id: `ann-${Date.now()}`,
      title: announcementTitle,
      content: announcementContent,
      recipients:
        announcementRecipients === "all"
          ? "All Parents"
          : announcementRecipients === "5a"
            ? "Grade 5A Parents"
            : "Grade 5B Parents",
      recipientCount:
        announcementRecipients === "all"
          ? sampleParents.length
          : sampleParents.filter((p) => p.student.section === (announcementRecipients === "5a" ? "A" : "B")).length,
      date: new Date().toISOString(),
      status: "sent",
    }

    setAnnouncements([newAnnouncement, ...announcements])

    // Reset form
    if (document.getElementById("announcement-title") as HTMLInputElement) {
      ;(document.getElementById("announcement-title") as HTMLInputElement).value = ""
    }
    if (document.getElementById("announcement-content") as HTMLTextAreaElement) {
      ;(document.getElementById("announcement-content") as HTMLTextAreaElement).value = ""
    }

    toast({
      title: "Announcement sent",
      description: `Your announcement has been sent to ${newAnnouncement.recipientCount} recipients.`,
    })
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)

      // Simulate file upload
      setTimeout(() => {
        const newFiles = Array.from(e.target.files!).map((file) => ({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type,
          url: "#", // In a real app, this would be a URL to the uploaded file
        }))

        setAttachments([...attachments, ...newFiles])
        setIsUploading(false)

        // Reset file input
        e.target.value = ""
      }, 1000)

      // In production, you would upload to Vercel Blob:
      /*
      const formData = new FormData()
      formData.append("file", e.target.files[0])
      
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        setAttachments([...attachments, {
          name: e.target.files[0].name,
          size: `${(e.target.files[0].size / 1024).toFixed(1)} KB`,
          type: e.target.files[0].type,
          url: data.url
        }])
        setIsUploading(false)
      })
      .catch(err => {
        console.error(err)
        setIsUploading(false)
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file.",
          variant: "destructive",
        })
      })
      */
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Parent Communication</h2>
        <p className="text-muted-foreground">Send messages and schedule conferences with parents via email.</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center">
            <Inbox className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center">
            <Send className="h-4 w-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="conferences" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Conferences
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "messages" && (
        <Card>
          <CardHeader>
            <CardTitle>Send Message to Parents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Select value={recipientType} onValueChange={setRecipientType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Parents ({sampleParents.length})</SelectItem>
                  <SelectItem value="5a">
                    Grade 5A Parents ({sampleParents.filter((p) => p.student.section === "A").length})
                  </SelectItem>
                  <SelectItem value="5b">
                    Grade 5B Parents ({sampleParents.filter((p) => p.student.section === "B").length})
                  </SelectItem>
                  <SelectItem value="custom">Select Specific Parents</SelectItem>
                </SelectContent>
              </Select>

              {recipientType === "custom" && (
                <Button variant="outline" onClick={() => setShowParentSelector(true)} className="mt-2 w-full">
                  {selectedParents.length > 0 ? `${selectedParents.length} parents selected` : "Select parents"}
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter message subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message</Label>
              <Textarea
                id="content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Write your message here..."
                className="min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-md p-2 bg-muted/20">
                    <div className="flex items-center">
                      <PaperclipIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center">
                  <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" type="button" className="mr-2" disabled={isUploading}>
                      <PaperclipIcon className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Attach Files"}
                    </Button>
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {attachments.length > 0 ? `${attachments.length} files attached` : "No files attached"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 5MB. For larger files, please use Google Drive or similar and include the link.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handleSendEmail} disabled={!emailSubject || !emailContent}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === "messages" && sentMessages.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium">Recently Sent Messages</h3>
          <div className="space-y-2">
            {sentMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{message.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        To: {message.recipients} ({message.recipientCount} recipients) • {formatDate(message.date)}
                      </p>
                      <p className="text-sm mt-2 line-clamp-2">{message.content}</p>

                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {message.attachments.map((file: any, index: number) => (
                            <Badge key={index} variant="outline" className="flex items-center">
                              <PaperclipIcon className="h-3 w-3 mr-1" />
                              {file.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline">Sent</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "announcements" && (
        <Card>
          <CardHeader>
            <CardTitle>Send Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="announcement-recipients">Recipients</Label>
              <Select defaultValue="all" id="announcement-recipients">
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Parents ({sampleParents.length})</SelectItem>
                  <SelectItem value="5a">
                    Grade 5A Parents ({sampleParents.filter((p) => p.student.section === "A").length})
                  </SelectItem>
                  <SelectItem value="5b">
                    Grade 5B Parents ({sampleParents.filter((p) => p.student.section === "B").length})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcement-title">Announcement Title</Label>
              <Input id="announcement-title" placeholder="Enter announcement title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcement-content">Announcement Content</Label>
              <Textarea
                id="announcement-content"
                placeholder="Write your announcement here..."
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Schedule for Later</Button>
            <Button onClick={handleSendAnnouncement}>
              <Send className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === "announcements" && announcements.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium">Recent Announcements</h3>
          <div className="space-y-2">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        To: {announcement.recipients} ({announcement.recipientCount} recipients) •{" "}
                        {formatDate(announcement.date)}
                      </p>
                      <p className="text-sm mt-2 line-clamp-2">{announcement.content}</p>
                    </div>
                    <Badge variant="outline">{announcement.status === "sent" ? "Sent" : "Scheduled"}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "conferences" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Parent-Teacher Conference</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScheduleConference} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent Name</Label>
                    <Input id="parentName" name="parentName" required placeholder="Enter parent name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Parent Email</Label>
                    <Input id="parentEmail" name="parentEmail" required type="email" placeholder="Enter parent email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" name="studentName" required placeholder="Enter student name" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" required type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" name="time" required type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Conference Topic</Label>
                  <Input id="topic" name="topic" required placeholder="Enter conference topic" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" name="notes" placeholder="Enter any additional notes" />
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule and Send Invitation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {scheduledConferences.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upcoming Conferences</h3>
              <div className="space-y-2">
                {scheduledConferences.map((conference) => (
                  <Card key={conference.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">Conference with {conference.parentName}</h4>
                          <p className="text-sm text-muted-foreground">Student: {conference.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            Date: {conference.date} at {conference.time}
                          </p>
                          <p className="text-sm mt-2">Topic: {conference.topic}</p>
                          {conference.notes && <p className="text-sm mt-1 text-muted-foreground">{conference.notes}</p>}
                        </div>
                        <Badge>{conference.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Parent selector dialog */}
      <Dialog open={showParentSelector} onOpenChange={setShowParentSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Parents</DialogTitle>
            <DialogDescription>Choose which parents to send this message to.</DialogDescription>
          </DialogHeader>

          <div className="max-h-[300px] overflow-y-auto space-y-2 my-4">
            {sampleParents.map((parent) => (
              <div
                key={parent.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={() => handleToggleParent(parent.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedParents.includes(parent.id)}
                  onChange={() => {}}
                  className="h-4 w-4"
                />
                <Avatar className="h-8 w-8">
                  <AvatarImage src={parent.avatar} alt={parent.name} />
                  <AvatarFallback>
                    {parent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{parent.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {parent.student.name} (Grade {parent.student.grade}, Section {parent.student.section})
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowParentSelector(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowParentSelector(false)}>Select {selectedParents.length} Parents</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
