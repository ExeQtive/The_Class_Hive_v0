// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface IEPGoalsProps {
  iep: any
  goals: any[]
  onSave: (goals: any[]) => void
  onBack: () => void
}

export function IEPGoals({ iep, goals, onSave, onBack }: IEPGoalsProps) {
  const [editedGoals, setEditedGoals] = useState<any[]>(goals || [])
  const [isEditing, setIsEditing] = useState(false)

  const handleAddGoal = () => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      area: "",
      description: "",
      objective: "",
      progress: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      notes: "",
    }
    setEditedGoals([...editedGoals, newGoal])
    setIsEditing(true)
  }

  const handleUpdateGoal = (index: number, field: string, value: any) => {
    const updatedGoals = [...editedGoals]
    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value,
      lastUpdated: field !== "lastUpdated" ? new Date().toISOString().split("T")[0] : updatedGoals[index].lastUpdated,
    }
    setEditedGoals(updatedGoals)
  }

  const handleDeleteGoal = (index: number) => {
    const updatedGoals = [...editedGoals]
    updatedGoals.splice(index, 1)
    setEditedGoals(updatedGoals)
  }

  const handleSave = () => {
    onSave(editedGoals)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">IEP Goals for {iep.studentName}</h2>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Goals
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Goals</Button>
          )}
          <Button onClick={handleAddGoal}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {editedGoals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-4">No goals have been added yet</p>
              <Button onClick={handleAddGoal}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          editedGoals.map((goal, index) => (
            <Card key={goal.id} className={`hover:shadow-md transition-shadow duration-300 ${
              goal.area === "Reading" ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200" :
              goal.area === "Writing" ? "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200" :
              goal.area === "Math" ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200" :
              goal.area === "Social-Emotional" ? "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200" :
              goal.area === "Behavior" ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200" :
              goal.area === "Communication" ? "bg-gradient-to-r from-cyan-50 to-sky-50 border-cyan-200" :
              goal.area === "Executive Functioning" ? "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200" :
              goal.area === "Social Skills" ? "bg-gradient-to-r from-fuchsia-50 to-purple-50 border-fuchsia-200" :
              goal.area === "Self-Regulation" ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200" :
              goal.area === "Motor Skills" ? "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200" :
              ""
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">
                    {isEditing ? (
                      <Input
                        value={goal.description}
                        onChange={(e) => handleUpdateGoal(index, "description", e.target.value)}
                        placeholder="Goal description"
                        className="text-xl font-semibold"
                      />
                    ) : (
                      goal.description || "Untitled Goal"
                    )}
                  </CardTitle>
                  {isEditing && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Goal</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this goal? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteGoal(index)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Area</label>
                    {isEditing ? (
                      <Select value={goal.area} onValueChange={(value) => handleUpdateGoal(index, "area", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Reading">Reading</SelectItem>
                          <SelectItem value="Writing">Writing</SelectItem>
                          <SelectItem value="Math">Math</SelectItem>
                          <SelectItem value="Social-Emotional">Social-Emotional</SelectItem>
                          <SelectItem value="Behavior">Behavior</SelectItem>
                          <SelectItem value="Communication">Communication</SelectItem>
                          <SelectItem value="Executive Functioning">Executive Functioning</SelectItem>
                          <SelectItem value="Social Skills">Social Skills</SelectItem>
                          <SelectItem value="Self-Regulation">Self-Regulation</SelectItem>
                          <SelectItem value="Motor Skills">Motor Skills</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p>{goal.area || "Not specified"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Updated</label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={goal.lastUpdated}
                        onChange={(e) => handleUpdateGoal(index, "lastUpdated", e.target.value)}
                      />
                    ) : (
                      <p>{goal.lastUpdated ? new Date(goal.lastUpdated).toLocaleDateString() : "Not updated yet"}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Objective</label>
                  {isEditing ? (
                    <Textarea
                      value={goal.objective}
                      onChange={(e) => handleUpdateGoal(index, "objective", e.target.value)}
                      placeholder="Specific, measurable objective for this goal"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm">{goal.objective || "No objective specified"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Progress</label>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  {isEditing ? (
                    <Textarea
                      value={goal.notes}
                      onChange={(e) => handleUpdateGoal(index, "notes", e.target.value)}
                      placeholder="Additional notes about progress, strategies, etc."
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm">{goal.notes || "No notes"}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
