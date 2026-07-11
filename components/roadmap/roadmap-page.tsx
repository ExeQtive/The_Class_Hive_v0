// @ts-nocheck
// @ts-nocheck
"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, CheckCircle2, Clock, Lightbulb, Rocket, Star } from "lucide-react"

export default function RoadmapPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Roadmap</h1>
          <p className="text-muted-foreground">
            Upcoming features and improvements for the Teacher Planning Dashboard.
          </p>
        </div>
      </div>

      <Tabs defaultValue="coming-soon">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
          <TabsTrigger value="planned">Planned</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
        </TabsList>

        <TabsContent value="coming-soon" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Advanced Analytics</CardTitle>
                  <Badge className="bg-blue-500">Q3 2023</Badge>
                </div>
                <CardDescription>
                  Detailed insights into student performance and teaching effectiveness.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Student progress tracking</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Classroom performance metrics</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Customizable reports</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Coming in 2 weeks
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Parent Portal</CardTitle>
                  <Badge className="bg-blue-500">Q3 2023</Badge>
                </div>
                <CardDescription>Dedicated portal for parents to track their child's progress.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Real-time progress updates</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Direct messaging with teachers</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Homework and assignment tracking</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Coming in 4 weeks
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Curriculum Builder</CardTitle>
                  <Badge className="bg-blue-500">Q4 2023</Badge>
                </div>
                <CardDescription>Advanced tools for creating and managing curriculum.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Drag-and-drop curriculum builder</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Standards alignment tools</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Resource integration</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Coming in 8 weeks
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planned" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Behavior Management</CardTitle>
                  <Badge>Q1 2024</Badge>
                </div>
                <CardDescription>Tools for tracking and managing student behavior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Behavior incident tracking</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Positive reinforcement system</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Parent notification system</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Vote for this feature
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Gradebook Pro</CardTitle>
                  <Badge>Q2 2024</Badge>
                </div>
                <CardDescription>Advanced grading and assessment tools.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Standards-based grading</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Custom rubric builder</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Grade analysis and trends</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Vote for this feature
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Mobile App</CardTitle>
                  <Badge>Q3 2024</Badge>
                </div>
                <CardDescription>Access your dashboard on the go with our mobile app.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>iOS and Android support</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Offline access to key features</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <span>Push notifications</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Star className="mr-2 h-4 w-4" />
                  Vote for this feature
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>AI Lesson Planning</CardTitle>
                <CardDescription>AI-powered tools to help create and optimize lesson plans.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>AI-generated lesson ideas</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Content optimization suggestions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Differentiation recommendations</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Rocket className="mr-2 h-4 w-4" />
                  Submit feedback
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Virtual Classroom</CardTitle>
                <CardDescription>Integrated virtual classroom for remote teaching.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Video conferencing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Interactive whiteboard</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Breakout rooms</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Rocket className="mr-2 h-4 w-4" />
                  Submit feedback
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Professional Development</CardTitle>
                <CardDescription>Integrated professional development and training.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>PD course library</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Certification tracking</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>Peer collaboration tools</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Rocket className="mr-2 h-4 w-4" />
                  Submit feedback
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
