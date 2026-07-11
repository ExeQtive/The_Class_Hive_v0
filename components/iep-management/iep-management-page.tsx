// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IEPStudentList } from "./iep-student-list"
import { IEPGoalTracker } from "./iep-goal-tracker"
import { IEPDocuments } from "./iep-documents"

export default function IEPManagementPage() {
  const [activeTab, setActiveTab] = useState("students")

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IEP Management</h1>
          <p className="text-muted-foreground">Track and manage Individualized Education Plans for your students.</p>
        </div>
      </div>

      <Tabs defaultValue="students" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="students">Students with IEPs</TabsTrigger>
          <TabsTrigger value="goals">Goal Tracking</TabsTrigger>
          <TabsTrigger value="documents">IEP Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <IEPStudentList />
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <IEPGoalTracker />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <IEPDocuments />
        </TabsContent>
      </Tabs>
    </div>
  )
}
