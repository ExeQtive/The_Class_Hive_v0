"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Plus, Save, Trash2, Users } from 'lucide-react'
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

interface IEPMeetingsProps {
  iep: any
  meetings: any[]
  onSave: (meetings: any[]) => void
  onBack: () => void
}

export function IEPMeetings({ iep, meetings, onSave, onBack }: IEPMeetingsProps) {
  const [editedMeetings, setEditedMeetings] = useState<any[]>(meetings || [])
  const [isEditing, setIsEditing] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState<any | null>(null)

  const handleAddMeeting = () => {
    const newMeeting = {
      id: `meeting-${Date.now()}`,
      type: "",
      date: new Date().toISOString().split("T")[0],
      time: "14:00",
      location: "",
      attendees: [""],
      notes: "",
    }
    setEditingMeeting(newMeeting)
  }

  const handleEditMeeting = (meeting: any) => {
    setEditingMeeting({ ...meeting })
  }

  const handleDeleteMeeting = (meetingId: string) => {
    const updatedMeetings = editedMeetings.filter((meeting) => meeting.id !== meetingId)
    setEditedMeetings(updatedMeetings)
    onSave(updatedMeetings)
  }

  const handleUpdateMeeting = (field: string, value: any) => {
    if (!editingMeeting) return
    setEditingMeeting({
      ...editingMeeting,
      [field]: value,
    })
  }

  const handleUpdateAttendee = (index: number, value: string) => {
    if (!editingMeeting) return
    const updatedAttendees = [...editingMeeting.attendees]
    updatedAttendees[index] = value
    handleUpdateMeeting("attendees", updatedAttendees)
  }

  const handleAddAttendee = () => {
    if (!editingMeeting) return
    handleUpdateMeeting("attendees", [...editingMeeting.attendees, ""])
  }

  const handleRemoveAttendee = (index: number) => {
    if (!editingMeeting) return
    const updatedAttendees = [...editingMeeting.attendees]
    updatedAttendees.splice(index, 1)
    handleUpdateMeeting("attendees", updatedAttendees)
  }

  const handleSaveMeeting = () => {
    if (!editingMeeting) return

    // Filter out empty attendees
    const filteredAttendees = editingMeeting.attendees.filter((a: string) => a.trim() !== "")
    const meetingToSave = {
      ...editingMeeting,
      attendees: filteredAttendees,
    }

    const existingIndex = editedMeetings.findIndex((m) => m.id === meetingToSave.id)
    let updatedMeetings

    if (existingIndex >= 0) {
      // Update existing meeting
      updatedMeetings = [...editedMeetings]
      updatedMeetings[existingIndex] = meetingToSave
    } else {
      // Add new meeting
      updatedMeetings = [...editedMeetings, meetingToSave]
    }

    setEditedMeetings(updatedMeetings)
    onSave(updatedMeetings)
    setEditingMeeting(null)
  }

  const handleCancelEdit = () => {
    setEditingMeeting(null)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Update the getMeetingStatus function to use more vibrant colors
  const getMeetingStatus = (date: string) => {
    const meetingDate = new Date(date)
    const today = new Date()

    if (meetingDate < today) {
      return <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700">Completed</Badge>
    } else if (meetingDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700">Upcoming</Badge>
    } else {
      return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700">Scheduled</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">IEP Meetings for {iep.studentName}</h2>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleAddMeeting}>
            <Plus className="h-4 w-4 mr-2" />
            Add Meeting
          </Button>
        </div>
      </div>

      {editingMeeting ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingMeeting.id.startsWith("meeting-") && !editedMeetings.find((m) => m.id === editingMeeting.id)
                ? "Add New Meeting"
                : "Edit Meeting"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Type</label>
                <Select value={editingMeeting.type} onValueChange={(value) => handleUpdateMeeting("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Initial IEP Meeting">Initial IEP Meeting</SelectItem>
                    <SelectItem value="Annual Review">Annual Review</SelectItem>
                    <SelectItem value="Triennial Review">Triennial Review</SelectItem>
                    <SelectItem value="Progress Review">Progress Review</SelectItem>
                    <SelectItem value="Transition Planning">Transition Planning</SelectItem>
                    <SelectItem value="Manifestation Determination">Manifestation Determination</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={editingMeeting.location}
                  onChange={(e) => handleUpdateMeeting("location", e.target.value)}
                  placeholder="Meeting location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={editingMeeting.date}
                  onChange={(e) => handleUpdateMeeting("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={editingMeeting.time}
                  onChange={(e) => handleUpdateMeeting("time", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Attendees</label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddAttendee}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Attendee
                </Button>
              </div>

              {editingMeeting.attendees.map((attendee: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={attendee}
                    onChange={(e) => handleUpdateAttendee(index, e.target.value)}
                    placeholder="Attendee name and role"
                    className="flex-1"
                  />
                  {editingMeeting.attendees.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAttendee(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={editingMeeting.notes}
                onChange={(e) => handleUpdateMeeting("notes", e.target.value)}
                placeholder="Meeting notes, agenda, or follow-up items"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveMeeting}>
                <Save className="h-4 w-4 mr-2" />
                Save Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {editedMeetings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-muted-foreground mb-4">No meetings have been scheduled yet</p>
                <Button onClick={handleAddMeeting}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule First Meeting
                </Button>
              </CardContent>
            </Card>
          ) : (
            editedMeetings
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((meeting) => (
                // Add colorful backgrounds to the meeting cards based on meeting type
                <Card key={meeting.id} className={`hover:shadow-md transition-shadow duration-300 ${
                  meeting.type === "Initial IEP Meeting" ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200" :
                  meeting.type === "Annual Review" ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200" :
                  meeting.type === "Triennial Review" ? "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200" :
                  meeting.type === "Progress Review" ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200" :
                  meeting.type === "Transition Planning" ? "bg-gradient-to-r from-cyan-50 to-sky-50 border-cyan-200" :
                  meeting.type === "Manifestation Determination" ? "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200" :
                  meeting.type === "30-Day Review" ? "bg-gradient-to-r from-lime-50 to-green-50 border-lime-200" :
                  meeting.type === "Quarterly Review" ? "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200" :
                  meeting.type === "Mid-Year Review" ? "bg-gradient-to-r from-fuchsia-50 to-purple-50 border-fuchsia-200" :
                  ""
                }`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">{meeting.type}</h3>
                          {getMeetingStatus(meeting.date)}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{formatDate(meeting.date)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{meeting.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-start">
                          <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Attendees</div>
                            <ul className="text-sm space-y-1 mt-1">
                              {meeting.attendees.map((attendee: string, index: number) => (
                                <li key={index}>{attendee}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 md:items-end">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditMeeting(meeting)}>
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this meeting? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteMeeting(meeting.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>

                    {meeting.notes && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-sm font-medium mb-1">Notes</div>
                        <p className="text-sm">{meeting.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      )}
    </div>
  )
}
