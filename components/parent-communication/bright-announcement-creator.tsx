"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Send, Calendar, ImageIcon, Link, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const AnnouncementCreator = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])

  const audiences = [
    { label: "All Parents", value: "all-parents" },
    { label: "1st Grade Parents", value: "1st-grade" },
    { label: "2nd Grade Parents", value: "2nd-grade" },
    { label: "3rd Grade Parents", value: "3rd-grade" },
    { label: "4th Grade Parents", value: "4th-grade" },
    { label: "5th Grade Parents", value: "5th-grade" },
    { label: "Special Ed Parents", value: "special-ed" },
    { label: "PTA Members", value: "pta" },
    { label: "Volunteer Group", value: "volunteers" },
  ]

  const toggleAudience = (audienceValue: string) => {
    setSelectedAudience((prev) =>
      prev.includes(audienceValue) ? prev.filter((a) => a !== audienceValue) : [...prev, audienceValue],
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-amber-500 shadow-lg shadow-amber-200">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
          <CardTitle className="text-2xl font-bold">Create Announcement</CardTitle>
          <CardDescription className="text-amber-100">Send important updates to parents and guardians</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-amber-700 mb-1">
              Announcement Title
            </label>
            <Input
              id="title"
              placeholder="Enter announcement title..."
              className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-amber-700 mb-1">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Type your announcement message here..."
              className="min-h-[150px] border-amber-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700 mb-1">Target Audience</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  {selectedAudience.length > 0
                    ? `${selectedAudience.length} audience(s) selected`
                    : "Select audience..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search audience..." className="text-amber-700" />
                  <CommandList>
                    <CommandEmpty>No audience found.</CommandEmpty>
                    <CommandGroup>
                      {audiences.map((audience) => (
                        <CommandItem
                          key={audience.value}
                          value={audience.value}
                          onSelect={() => toggleAudience(audience.value)}
                          className="flex items-center"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedAudience.includes(audience.value) ? "opacity-100 text-amber-600" : "opacity-0",
                            )}
                          />
                          {audience.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedAudience.map((audienceValue) => {
                const audience = audiences.find((a) => a.value === audienceValue)
                return (
                  <Badge
                    key={audienceValue}
                    className="bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300"
                    onClick={() => toggleAudience(audienceValue)}
                  >
                    {audience?.label}
                    <span className="ml-1 cursor-pointer">×</span>
                  </Badge>
                )
              })}
            </div>
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-amber-700 mb-1">
              Schedule (Optional)
            </label>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                Schedule for later
              </Button>
              <Select>
                <SelectTrigger className="w-full border-amber-300 text-amber-700 focus:ring-amber-500">
                  <SelectValue placeholder="Announcement priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high" className="text-red-600">
                    High Priority
                  </SelectItem>
                  <SelectItem value="medium" className="text-amber-600">
                    Medium Priority
                  </SelectItem>
                  <SelectItem value="low" className="text-green-600">
                    Low Priority
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-amber-50 border-t border-amber-200 flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              <ImageIcon className="h-4 w-4 mr-2 text-amber-500" />
              Add Image
            </Button>
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              <Link className="h-4 w-4 mr-2 text-amber-500" />
              Add Link
            </Button>
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              <Users className="h-4 w-4 mr-2 text-amber-500" />
              Tag People
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
              Save Draft
            </Button>
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
              <Send className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AnnouncementCreator
