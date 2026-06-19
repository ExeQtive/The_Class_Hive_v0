"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Calendar, Clock, Edit, FileText, Trash2, BarChart, Target, CalendarDays, FileUp } from 'lucide-react'

interface IEPDetailProps {
  iep: any
  onBack: () => void
  onEdit: () => void
  onDelete: (id: string) => void
  onViewGoals: () => void
  onViewProgress: () => void
  onViewMeetings: () => void
  onViewDocuments: () => void
}

export function IEPDetail({
  iep,
  onBack,
  onEdit,
  onDelete,
  onViewGoals,
  onViewProgress,
  onViewMeetings,
  onViewDocuments,
}: IEPDetailProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Update the getStatusBadge function to use more vibrant colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700">Active</Badge>
      case "review-needed":
        return <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700">Review Needed</Badge>
      case "expired":
        return <Badge className="bg-gradient-to-r from-rose-500 to-red-600 text-white hover:from-rose-600 hover:to-red-700">Expired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getOverallProgress = (goals: any[]) => {
    if (!goals || goals.length === 0) return 0
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0)
    return Math.round(totalProgress / goals.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">IEP Details</h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit IEP
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete IEP</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this IEP? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(iep.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={iep.avatar} alt={iep.studentName} />
                <AvatarFallback>
                  {iep.studentName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-medium">{iep.studentName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">
                  Grade {iep.studentGrade}, Section {iep.studentSection}
                </Badge>
                {getStatusBadge(iep.status)}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <div className="text-sm flex items-center">
                  <FileText className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">Primary Disability:</span>
                </div>
                <div className="text-sm font-medium">{iep.primaryDisability}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">Start Date:</span>
                </div>
                <div className="text-sm">{formatDate(iep.startDate)}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">Review Date:</span>
                </div>
                <div className="text-sm">{formatDate(iep.reviewDate)}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">End Date:</span>
                </div>
                <div className="text-sm">{formatDate(iep.endDate)}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">Overall Progress:</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{getOverallProgress(iep.goals)}% Complete</span>
                  </div>
                  {/* Update the Progress component to use gradient colors */}
                  <Progress
                    value={getOverallProgress(iep.goals)}
                    className="h-2 bg-slate-200"
                    indicatorClassName={`bg-gradient-to-r ${
                      getOverallProgress(iep.goals) < 30
                        ? 'from-red-500 to-rose-500'
                        : getOverallProgress(iep.goals) < 70
                          ? 'from-amber-500 to-orange-500'
                          : 'from-emerald-500 to-green-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="accommodations"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Accommodations
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Team
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-4 pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Update the Button components in the overview tab to use gradient backgrounds */}
                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start items-start text-left bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-indigo-200 hover:border-indigo-300 transition-all"
                    onClick={onViewGoals}
                  >
                    <div className="flex flex-col items-center w-full">
                      <Target className="h-8 w-8 mb-2 text-indigo-500" />
                      <h3 className="text-lg font-medium text-indigo-700">Goals & Objectives</h3>
                      <p className="text-sm text-indigo-600 mt-1">{iep.goals.length} goals defined</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start items-start text-left bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-200 hover:border-blue-300 transition-all"
                    onClick={onViewProgress}
                  >
                    <div className="flex flex-col items-center w-full">
                      <BarChart className="h-8 w-8 mb-2 text-blue-500" />
                      <h3 className="text-lg font-medium text-blue-700">Progress Monitoring</h3>
                      <p className="text-sm text-blue-600 mt-1">Track progress toward goals</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start items-start text-left bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-amber-200 hover:border-amber-300 transition-all"
                    onClick={onViewMeetings}
                  >
                    <div className="flex flex-col items-center w-full">
                      <CalendarDays className="h-8 w-8 mb-2 text-amber-500" />
                      <h3 className="text-lg font-medium text-amber-700">Meetings</h3>
                      <p className="text-sm text-amber-600 mt-1">{iep.meetings.length} meetings scheduled</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start items-start text-left bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-200 hover:border-emerald-300 transition-all"
                    onClick={onViewDocuments}
                  >
                    <div className="flex flex-col items-center w-full">
                      <FileUp className="h-8 w-8 mb-2 text-emerald-500" />
                      <h3 className="text-lg font-medium text-emerald-700">Documents</h3>
                      <p className="text-sm text-emerald-600 mt-1">{iep.documents.length} documents uploaded</p>
                    </div>
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Recent Updates</h3>
                  <div className="space-y-2">
                    {iep.goals
                      .sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                      .slice(0, 3)
                      .map((goal: any) => (
                        <div key={goal.id} className="flex items-start space-x-2 text-sm">
                          <div className="w-16 flex-shrink-0 text-muted-foreground">
                            {new Date(goal.lastUpdated).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">{goal.area}</span>: {goal.description} - {goal.progress}%
                            complete
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accommodations" className="p-4 pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Accommodations & Modifications</h3>
                  <ul className="space-y-2">
                    {iep.accommodations.map((accommodation: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="rounded-full h-1.5 w-1.5 bg-primary mt-2"></div>
                        <span>{accommodation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="team" className="p-4 pt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">IEP Team Members</h3>
                  <div className="space-y-3">
                    {iep.team.map((member: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                          {member.email}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
