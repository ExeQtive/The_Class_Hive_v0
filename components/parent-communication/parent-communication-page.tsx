"\"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnnouncementCreator from "@/components/parent-communication/bright-announcement-creator"
import ConferenceScheduler from "@/components/parent-communication/bright-conference-scheduler"
import MessageInbox from "@/components/parent-communication/message-inbox"

const sampleTemplates = [
  {
    id: "template-1",
    title: "Welcome Message",
    subject: "Welcome to 5th Grade!",
    content: "Dear [Parent Name],\n\nWelcome to 5th grade! I'm excited to have [Student Name] in my class this year...",
    category: "General",
  },
  {
    id: "template-2",
    title: "Homework Reminder",
    subject: "Homework Reminder for [Date]",
    content:
      "Dear [Parent Name],\n\nJust a reminder that [Student Name] has a math worksheet due tomorrow. Please ensure they complete it...",
    category: "Homework",
  },
  {
    id: "template-3",
    title: "Behavior Concern",
    subject: "Regarding [Student Name]'s Behavior",
    content:
      "Dear [Parent Name],\n\nI'm writing to you today to discuss some concerns about [Student Name]'s behavior in class...",
    category: "Behavior",
  },
  {
    id: "template-4",
    title: "Conference Invitation",
    subject: "Parent-Teacher Conference Invitation",
    content:
      "Dear [Parent Name],\n\nI would like to schedule a parent-teacher conference to discuss [Student Name]'s progress...",
    category: "Conferences",
  },
  {
    id: "template-5",
    title: "Upcoming Event",
    subject: "Upcoming Class Event: [Event Name]",
    content:
      "Dear [Parent Name],\n\nI'm excited to announce an upcoming event for our class: [Event Name] on [Date]...",
    category: "Events",
  },
]

const sampleStudents = []

export function ParentCommunicationPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "announcements" | "conferences" | "templates">("messages")

  const handleSend = (messageData: any) => {
    // In a real app, this would send the message via an API
    console.log("Sending message:", messageData)
  }

  const handleSaveTemplate = (templateData: any) => {
    // In a real app, this would save the template via an API
    console.log("Saving template:", templateData)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Parent Communication</h1>
      <p className="text-muted-foreground">Communicate with parents and guardians effectively.</p>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="conferences">Conferences</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="messages">
          <MessageInbox messages={[]} onReplyToMessage={handleSend} />
        </TabsContent>
        <TabsContent value="announcements">
          <AnnouncementCreator
            onSend={handleSend}
            onCancel={() => setActiveTab("messages")}
            onSave={() => {}}
            students={sampleStudents}
            classes={[]}
          />
        </TabsContent>
        <TabsContent value="conferences">
          <ConferenceScheduler students={sampleStudents} />
        </TabsContent>
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Create and manage message templates to save time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>Templates will be here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
