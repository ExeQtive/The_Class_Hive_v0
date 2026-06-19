"use client"

import { useState } from "react"
import { Calendar, Check, ChevronDown, Clock, Globe, Info, Send, Users, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AnnouncementCreatorProps {
  onSend: (announcement: any) => void
  onCancel: () => void
  onSave: (announcement: any) => void
  students: any[]
  classes: any[]
}

export default function AnnouncementCreator({
  onSend,
  onCancel,
  onSave,
  students,
  classes = [],
}: AnnouncementCreatorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])
  const [audienceType, setAudienceType] = useState<"all" | "classes" | "individuals">("all")
  const [audienceOpen, setAudienceOpen] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const handleSend = () => {
    onSend({
      title,
      content,
      audience: audienceType === "all" ? "all" : selectedAudience,
      audienceType,
      scheduledFor: scheduleDate,
    })
  }

  const handleSave = () => {
    onSave({
      title,
      content,
      audience: audienceType === "all" ? "all" : selectedAudience,
      audienceType,
      scheduledFor: scheduleDate,
    })
  }

  const getAudienceLabel = () => {
    if (audienceType === "all") return "All Parents"
    if (audienceType === "classes") {
      if (selectedAudience.length === 0) return "Select Classes"
      if (selectedAudience.length === 1) return classes.find((c) => c.id === selectedAudience[0])?.name || "1 Class"
      return `${selectedAudience.length} Classes`
    }
    if (audienceType === "individuals") {
      if (selectedAudience.length === 0) return "Select Parents"
      if (selectedAudience.length === 1) return students.find((s) => s.id === selectedAudience[0])?.name || "1 Parent"
      return `${selectedAudience.length} Parents`
    }
    return "Select Audience"
  }

  const getAudienceColor = (type: string) => {
    switch (type) {
      case "all":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "classes":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "individuals":
        return "bg-pink-100 text-pink-700 border-pink-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="border-yellow-200 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-amber-900">
            {previewMode ? "Preview Announcement" : "Create Announcement"}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            >
              {previewMode ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-gradient-to-b from-white to-yellow-50/30">
        {previewMode ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white">
                    TE
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-amber-900">Teacher</div>
                  <div className="text-xs text-amber-600">Just now</div>
                </div>
              </div>
              <Badge className={cn("px-2 py-1 rounded-full", getAudienceColor(audienceType))}>
                {audienceType === "all" ? (
                  <Globe className="h-3 w-3 mr-1" />
                ) : audienceType === "classes" ? (
                  <Users className="h-3 w-3 mr-1" />
                ) : (
                  <Avatar className="h-3 w-3 mr-1">
                    <AvatarFallback className="text-[8px]">P</AvatarFallback>
                  </Avatar>
                )}
                {getAudienceLabel()}
              </Badge>
            </div>
            <div>
              <h3 className="text-lg font-medium text-amber-900 mb-2">{title || "Untitled Announcement"}</h3>
              <div className="whitespace-pre-wrap text-amber-800 bg-white p-3 rounded-lg border border-yellow-100 shadow-sm">
                {content || "No content yet."}
              </div>
            </div>
            {scheduleDate && (
              <div className="flex items-center text-sm text-amber-700 bg-amber-50 p-2 rounded-md border border-amber-100">
                <Clock className="h-4 w-4 mr-2 text-amber-600" />
                Scheduled for: {scheduleDate.toLocaleDateString()} at {scheduleDate.toLocaleTimeString()}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-amber-900">
                Announcement Title
              </Label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-yellow-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter announcement title"
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-amber-900">
                Announcement Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-yellow-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent min-h-[150px]"
                placeholder="Enter announcement content"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <Label className="text-amber-900">Audience</Label>
                <Popover open={audienceOpen} onOpenChange={setAudienceOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={audienceOpen}
                      className="w-full justify-between border-yellow-200 text-amber-700 hover:text-amber-900 hover:bg-amber-50 hover:border-amber-300 mt-1"
                    >
                      <div className="flex items-center">
                        {audienceType === "all" ? (
                          <Globe className="h-4 w-4 mr-2 text-amber-600" />
                        ) : audienceType === "classes" ? (
                          <Users className="h-4 w-4 mr-2 text-amber-600" />
                        ) : (
                          <Avatar className="h-4 w-4 mr-2">
                            <AvatarFallback className="text-[10px] bg-amber-600 text-white">P</AvatarFallback>
                          </Avatar>
                        )}
                        {getAudienceLabel()}
                      </div>
                      <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search audience..." />
                      <CommandList>
                        <CommandEmpty>No audience found.</CommandEmpty>
                      </CommandList>
                      <CommandList>
                        <CommandGroup heading="Audience Type">
                          <CommandItem
                            onSelect={() => {
                              setAudienceType("all")
                              setSelectedAudience([])
                              setAudienceOpen(false)
                            }}
                            className="flex items-center"
                          >
                            <Globe className="h-4 w-4 mr-2 text-amber-600" />
                            <span>All Parents</span>
                            {audienceType === "all" && <Check className="h-4 w-4 ml-auto text-amber-600" />}
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              setAudienceType("classes")
                              setSelectedAudience([])
                            }}
                            className="flex items-center"
                          >
                            <Users className="h-4 w-4 mr-2 text-amber-600" />
                            <span>Classes</span>
                            {audienceType === "classes" && <Check className="h-4 w-4 ml-auto text-amber-600" />}
                          </CommandItem>
                          <CommandItem
                            onSelect={() => {
                              setAudienceType("individuals")
                              setSelectedAudience([])
                            }}
                            className="flex items-center"
                          >
                            <Avatar className="h-4 w-4 mr-2">
                              <AvatarFallback className="text-[10px] bg-amber-600 text-white">P</AvatarFallback>
                            </Avatar>
                            <span>Individual Parents</span>
                            {audienceType === "individuals" && <Check className="h-4 w-4 ml-auto text-amber-600" />}
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                      {audienceType === "classes" && (
                        <CommandList>
                          <CommandGroup heading="Classes">
                            {classes.map((classItem) => (
                              <CommandItem
                                key={classItem.id}
                                onSelect={() => {
                                  setSelectedAudience((current) =>
                                    current.includes(classItem.id)
                                      ? current.filter((id) => id !== classItem.id)
                                      : [...current, classItem.id],
                                  )
                                }}
                                className="flex items-center"
                              >
                                <div
                                  className={cn(
                                    "h-4 w-4 mr-2 rounded-full",
                                    `bg-gradient-to-br from-amber-500 to-yellow-600`,
                                  )}
                                />
                                <span>{classItem.name}</span>
                                {selectedAudience.includes(classItem.id) && (
                                  <Check className="h-4 w-4 ml-auto text-amber-600" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      )}
                      {audienceType === "individuals" && (
                        <CommandList>
                          <CommandGroup heading="Parents">
                            {students.map((student) => (
                              <CommandItem
                                key={student.id}
                                onSelect={() => {
                                  setSelectedAudience((current) =>
                                    current.includes(student.id)
                                      ? current.filter((id) => id !== student.id)
                                      : [...current, student.id],
                                  )
                                }}
                                className="flex items-center"
                              >
                                <Avatar className="h-4 w-4 mr-2">
                                  <AvatarFallback className="text-[10px] bg-amber-600 text-white">
                                    {student.name
                                      .split(" ")
                                      .map((n: string) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>
                                  Parent of {student.name}
                                  <span className="text-xs text-amber-600 ml-1">({student.grade})</span>
                                </span>
                                {selectedAudience.includes(student.id) && (
                                  <Check className="h-4 w-4 ml-auto text-amber-600" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      )}
                      {(audienceType === "classes" || audienceType === "individuals") && (
                        <div className="border-t border-yellow-100 p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-yellow-200 text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                            onClick={() => setAudienceOpen(false)}
                          >
                            Done
                          </Button>
                        </div>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full sm:w-1/2">
                <Label className="text-amber-900">Schedule (Optional)</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant="outline"
                    className="w-full border-yellow-200 text-amber-700 hover:text-amber-900 hover:bg-amber-50 hover:border-amber-300"
                    onClick={() => setScheduleDate(new Date())}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                    {scheduleDate ? scheduleDate.toLocaleDateString() : "Schedule"}
                  </Button>
                  {scheduleDate && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                      onClick={() => setScheduleDate(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {selectedAudience.length > 0 && (audienceType === "classes" || audienceType === "individuals") && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedAudience.map((id) => (
                  <Badge
                    key={id}
                    className={cn("px-2 py-1 rounded-full", getAudienceColor(audienceType))}
                    onClick={() => setSelectedAudience((current) => current.filter((currentId) => currentId !== id))}
                  >
                    {audienceType === "classes"
                      ? classes.find((c) => c.id === id)?.name
                      : `Parent of ${students.find((s) => s.id === id)?.name}`}
                    <X className="h-3 w-3 ml-1 cursor-pointer" />
                  </Badge>
                ))}
              </div>
            )}
            {(audienceType === "classes" || audienceType === "individuals") && selectedAudience.length === 0 && (
              <div className="flex items-center text-sm text-amber-700 bg-amber-50 p-2 rounded-md border border-amber-100 mt-2">
                <Info className="h-4 w-4 mr-2 text-amber-600" />
                Please select at least one {audienceType === "classes" ? "class" : "parent"} for your announcement.
              </div>
            )}
          </div>
        )}
      </CardContent>
      <Separator className="bg-yellow-100" />
      <CardFooter className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-yellow-200 text-amber-700 hover:text-amber-900 hover:bg-amber-100 hover:border-amber-300"
        >
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSave}
            className="border-yellow-200 text-amber-700 hover:text-amber-900 hover:bg-amber-100 hover:border-amber-300"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleSend}
            disabled={
              !title ||
              !content ||
              ((audienceType === "classes" || audienceType === "individuals") && selectedAudience.length === 0)
            }
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-md transition-all"
          >
            <Send className="h-4 w-4 mr-2" />
            {scheduleDate ? "Schedule" : "Send"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
