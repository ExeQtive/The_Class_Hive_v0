"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ConferenceScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  // Sample data
  const dates = [
    { date: "2023-10-15", day: "Mon", dayNum: "15" },
    { date: "2023-10-16", day: "Tue", dayNum: "16" },
    { date: "2023-10-17", day: "Wed", dayNum: "17" },
    { date: "2023-10-18", day: "Thu", dayNum: "18" },
    { date: "2023-10-19", day: "Fri", dayNum: "19" },
  ]

  const timeSlots = [
    { id: 1, time: "8:00 AM - 8:30 AM", available: true },
    { id: 2, time: "8:30 AM - 9:00 AM", available: false, student: "Emma Thompson" },
    { id: 3, time: "9:00 AM - 9:30 AM", available: true },
    { id: 4, time: "9:30 AM - 10:00 AM", available: false, student: "Liam Johnson" },
    { id: 5, time: "10:00 AM - 10:30 AM", available: true },
    { id: 6, time: "10:30 AM - 11:00 AM", available: true },
    { id: 7, time: "11:00 AM - 11:30 AM", available: false, student: "Sophia Martinez" },
    { id: 8, time: "11:30 AM - 12:00 PM", available: true },
    { id: 9, time: "1:00 PM - 1:30 PM", available: true },
    { id: 10, time: "1:30 PM - 2:00 PM", available: false, student: "Noah Williams" },
    { id: 11, time: "2:00 PM - 2:30 PM", available: true },
    { id: 12, time: "2:30 PM - 3:00 PM", available: true },
    { id: 13, time: "3:00 PM - 3:30 PM", available: false, student: "Olivia Brown" },
    { id: 14, time: "3:30 PM - 4:00 PM", available: true },
  ]

  const upcomingConferences = [
    {
      id: 1,
      student: "Emma Thompson",
      date: "Oct 16",
      time: "8:30 AM - 9:00 AM",
      type: "In-person",
      notes: "Discuss reading progress",
    },
    {
      id: 2,
      student: "Liam Johnson",
      date: "Oct 16",
      time: "9:30 AM - 10:00 AM",
      type: "Virtual",
      notes: "Math assessment review",
    },
    {
      id: 3,
      student: "Sophia Martinez",
      date: "Oct 17",
      time: "11:00 AM - 11:30 AM",
      type: "In-person",
      notes: "Behavior concerns",
    },
    {
      id: 4,
      student: "Noah Williams",
      date: "Oct 18",
      time: "1:30 PM - 2:00 PM",
      type: "Virtual",
      notes: "IEP annual review",
    },
    {
      id: 5,
      student: "Olivia Brown",
      date: "Oct 19",
      time: "3:00 PM - 3:30 PM",
      type: "In-person",
      notes: "Science project discussion",
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border-2 border-orange-500 shadow-lg shadow-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Parent-Teacher Conferences</CardTitle>
              <CardDescription className="text-orange-100">
                Schedule and manage your parent-teacher conferences
              </CardDescription>
            </div>
            <Button className="bg-white text-orange-600 hover:bg-orange-100">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="w-full bg-orange-100 rounded-none border-b border-orange-200">
              <TabsTrigger
                value="schedule"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 text-orange-700"
              >
                Schedule Conferences
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 text-orange-700"
              >
                Upcoming Conferences
                <Badge className="ml-2 bg-orange-500 hover:bg-orange-600">{upcomingConferences.length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-orange-500 text-orange-700"
              >
                Past Conferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="m-0 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-semibold text-orange-700 mb-4">Select Date</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {dates.map((date) => (
                      <button
                        key={date.date}
                        onClick={() => setSelectedDate(date.date)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                          ${
                            selectedDate === date.date
                              ? "border-orange-500 bg-orange-100 text-orange-700"
                              : "border-orange-200 hover:border-orange-300 hover:bg-orange-50 text-orange-600"
                          }`}
                      >
                        <span className="text-sm font-medium">{date.day}</span>
                        <span className="text-xl font-bold">{date.dayNum}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-orange-700 mb-4">Conference Type</h3>
                    <Select>
                      <SelectTrigger className="w-full border-orange-300 text-orange-700 focus:ring-orange-500">
                        <SelectValue placeholder="Select conference type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person" className="text-orange-700">
                          In-Person Conference
                        </SelectItem>
                        <SelectItem value="virtual" className="text-orange-700">
                          Virtual Conference
                        </SelectItem>
                        <SelectItem value="phone" className="text-orange-700">
                          Phone Conference
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-orange-700 mb-4">Available Time Slots</h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`p-3 rounded-lg border-2 text-left transition-all
                            ${
                              !slot.available
                                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                : selectedTimeSlot === slot.time
                                  ? "border-orange-500 bg-orange-100 text-orange-700"
                                  : "border-orange-200 hover:border-orange-300 hover:bg-orange-50 text-orange-600"
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{slot.time}</span>
                            {!slot.available && (
                              <Badge className="bg-gray-200 text-gray-600 hover:bg-gray-200">Booked</Badge>
                            )}
                            {selectedTimeSlot === slot.time && (
                              <Badge className="bg-orange-500 text-white hover:bg-orange-600">Selected</Badge>
                            )}
                          </div>
                          {!slot.available && <p className="text-sm text-gray-500 mt-1">Reserved by {slot.student}</p>}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 border-2 border-dashed border-orange-200 rounded-lg bg-orange-50">
                      <p className="text-orange-500 text-center">Please select a date to view available time slots</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="m-0">
              <div className="divide-y divide-orange-100">
                {upcomingConferences.map((conference) => (
                  <div key={conference.id} className="p-4 hover:bg-orange-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-orange-800">{conference.student}</h4>
                        <div className="flex items-center mt-1 text-sm text-orange-600">
                          <span className="mr-3">{conference.date}</span>
                          <span>{conference.time}</span>
                        </div>
                        <p className="text-sm text-orange-500 mt-1">{conference.notes}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          className={`
                            ${
                              conference.type === "In-person"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : "bg-purple-100 text-purple-700 border-purple-300"
                            }
                          `}
                        >
                          {conference.type}
                        </Badge>
                        <div className="flex space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="p-4 text-center text-orange-500">
              <p>Your past conferences will appear here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-orange-50 border-t border-orange-200 p-4 flex justify-between">
          <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
            Export Schedule
          </Button>
          <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
            Confirm Selected Time Slot
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ConferenceScheduler
