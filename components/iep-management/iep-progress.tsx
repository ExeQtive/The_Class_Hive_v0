// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface IEPProgressProps {
  iep: any
  goals: any[]
  onSave: (goals: any[]) => void
  onBack: () => void
}

export function IEPProgress({ iep, goals, onSave, onBack }: IEPProgressProps) {
  const [editedGoals, setEditedGoals] = useState<any[]>(goals || [])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string>("all")

  const areas = ["all", ...new Set(goals.map((goal) => goal.area))].filter(Boolean)

  const filteredGoals = selectedArea === "all" ? editedGoals : editedGoals.filter((goal) => goal.area === selectedArea)

  const handleUpdateGoal = (index: number, field: string, value: any) => {
    const goalIndex = editedGoals.findIndex((g) => g.id === filteredGoals[index].id)
    if (goalIndex === -1) return

    const updatedGoals = [...editedGoals]
    updatedGoals[goalIndex] = {
      ...updatedGoals[goalIndex],
      [field]: value,
      lastUpdated:
        field !== "lastUpdated" ? new Date().toISOString().split("T")[0] : updatedGoals[goalIndex].lastUpdated,
    }
    setEditedGoals(updatedGoals)
  }

  const handleSave = () => {
    onSave(editedGoals)
    setIsEditing(false)
  }

  const getOverallProgress = (goals: any[]) => {
    if (!goals || goals.length === 0) return 0
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0)
    return Math.round(totalProgress / goals.length)
  }

  const getAreaProgress = (area: string) => {
    const areaGoals = editedGoals.filter((goal) => goal.area === area)
    return getOverallProgress(areaGoals)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">Progress Monitoring for {iep.studentName}</h2>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Update Progress</Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="summary">Progress Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Goal Progress</CardTitle>
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {areas
                      .filter((a) => a !== "all")
                      .map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredGoals.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">No goals found in this area</div>
                ) : (
                  filteredGoals.map((goal, index) => (
                    <div key={goal.id} className={`space-y-3 p-4 rounded-lg ${
                      goal.area === "Reading" ? "bg-gradient-to-r from-blue-50 to-indigo-50" :
                      goal.area === "Writing" ? "bg-gradient-to-r from-purple-50 to-violet-50" :
                      goal.area === "Math" ? "bg-gradient-to-r from-emerald-50 to-teal-50" :
                      goal.area === "Social-Emotional" ? "bg-gradient-to-r from-rose-50 to-pink-50" :
                      goal.area === "Behavior" ? "bg-gradient-to-r from-amber-50 to-yellow-50" :
                      goal.area === "Communication" ? "bg-gradient-to-r from-cyan-50 to-sky-50" :
                      goal.area === "Executive Functioning" ? "bg-gradient-to-r from-slate-50 to-gray-50" :
                      goal.area === "Social Skills" ? "bg-gradient-to-r from-fuchsia-50 to-purple-50" :
                      goal.area === "Self-Regulation" ? "bg-gradient-to-r from-orange-50 to-amber-50" :
                      goal.area === "Motor Skills" ? "bg-gradient-to-r from-lime-50 to-green-50" :
                      "bg-white"
                    } mb-4`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{goal.description}</h3>
                          <p className="text-sm text-muted-foreground">{goal.area}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last updated: {new Date(goal.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="text-sm">{goal.objective}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                        {isEditing ? (
                          <Input
                            type="range"
                            min="0"
                            max="100"
                            value={goal.progress}
                            onChange={(e) => handleUpdateGoal(index, "progress", Number.parseInt(e.target.value))}
                            className="w-full"
                          />
                        ) : (
                          <Progress 
                            value={goal.progress} 
                            className="h-2 bg-slate-200" 
                            indicatorClassName={`bg-gradient-to-r ${
                              goal.progress < 30 
                                ? 'from-red-500 to-rose-500' 
                                : goal.progress < 70 
                                  ? 'from-amber-500 to-orange-500' 
                                  : 'from-emerald-500 to-green-500'
                            }`}
                          />
                        )}
                      </div>

                      {isEditing && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Update Notes</label>
                          <Textarea
                            value={goal.notes}
                            onChange={(e) => handleUpdateGoal(index, "notes", e.target.value)}
                            placeholder="Add notes about progress, strategies, etc."
                            rows={2}
                          />
                        </div>
                      )}

                      {!isEditing && goal.notes && (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">Notes</label>
                          <p className="text-sm">{goal.notes}</p>
                        </div>
                      )}

                      {index < filteredGoals.length - 1 && <hr className="my-4" />}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall Progress</span>
                    <span className="font-medium">{getOverallProgress(editedGoals)}%</span>
                  </div>
                  <Progress 
                    value={getOverallProgress(editedGoals)} 
                    className="h-3 bg-slate-200" 
                    indicatorClassName={`bg-gradient-to-r ${
                      getOverallProgress(editedGoals) < 30 
                        ? 'from-red-500 to-rose-500' 
                        : getOverallProgress(editedGoals) < 70 
                          ? 'from-amber-500 to-orange-500' 
                          : 'from-emerald-500 to-green-500'
                    }`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Progress by Area</h3>
                  {areas
                    .filter((a) => a !== "all")
                    .map((area) => (
                      <div key={area} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{area}</span>
                          <span className="text-sm">{getAreaProgress(area)}%</span>
                        </div>
                        <Progress 
                          value={getAreaProgress(area)} 
                          className="h-2 bg-slate-200" 
                          indicatorClassName={`bg-gradient-to-r ${
                            getAreaProgress(area) < 30 
                              ? 'from-red-500 to-rose-500' 
                              : getAreaProgress(area) < 70 
                                ? 'from-amber-500 to-orange-500' 
                                : 'from-emerald-500 to-green-500'
                          }`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
