// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Star, Filter, MoreVertical, Paperclip } from "lucide-react"

// Bright color scheme for demonstration
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
      <Card className="border-2 border-pink-500 shadow-lg shadow-pink-200">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Messages</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-white text-pink-600 hover:bg-pink-100 border-pink-300">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-white text-pink-600 hover:bg-pink-100 border-pink-300">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-pink-100">
            Communicate with parents, staff, and administrators
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-pink-300" />
            <Input
              placeholder="Search messages..."
              className="pl-10 bg-white/90 text-pink-900 placeholder:text-pink-400 border-pink-300 focus:border-pink-500 focus:ring-pink-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="inbox" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-pink-100 rounded-none border-b border-pink-200">
              <TabsTrigger
                value="inbox"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-pink-500 text-pink-700"
              >
                Inbox
                <Badge className="ml-2 bg-pink-500 hover:bg-pink-600">{messages.filter((m) => !m.read).length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-pink-500 text-pink-700"
              >
                Starred
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-pink-500 text-pink-700"
              >
                Sent
              </TabsTrigger>
              <TabsTrigger
                value="drafts"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-pink-500 text-pink-700"
              >
                Drafts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="m-0">
              <div className="divide-y divide-pink-100">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start p-4 hover:bg-pink-50 cursor-pointer ${!message.read ? "bg-pink-50" : ""}`}
                  >
                    <Avatar className="h-10 w-10 mr-4 border-2 border-pink-200">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                        {message.sender
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`font-semibold truncate ${!message.read ? "text-pink-800" : "text-pink-600"}`}>
                          {message.sender}
                        </h4>
                        <div className="flex items-center">
                          {message.starred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-2" />}
                          <span className="text-xs text-pink-500">{message.date}</span>
                        </div>
                      </div>
                      <p
                        className={`text-sm truncate ${!message.read ? "font-medium text-pink-700" : "text-pink-600"}`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-xs text-pink-500 truncate">{message.preview}</p>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0 h-5 
                            ${
                              message.category === "parent"
                                ? "bg-pink-100 text-pink-700 border-pink-300"
                                : message.category === "staff"
                                  ? "bg-purple-100 text-purple-700 border-purple-300"
                                  : "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300"
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
              <div className="divide-y divide-pink-100">
                {filteredMessages
                  .filter((m) => m.starred)
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start p-4 hover:bg-pink-50 cursor-pointer ${!message.read ? "bg-pink-50" : ""}`}
                    >
                      <Avatar className="h-10 w-10 mr-4 border-2 border-pink-200">
                        <AvatarImage src={message.avatar} alt={message.sender} />
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                          {message.sender
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className={`font-semibold truncate ${!message.read ? "text-pink-800" : "text-pink-600"}`}>
                            {message.sender}
                          </h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-2" />
                            <span className="text-xs text-pink-500">{message.date}</span>
                          </div>
                        </div>
                        <p
                          className={`text-sm truncate ${!message.read ? "font-medium text-pink-700" : "text-pink-600"}`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-xs text-pink-500 truncate">{message.preview}</p>
                        <div className="mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-0 h-5 
                            ${
                              message.category === "parent"
                                ? "bg-pink-100 text-pink-700 border-pink-300"
                                : message.category === "staff"
                                  ? "bg-purple-100 text-purple-700 border-purple-300"
                                  : "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300"
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
            <TabsContent value="sent" className="p-4 text-center text-pink-500">
              <p>Your sent messages will appear here</p>
            </TabsContent>
            <TabsContent value="drafts" className="p-4 text-center text-pink-500">
              <p>Your draft messages will appear here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-pink-50 border-t border-pink-200 p-4">
          <div className="flex w-full space-x-2">
            <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-100">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach
            </Button>
            <Input
              placeholder="Compose a new message..."
              className="flex-1 border-pink-300 focus:border-pink-500 focus:ring-pink-500 placeholder:text-pink-400"
            />
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MessageInbox
