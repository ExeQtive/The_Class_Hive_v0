// @ts-nocheck
"use client"

import { cn } from "@/lib/utils"

import { Calendar, CheckCircle, Clock, FileText, GraduationCap, MessageSquare, Users } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const studentPerformanceData = [
  { month: "Jan", average: 78 },
  { month: "Feb", average: 82 },
  { month: "Mar", average: 80 },
  { month: "Apr", average: 85 },
  { month: "May", average: 83 },
  { month: "Jun", average: 87 },
]

const taskCompletionData = [
  { name: "Mon", completed: 5, total: 8 },
  { name: "Tue", completed: 7, total: 10 },
  { name: "Wed", completed: 4, total: 6 },
  { name: "Thu", completed: 8, total: 9 },
  { name: "Fri", completed: 6, total: 7 },
]

const upcomingTasks = [
  { id: 1, title: "Grade Math Quizzes", dueDate: "Today", priority: "High" },
  { id: 2, title: "Prepare Science Lesson", dueDate: "Tomorrow", priority: "Medium" },
  { id: 3, title: "Parent-Teacher Conference", dueDate: "May 15", priority: "High" },
  { id: 4, title: "Update Student Records", dueDate: "May 16", priority: "Low" },
]

const recentMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Will Tommy be able to make up the missed quiz?",
    time: "2h ago",
    avatar: "SJ",
  },
  {
    id: 2,
    sender: "Michael Chen",
    content: "Thank you for the feedback on Lily's project.",
    time: "Yesterday",
    avatar: "MC",
  },
  {
    id: 3,
    sender: "Amanda Garcia",
    content: "Can we schedule a meeting to discuss Kevin's progress?",
    time: "2d ago",
    avatar: "AG",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover-effect overflow-hidden border-t-4 border-t-purple-500 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-500 icon-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">16 boys, 12 girls</p>
          </CardContent>
        </Card>
        <Card
          className="card-hover-effect overflow-hidden border-t-4 border-t-teal-500 animate-scale-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-teal-500 icon-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card
          className="card-hover-effect overflow-hidden border-t-4 border-t-amber-500 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Lessons</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-amber-500 icon-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 this week</p>
          </CardContent>
        </Card>
        <Card
          className="card-hover-effect overflow-hidden border-t-4 border-t-pink-500 animate-scale-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-pink-500 icon-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted p-1 h-12">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Messages
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 overflow-hidden card-hover-effect animate-slide-in-left">
              <CardHeader className="gradient-purple-teal text-white">
                <CardTitle>Student Performance</CardTitle>
                <CardDescription className="text-white/80">Average class performance over time</CardDescription>
              </CardHeader>
              <CardContent className="px-2 pt-6">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentPerformanceData}>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis domain={[60, 100]} tickLine={false} axisLine={false} />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 3, fill: "white" }}
                        activeDot={{ r: 8, strokeWidth: 0, fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1 overflow-hidden card-hover-effect animate-slide-in-right">
              <CardHeader className="gradient-amber-pink text-white">
                <CardTitle>Task Completion</CardTitle>
                <CardDescription className="text-white/80">Daily task completion rate</CardDescription>
              </CardHeader>
              <CardContent className="px-2 pt-6">
                <div className="h-[200px]">
                  <ChartContainer
                    config={{
                      tasks: {
                        label: "Tasks",
                      },
                      completed: {
                        label: "Completed",
                        color: "#a855f7",
                      },
                      total: {
                        label: "Total",
                        color: "hsl(var(--muted))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <BarChart data={taskCompletionData}>
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <Bar dataKey="completed" fill="#a855f7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="total" fill="hsl(var(--muted-foreground)/0.2)" radius={[4, 4, 0, 0]} />
                      <ChartTooltip content={<ChartTooltipContent labelKey="tasks" />} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 overflow-hidden card-hover-effect animate-fade-in">
              <CardHeader className="gradient-cyan-blue text-white">
                <CardTitle>Upcoming Calendar</CardTitle>
                <CardDescription className="text-white/80">Your schedule for the next few days</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Math Quiz - Grade 5</p>
                        <span className="text-xs text-muted-foreground">9:00 AM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-teal-500 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Science Lab - Grade 5</p>
                        <span className="text-xs text-muted-foreground">11:30 AM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Staff Meeting</p>
                        <span className="text-xs text-muted-foreground">3:00 PM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Reading Group - Advanced</p>
                        <span className="text-xs text-muted-foreground">9:30 AM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Parent-Teacher Conference</p>
                        <span className="text-xs text-muted-foreground">4:00 PM</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Tomorrow</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 py-3">
                <div className="text-xs text-muted-foreground flex items-center hover:text-primary transition-colors cursor-pointer">
                  <Calendar className="h-3 w-3 mr-1" />
                  View full calendar
                </div>
              </CardFooter>
            </Card>
            <Card
              className="col-span-3 overflow-hidden card-hover-effect animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <CardTitle>Lesson Plan Progress</CardTitle>
                <CardDescription className="text-white/80">Weekly completion status</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Math</div>
                      <div className="text-purple-600 font-medium">85%</div>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Science</div>
                      <div className="text-teal-600 font-medium">70%</div>
                    </div>
                    <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Language Arts</div>
                      <div className="text-cyan-600 font-medium">100%</div>
                    </div>
                    <div className="h-2 bg-cyan-100 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Social Studies</div>
                      <div className="text-amber-600 font-medium">60%</div>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">Art</div>
                      <div className="text-pink-600 font-medium">45%</div>
                    </div>
                    <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500",
                        )}
                      ></div>
                      <div>
                        <p className="text-sm font-medium">{task.title}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Due {task.dueDate}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Messages from parents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${message.avatar}`} alt="Message sender avatar" />
                      <AvatarFallback>{message.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.sender}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                View all messages
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
