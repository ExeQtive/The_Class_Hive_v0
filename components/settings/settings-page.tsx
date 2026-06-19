"use client"

import { useState } from "react"
import { Check, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [showTaskCalendar, setShowTaskCalendar] = useState(true)
  const [showTasksInMainCalendar, setShowTasksInMainCalendar] = useState(true)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Update your basic account information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="sarah.johnson@school.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Primary Subject</Label>
                <Select defaultValue="math">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="pe">Physical Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="k">Kindergarten</SelectItem>
                    <SelectItem value="1">1st Grade</SelectItem>
                    <SelectItem value="2">2nd Grade</SelectItem>
                    <SelectItem value="3">3rd Grade</SelectItem>
                    <SelectItem value="4">4th Grade</SelectItem>
                    <SelectItem value="5">5th Grade</SelectItem>
                    <SelectItem value="6">6th Grade</SelectItem>
                    <SelectItem value="7">7th Grade</SelectItem>
                    <SelectItem value="8">8th Grade</SelectItem>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="browser-notifications" className="font-medium">
                      Browser Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser.</p>
                  </div>
                  <Switch id="browser-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="task-reminders" className="font-medium">
                      Task Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">Get reminders for upcoming tasks and deadlines.</p>
                  </div>
                  <Switch id="task-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="parent-messages" className="font-medium">
                      Parent Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">Get notified when parents send you messages.</p>
                  </div>
                  <Switch id="parent-messages" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how TeachFlow looks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup defaultValue="light" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="light" className="sr-only" />
                    <Label
                      htmlFor="light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 rounded-md bg-white p-2 shadow-sm border">
                        <div className="h-2 w-8 rounded-lg bg-primary mb-2" />
                        <div className="h-2 w-12 rounded-lg bg-gray-200" />
                      </div>
                      <span>Light</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="dark" className="sr-only" />
                    <Label
                      htmlFor="dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-950 p-4 hover:bg-gray-900 hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 rounded-md bg-gray-800 p-2 shadow-sm border border-gray-700">
                        <div className="h-2 w-8 rounded-lg bg-primary mb-2" />
                        <div className="h-2 w-12 rounded-lg bg-gray-700" />
                      </div>
                      <span className="text-white">Dark</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="system" className="sr-only" />
                    <Label
                      htmlFor="system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gradient-to-r from-white to-gray-950 p-4 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-900 hover:border-accent [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 rounded-md bg-gradient-to-r from-white to-gray-800 p-2 shadow-sm border">
                        <div className="h-2 w-8 rounded-lg bg-primary mb-2" />
                        <div className="h-2 w-12 rounded-lg bg-gradient-to-r from-gray-200 to-gray-700" />
                      </div>
                      <span className="bg-gradient-to-r from-black to-white bg-clip-text text-transparent font-medium">
                        System
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select defaultValue="teal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teal">Teal</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Preferences</CardTitle>
              <CardDescription>Customize which features are enabled and how they work.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Calendar & Task Management</h3>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-task-calendar" className="font-medium">
                        Show Calendar in Task Management
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable the calendar view in the Task Management section.
                      </p>
                    </div>
                    <Switch id="show-task-calendar" checked={showTaskCalendar} onCheckedChange={setShowTaskCalendar} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-tasks-in-calendar" className="font-medium">
                        Show Tasks in Main Calendar
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Display tasks with due dates in the main Calendar view.
                      </p>
                    </div>
                    <Switch
                      id="show-tasks-in-calendar"
                      checked={showTasksInMainCalendar}
                      onCheckedChange={setShowTasksInMainCalendar}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Student Management</h3>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-performance-metrics" className="font-medium">
                        Show Performance Metrics
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Display student performance metrics in student cards and lists.
                      </p>
                    </div>
                    <Switch id="show-performance-metrics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-student-notes" className="font-medium">
                        Enable Student Notes
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow adding private notes to student profiles.</p>
                    </div>
                    <Switch id="enable-student-notes" defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Lesson Planning</h3>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-save-lessons" className="font-medium">
                        Auto-Save Lessons
                      </Label>
                      <p className="text-sm text-muted-foreground">Automatically save lesson plans while editing.</p>
                    </div>
                    <Switch id="auto-save-lessons" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="lesson-templates" className="font-medium">
                        Enable Lesson Templates
                      </Label>
                      <p className="text-sm text-muted-foreground">Allow creating and using lesson plan templates.</p>
                    </div>
                    <Switch id="lesson-templates" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options for your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-sync">Data Synchronization</Label>
                <Select defaultValue="auto">
                  <SelectTrigger>
                    <SelectValue placeholder="Select sync option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automatic (Recommended)</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="offline-mode" className="font-medium">
                      Offline Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">Allow the app to work without internet connection.</p>
                  </div>
                  <Switch id="offline-mode" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-collection" className="font-medium">
                      Usage Data Collection
                    </Label>
                    <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data.</p>
                  </div>
                  <Switch id="data-collection" defaultChecked />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="export-data">Export Your Data</Label>
                <Button variant="outline" className="w-full justify-start">
                  Export All Data
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delete-account" className="text-destructive">
                  Danger Zone
                </Label>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
