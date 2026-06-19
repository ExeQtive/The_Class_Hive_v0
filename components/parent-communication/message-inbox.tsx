"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Star, Filter, MoreVertical, Paperclip } from "lucide-react"

// Professional color scheme with moderate colors
const MessageInbox = () => {
  const [activeTab, setActiveTab] = useState("inbox")
  const [searchQuery, setSearchQuery] = useState("")

  const messages = [
    {
      id: 1,
      sender: "Maria Rodriguez",
      subject: "Re: Johnny's Progress",
      preview: "Thank you for the update on Johnny's reading progress. We've been practicing at home and...",
      date: "10:23 AM",
      read: false,
      starred: true,
      avatar: "/placeholder.svg?height=40&width=40",
      category: "parent",
    },
    {
      id: 2,
      sender: "Principal Johnson",
      subject: "Staff Meeting - Agenda",
      preview: "Please find attached the agenda for tomorrow's staff meeting. We'll be discussing the upcoming...",
      date: "Yesterday",
      read: true,
      starred: false,
      avatar: "/placeholder.svg?height=40&width=40",
      category: "staff",
    },
    {
      id: 3,
      sender: "David Chen",
      subject: "Question about homework",
      preview: "I wanted to ask about the math homework assigned yesterday. Lily is having trouble with...",
      date: "Yesterday",
      read: true,
      starred: false,
      avatar: "/placeholder.svg?height=40&width=40",
      category: "parent",
    },
    {
      id: 4,
      sender: "Curriculum Committee",
      subject: "New Science Standards",
      preview: "The district has adopted new science standards for the upcoming school year. Please review the...",
      date: "Mar 15",
      read: true,
      starred: true,
      avatar: "/placeholder.svg?height=40&width=40",
      category: "district",
    },
    {
      id: 5,
      sender: "Sarah Williams",
      subject: "Volunteer for Field Trip",
      preview: "I'd like to volunteer as a chaperone for the upcoming field trip to the science museum...",
      date: "Mar 14",
      read: true,
      starred: false,
      avatar: "/placeholder.svg?height=40&width=40",
      category: "parent",
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="border border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-medium text-blue-800">Messages</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50 border-blue-200">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50 border-blue-200">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-blue-600">
            Communicate with parents, staff, and administrators
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
            <Input
              placeholder="Search messages..."
              className="pl-10 bg-white text-blue-900 placeholder:text-blue-300 border-blue-200 focus:border-blue-300 focus:ring-blue-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="inbox" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-blue-50 rounded-none border-b border-blue-200">
              <TabsTrigger
                value="inbox"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-blue-600"
              >
                Inbox
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">{messages.filter((m) => !m.read).length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-blue-600"
              >
                Starred
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-blue-600"
              >
                Sent
              </TabsTrigger>
              <TabsTrigger
                value="drafts"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-blue-600"
              >
                Drafts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="m-0">
              <div className="divide-y divide-blue-100">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start p-4 hover:bg-blue-50 cursor-pointer ${!message.read ? "bg-blue-50" : ""}`}
                  >
                    <Avatar className="h-10 w-10 mr-4 border border-blue-200">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {message.sender
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`font-semibold truncate ${!message.read ? "text-blue-900" : "text-blue-700"}`}>
                          {message.sender}
                        </h4>
                        <div className="flex items-center">
                          {message.starred && <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-2" />}
                          <span className="text-xs text-blue-500">{message.date}</span>
                        </div>
                      </div>
                      <p
                        className={`text-sm truncate ${!message.read ? "font-medium text-blue-800" : "text-blue-600"}`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-xs text-blue-500 truncate">{message.preview}</p>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0 h-5 
                            ${
                              message.category === "parent"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : message.category === "staff"
                                  ? "bg-teal-50 text-teal-700 border-teal-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                        >
                          {message.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="starred" className="m-0">
              <div className="divide-y divide-blue-100">
                {filteredMessages
                  .filter((m) => m.starred)
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start p-4 hover:bg-blue-50 cursor-pointer ${!message.read ? "bg-blue-50" : ""}`}
                    >
                      <Avatar className="h-10 w-10 mr-4 border border-blue-200">
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {message.sender
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className={`font-semibold truncate ${!message.read ? "text-blue-900" : "text-blue-700"}`}>
                            {message.sender}
                          </h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-2" />
                            <span className="text-xs text-blue-500">{message.date}</span>
                          </div>
                        </div>
                        <p
                          className={`text-sm truncate ${!message.read ? "font-medium text-blue-800" : "text-blue-600"}`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-xs text-blue-500 truncate">{message.preview}</p>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-0 h-5 
                            ${
                              message.category === "parent"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : message.category === "staff"
                                  ? "bg-teal-50 text-teal-700 border-teal-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {message.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="sent" className="p-4 text-center text-blue-500">
              <p>Your sent messages will appear here</p>
            </TabsContent>
            <TabsContent value="drafts" className="p-4 text-center text-blue-500">
              <p>Your draft messages will appear here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-blue-50 border-t border-blue-200 p-4">
          <div className="flex w-full space-x-2">
            <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach
            </Button>
            <Input
              placeholder="Compose a new message..."
              className="flex-1 border-blue-200 focus:border-blue-300 focus:ring-blue-200 placeholder:text-blue-300"
            />
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Export the component as default
export default MessageInbox
