// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface StudentGroupsProps {
  groups: any[]
  students: any[]
  onSave: (groups: any[]) => void
  onCancel: () => void
}

export function StudentGroups({ groups, students, onSave, onCancel }: StudentGroupsProps) {
  const [activeTab, setActiveTab] = useState<"list" | "manage">("list")
  const [editedGroups, setEditedGroups] = useState<any[]>(groups)
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGroup, setNewGroup] = useState({
    id: "",
    name: "",
    description: "",
    students: [],
    meetingTime: "",
    notes: "",
  })

  const handleCreateGroup = () => {
    setNewGroup({
      id: `group-${Date.now()}`,
      name: "",
      description: "",
      students: [],
      meetingTime: "",
      notes: "",
    })
    setSelectedGroup(null)
    setIsDialogOpen(true)
  }

  const handleEditGroup = (group: any) => {
    setSelectedGroup(group)
    setNewGroup({ ...group })
    setIsDialogOpen(true)
  }

  const handleDeleteGroup = (groupId: string) => {
    setEditedGroups(editedGroups.filter((group) => group.id !== groupId))
  }

  const handleSaveGroup = () => {
    if (selectedGroup) {
      // Update existing group
      setEditedGroups(editedGroups.map((group) => (group.id === selectedGroup.id ? newGroup : group)))
    } else {
      // Add new group
      setEditedGroups([...editedGroups, newGroup])
    }
    setIsDialogOpen(false)
  }

  const handleToggleStudent = (studentId: string) => {
    setNewGroup({
      ...newGroup,
      students: newGroup.students.includes(studentId)
        ? newGroup.students.filter((id: string) => id !== studentId)
        : [...newGroup.students, studentId],
    })
  }

  const handleSaveGroups = () => {
    onSave(editedGroups)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="mr-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Students
        </Button>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "list" | "manage")}>
          <TabsList className="bg-gradient-to-r from-teal-100/50 to-cyan-100/50 p-1 rounded-xl">
            <TabsTrigger
              value="list"
              className={cn(
                "transition-all duration-200",
                activeTab === "list" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              Group List
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className={cn(
                "transition-all duration-200",
                activeTab === "manage" ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md" : "",
              )}
            >
              Manage Groups
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editedGroups.map((group, index) => (
            <Card
              key={group.id}
              className="overflow-hidden border-teal-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-white" />
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Meeting Time</div>
                    <div className="text-sm font-medium">{group.meetingTime}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Students</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {group.students.length > 0 ? (
                        <>
                          <Badge variant="outline">{group.students.length} students</Badge>
                          {group.students.slice(0, 3).map((studentId: string) => {
                            const student = students.find((s) => s.id === studentId)
                            return student ? (
                              <Badge key={studentId} variant="outline">
                                {student.firstName} {student.lastName}
                              </Badge>
                            ) : null
                          })}
                          {group.students.length > 3 && (
                            <Badge variant="outline">+{group.students.length - 3} more</Badge>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">No students assigned</div>
                      )}
                    </div>
                  </div>
                  {group.notes && (
                    <div>
                      <div className="text-xs text-muted-foreground">Notes</div>
                      <div className="text-sm">{group.notes}</div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-gradient-to-r from-teal-50 to-cyan-50">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-teal-200 text-teal-700 hover:bg-teal-100 hover:text-teal-800"
                  onClick={() => handleEditGroup(group)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "manage" && (
        <Card>
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Manage Student Groups</CardTitle>
              <Button
                onClick={handleCreateGroup}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" /> Create Group
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {editedGroups.length === 0 ? (
              <div className="text-center py-12 px-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100 animate-pulse">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-white mb-6">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-teal-800">No Groups Created</h3>
                <p className="text-teal-600 mb-6 max-w-md mx-auto">
                  Create your first student group to organize students for differentiated instruction.
                </p>
                <Button
                  onClick={handleCreateGroup}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" /> Create Group
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {editedGroups.map((group) => (
                  <div
                    key={group.id}
                    className="flex flex-col md:flex-row justify-between items-start border rounded-md p-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {group.students.length > 0 ? (
                          <>
                            <Badge variant="outline">{group.students.length} students</Badge>
                            {group.students.slice(0, 3).map((studentId: string) => {
                              const student = students.find((s) => s.id === studentId)
                              return student ? (
                                <Badge key={studentId} variant="outline">
                                  {student.firstName} {student.lastName}
                                </Badge>
                              ) : null
                            })}
                            {group.students.length > 3 && (
                              <Badge variant="outline">+{group.students.length - 3} more</Badge>
                            )}
                          </>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">
                            No students
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                      <Button variant="outline" size="sm" onClick={() => handleEditGroup(group)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteGroup(group.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t flex justify-between">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveGroups}>
              <Save className="h-4 w-4 mr-2" /> Save Groups
            </Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedGroup ? "Edit Group" : "Create New Group"}</DialogTitle>
            <DialogDescription>
              {selectedGroup
                ? "Update the group details and student membership."
                : "Create a new group and add students to it."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="Enter group name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meetingTime">Meeting Time</Label>
                <Input
                  id="meetingTime"
                  value={newGroup.meetingTime}
                  onChange={(e) => setNewGroup({ ...newGroup, meetingTime: e.target.value })}
                  placeholder="E.g., Mondays at 10:00 AM"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                placeholder="Enter group description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newGroup.notes}
                onChange={(e) => setNewGroup({ ...newGroup, notes: e.target.value })}
                placeholder="Additional notes about this group"
              />
            </div>
            <div className="grid gap-2">
              <Label>Students</Label>
              <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                {students.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No students available.</p>
                ) : (
                  <div className="space-y-2">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`student-${student.id}`}
                          checked={newGroup.students.includes(student.id)}
                          onCheckedChange={() => handleToggleStudent(student.id)}
                        />
                        <Label htmlFor={`student-${student.id}`} className="flex items-center cursor-pointer">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                            <AvatarFallback>
                              {student.firstName.charAt(0)}
                              {student.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {student.firstName} {student.lastName}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGroup}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
