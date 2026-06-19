"use client"

import { ArrowLeft, Calendar, Edit, Mail, MapPin, Phone, Trash, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface StudentDetailProps {
  student: any
  groups: any[]
  onBack: () => void
  onEdit: () => void
  onDelete: (studentId: string) => void
}

export function StudentDetail({ student, groups, onBack, onEdit, onDelete }: StudentDetailProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy")
  }

  const getAttendancePercentage = (attendance: any) => {
    if (attendance.total === 0) return 100
    return Math.round((attendance.present / attendance.total) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Students
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
                <AvatarFallback className="text-2xl">
                  {student.firstName.charAt(0)}
                  {student.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">
                {student.firstName} {student.lastName}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge>
                  Grade {student.grade}, Section {student.section}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                Born {formatDate(student.dateOfBirth)}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Guardian
                </div>
                <div className="font-medium">{student.guardianName}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </div>
                <div className="font-medium break-all">{student.guardianEmail}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone
                </div>
                <div className="font-medium">{student.guardianPhone}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Address
                </div>
                <div className="font-medium">{student.address}</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Groups</h3>
              <div className="flex flex-wrap gap-2">
                {student.groups.map((group: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {group}
                  </Badge>
                ))}
                {student.groups.length === 0 && <div className="text-sm text-muted-foreground">No groups assigned</div>}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Medical Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Allergies:</span>
                  <span className="text-sm font-medium">{student.allergies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Emergency Contact:</span>
                  <span className="text-sm font-medium">{student.emergencyContact}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t flex justify-between">
            <Button variant="destructive" onClick={() => onDelete(student.id)}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Overview</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Attendance</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div
                        className={cn(
                          "text-2xl font-bold",
                          getAttendancePercentage(student.attendance) >= 90
                            ? "text-green-600"
                            : getAttendancePercentage(student.attendance) >= 80
                              ? "text-amber-600"
                              : "text-red-600",
                        )}
                      >
                        {getAttendancePercentage(student.attendance)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Overall</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{student.attendance.present}</div>
                      <div className="text-xs text-muted-foreground">Present</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {student.attendance.absent + student.attendance.tardy}
                      </div>
                      <div className="text-xs text-muted-foreground">Absent/Tardy</div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Academic Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Math</span>
                      <span
                        className={cn(
                          "font-medium",
                          student.performance.math >= 90
                            ? "text-green-600"
                            : student.performance.math >= 80
                              ? "text-amber-600"
                              : student.performance.math >= 70
                                ? "text-orange-600"
                                : "text-red-600",
                        )}
                      >
                        {student.performance.math}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Science</span>
                      <span
                        className={cn(
                          "font-medium",
                          student.performance.science >= 90
                            ? "text-green-600"
                            : student.performance.science >= 80
                              ? "text-amber-600"
                              : student.performance.science >= 70
                                ? "text-orange-600"
                                : "text-red-600",
                        )}
                      >
                        {student.performance.science}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Reading</span>
                      <span
                        className={cn(
                          "font-medium",
                          student.performance.reading >= 90
                            ? "text-green-600"
                            : student.performance.reading >= 80
                              ? "text-amber-600"
                              : student.performance.reading >= 70
                                ? "text-orange-600"
                                : "text-red-600",
                        )}
                      >
                        {student.performance.reading}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Writing</span>
                      <span
                        className={cn(
                          "font-medium",
                          student.performance.writing >= 90
                            ? "text-green-600"
                            : student.performance.writing >= 80
                              ? "text-amber-600"
                              : student.performance.writing >= 70
                                ? "text-orange-600"
                                : "text-red-600",
                        )}
                      >
                        {student.performance.writing}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Social Studies</span>
                      <span
                        className={cn(
                          "font-medium",
                          student.performance.socialStudies >= 90
                            ? "text-green-600"
                            : student.performance.socialStudies >= 80
                              ? "text-amber-600"
                              : student.performance.socialStudies >= 70
                                ? "text-orange-600"
                                : "text-red-600",
                        )}
                      >
                        {student.performance.socialStudies}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="notes">
            <TabsList>
              <TabsTrigger value="notes">Notes & Observations</TabsTrigger>
              <TabsTrigger value="behavior">Behavior Records</TabsTrigger>
              <TabsTrigger value="groups">Group Details</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="space-y-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Teacher Notes</h4>
                    <p className="text-sm">{student.notes || "No notes available."}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="behavior" className="space-y-4 mt-4">
              {student.behavior && student.behavior.length > 0 ? (
                student.behavior.map((record: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Badge
                              variant={record.type === "positive" ? "outline" : "secondary"}
                              className={cn(
                                record.type === "positive"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-amber-50 text-amber-700",
                              )}
                            >
                              {record.type === "positive" ? "Positive Behavior" : "Concern"}
                            </Badge>
                            <span className="text-sm text-muted-foreground ml-2">{formatDate(record.date)}</span>
                          </div>
                          <p className="mt-2 text-sm">{record.note}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">No behavior records available.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="groups" className="space-y-4 mt-4">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <Card key={group.id}>
                    <CardContent className="pt-6">
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-muted-foreground">Meeting Time</div>
                          <div className="text-sm">{group.meetingTime}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Notes</div>
                          <div className="text-sm">{group.notes}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Student is not part of any groups.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
