"use client"

import { useState } from "react"
import { Check, Crown, Sparkles, Zap, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PremiumFeatures() {
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly")

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Premium Features</h2>
        <p className="text-muted-foreground">
          Upgrade your teaching experience with our premium features designed to save you time and enhance your
          classroom.
        </p>
      </div>

      <div className="bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Crown className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-xl font-bold">Limited Time Offer</h3>
            </div>
            <p className="text-sm md:text-base">
              Get 20% off any annual plan with code <span className="font-bold">TEACHER20</span>
            </p>
          </div>
          <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
            Claim Discount
          </Button>
        </div>
      </div>

      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">AI Lesson Planning</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
                <CardDescription>Save hours of preparation time</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Generate complete lesson plans in seconds</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Standards-aligned for all subjects and grades</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Customize to your teaching style</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Built-in differentiation options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
                <CardDescription>Track student progress in detail</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Individual student performance dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Identify learning gaps with heat maps</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Growth tracking over time</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Exportable reports for parent conferences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Resource Library</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      Basic Available
                    </Badge>
                  </div>
                </div>
                <CardDescription>Access thousands of premium resources</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>10,000+ worksheets, activities, and games</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Expanding
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Editable templates for all subjects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Printable and digital formats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>New resources added weekly</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Parent Communication Suite</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                      Basic Available
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Automated weekly progress reports</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Two-way messaging with translation</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Digital permission slip management</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Assignment Generator</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Create custom worksheets and assessments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Multiple difficulty levels for differentiation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Auto-grading for multiple choice questions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="bg-muted inline-flex items-center rounded-full p-1">
              <Button
                variant={selectedPlan === "monthly" ? "default" : "ghost"}
                className={selectedPlan === "monthly" ? "rounded-full" : "rounded-full text-muted-foreground"}
                onClick={() => setSelectedPlan("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant={selectedPlan === "annual" ? "default" : "ghost"}
                className={selectedPlan === "annual" ? "rounded-full" : "rounded-full text-muted-foreground"}
                onClick={() => setSelectedPlan("annual")}
              >
                Annual
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-0">
                  Save 20%
                </Badge>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan cards with consistent heights */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Essential tools for individual teachers</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {selectedPlan === "monthly" ? "$9.99" : "$95.88"}
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /{selectedPlan === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Basic lesson planning tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Student management for up to 3 classes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Limited resource library access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Basic parent communication tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>15 AI credits per month (with 1-month rollover)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button variant="outline" className="w-full">
                  Choose Basic
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-200 shadow-md relative flex flex-col h-full">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg"></div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Advanced features for dedicated educators</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {selectedPlan === "monthly" ? "$19.99" : "$191.88"}
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /{selectedPlan === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Everything in Basic, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>AI-powered lesson planning</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Unlimited student management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Full resource library access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Advanced analytics dashboard</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>75 AI credits per month (with 1-month rollover)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                  Choose Pro
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>School</CardTitle>
                <CardDescription>Complete solution for schools and districts</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  {selectedPlan === "monthly" ? "$49.99" : "$479.88"}
                  <span className="ml-1 text-xl font-medium text-muted-foreground">
                    /{selectedPlan === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Everything in Pro, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>School-wide analytics and reporting</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Admin dashboard for school leaders</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Curriculum alignment tools</span>
                    <Badge variant="outline" className="ml-2 text-xs text-amber-600 border-amber-200 bg-amber-50">
                      Coming Soon
                    </Badge>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Unlimited AI credits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 mb-4">
            <h3 className="text-xl font-bold mb-4">Additional AI Credits</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Credit package cards with consistent heights */}
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">10 Credits</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$4.99</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Perfect for occasional users who need a small boost</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="outline" className="w-full">
                    Purchase
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">25 Credits</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$9.99</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Great value for regular users</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="outline" className="w-full">
                    Purchase
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">50 Credits</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$14.99</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Best value for power users</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="outline" className="w-full">
                    Purchase
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">100 Credits</CardTitle>
                  <div className="mt-2 text-2xl font-bold">$24.99</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">Ideal for intensive planning periods</p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="outline" className="w-full">
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="mt-8 mb-4">
            <h3 className="text-xl font-bold mb-4">AI Credit Estimator</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Estimate how many AI credits you'll need based on your typical usage:
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Lesson plans per week</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>1-2</option>
                        <option>3-5</option>
                        <option>6+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Worksheets/assessments per week</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>1-3</option>
                        <option>4-6</option>
                        <option>7+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Differentiated materials per week</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>0</option>
                        <option>1-2</option>
                        <option>3+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Parent communications per week</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>0-1</option>
                        <option>2-3</option>
                        <option>4+</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Estimated monthly credits needed:</p>
                        <p className="text-sm text-muted-foreground">Based on your selections</p>
                      </div>
                      <div className="text-2xl font-bold">25-30</div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Recommended plan: <span className="font-medium">Pro Plan (75 credits/month)</span>
                      </p>
                    </div>
                  </div>

                  <Button className="w-full mt-2">Recalculate</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roadmap">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Development Roadmap</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our team is actively working on implementing all the premium features. Here's our timeline for
                    rolling them out:
                  </p>
                </div>

                {/* Phase 1 */}
                <div className="relative border-l-2 border-blue-200 pl-6 pb-2">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold">Phase 1: Core AI Features</h4>
                      <Badge className="ml-3 bg-green-100 text-green-800 border-0">Q2 2025</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enhancing existing features with AI capabilities
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                        <h5 className="font-medium">Basic AI Lesson Planning</h5>
                      </div>
                      <p className="text-sm">
                        Implement initial AI capabilities for generating lesson plan outlines and objectives
                      </p>
                      <div className="mt-2 flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-xs text-muted-foreground">In Progress</span>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                        <h5 className="font-medium">Simple Worksheet Generator</h5>
                      </div>
                      <p className="text-sm">Create basic worksheet templates with AI-generated content</p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting May 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="relative border-l-2 border-blue-200 pl-6 pb-2">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold">Phase 2: Advanced Analytics & Communication</h4>
                      <Badge className="ml-3 bg-blue-100 text-blue-800 border-0">Q3 2025</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Expanding data insights and parent communication tools
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-blue-500 mr-2" />
                        <h5 className="font-medium">Student Performance Dashboard</h5>
                      </div>
                      <p className="text-sm">Implement detailed analytics for tracking individual student progress</p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting July 2025</span>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-blue-500 mr-2" />
                        <h5 className="font-medium">Automated Progress Reports</h5>
                      </div>
                      <p className="text-sm">
                        Create system for generating and sending weekly student progress reports
                      </p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting August 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="relative border-l-2 border-blue-200 pl-6 pb-2">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold">Phase 3: School-Wide Features</h4>
                      <Badge className="ml-3 bg-purple-100 text-purple-800 border-0">Q4 2025</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Implementing administrator tools and school-level analytics
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-blue-500 mr-2" />
                        <h5 className="font-medium">Admin Dashboard</h5>
                      </div>
                      <p className="text-sm">Create comprehensive dashboard for school administrators</p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting October 2025</span>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Zap className="h-4 w-4 text-blue-500 mr-2" />
                        <h5 className="font-medium">Curriculum Alignment Tools</h5>
                      </div>
                      <p className="text-sm">Develop tools for tracking and aligning curriculum across grade levels</p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting November 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="relative border-l-2 border-blue-200 pl-6">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold">Phase 4: Advanced AI & Integration</h4>
                      <Badge className="ml-3 bg-amber-100 text-amber-800 border-0">Q1 2026</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enhancing AI capabilities and adding third-party integrations
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                        <h5 className="font-medium">Advanced AI Lesson Planning</h5>
                      </div>
                      <p className="text-sm">
                        Implement full AI capabilities with differentiation and standards alignment
                      </p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting January 2026</span>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                        <h5 className="font-medium">Auto-Grading System</h5>
                      </div>
                      <p className="text-sm">
                        Develop AI-powered grading for multiple choice and short answer questions
                      </p>
                      <div className="mt-2 flex items-center">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-xs text-muted-foreground">Starting February 2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                    Subscribe to Roadmap Updates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can I switch between plans?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be
                    available immediately. If you downgrade, the changes will take effect at the end of your current
                    billing cycle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are AI credits?</AccordionTrigger>
                  <AccordionContent>
                    AI credits are used whenever you generate content using our AI tools, such as lesson plans,
                    worksheets, or assessments. Each generation uses 1 credit. Credits reset at the beginning of each
                    billing cycle. Unused credits roll over for one month to accommodate varying workloads throughout
                    the school year. If you need additional credits, they can be purchased at any time: • 10 additional
                    credits: $4.99 • 25 additional credits: $9.99 • 50 additional credits: $14.99 • 100 additional
                    credits: $24.99
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2b">
                  <AccordionTrigger>How many AI credits do I need?</AccordionTrigger>
                  <AccordionContent>
                    The number of credits you need depends on how frequently you use AI features. As a guideline: • A
                    typical lesson plan uses 1 credit • A worksheet or assessment uses 1 credit • A set of
                    differentiated materials uses 1-3 credits • Parent communication templates use 1 credit Most
                    teachers use between 15-30 credits per month. The Basic plan (15 credits) is suitable for occasional
                    use, while the Pro plan (75 credits) accommodates regular users who rely on AI for daily teaching
                    tasks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is there a discount for schools?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer special pricing for schools and districts. The School plan includes a base number of
                    teacher accounts, and additional accounts can be added at a discounted rate. Please contact our
                    sales team for a custom quote.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I try the premium features before purchasing?</AccordionTrigger>
                  <AccordionContent>
                    We offer a 14-day free trial of our Pro plan. No credit card is required to start your trial. You'll
                    have full access to all Pro features during the trial period.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How secure is my data?</AccordionTrigger>
                  <AccordionContent>
                    We take data security very seriously. All data is encrypted both in transit and at rest. We are
                    FERPA compliant and never share your data with third parties. You can request a full data export or
                    deletion at any time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal.
                    For School plans, we also accept purchase orders and can provide invoicing options.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>When will all the premium features be available?</AccordionTrigger>
                  <AccordionContent>
                    We're actively developing all the premium features according to our roadmap. Basic versions of many
                    features are available now, with enhanced versions rolling out over the next 12 months. Check our
                    Roadmap tab for specific timelines for each feature. All subscribers will automatically get access
                    to new features as they're released.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
