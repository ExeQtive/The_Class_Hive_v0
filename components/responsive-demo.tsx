// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Laptop, Smartphone, Download } from "lucide-react"

export function ResponsiveDemo() {
  const [activeView, setActiveView] = useState("browser")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>TeachFlow Platform Compatibility</CardTitle>
        <CardDescription>View how TeachFlow works across different devices and platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="browser" value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="browser" className="flex items-center gap-2">
              <Laptop className="h-4 w-4" />
              <span className="hidden sm:inline">Browser</span>
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Desktop App</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browser" className="mt-0">
            <div className="rounded-md overflow-hidden border">
              <div className="bg-slate-100 dark:bg-slate-800 p-2 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-slate-700 rounded text-xs py-1 px-2 text-center text-slate-500 dark:text-slate-300">
                  teachflow.app
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center p-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Full-Featured Web Application</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Access all features from any modern browser on any device
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded">
                      Chrome
                    </span>
                    <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded">
                      Firefox
                    </span>
                    <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded">
                      Safari
                    </span>
                    <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded">
                      Edge
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-0">
            <div className="rounded-md overflow-hidden border max-w-[300px] mx-auto">
              <div className="bg-slate-800 p-2 flex justify-center">
                <div className="w-20 h-1 bg-slate-600 rounded-full"></div>
              </div>
              <div className="aspect-[9/16] bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center p-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Responsive Mobile Design</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Optimized for touch interfaces and smaller screens
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 rounded">
                      iOS
                    </span>
                    <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 rounded">
                      Android
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800 p-4 flex justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-slate-600"></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="desktop" className="mt-0">
            <div className="rounded-md overflow-hidden border">
              <div className="bg-slate-200 dark:bg-slate-800 p-2 flex items-center justify-between">
                <div className="text-xs font-medium">TeachFlow Desktop</div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center p-4">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Desktop Application</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Native-like experience with offline capabilities
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center text-xs">
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded">
                      Windows
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded">
                      macOS
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded">
                      Linux
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            const nextView = {
              browser: "mobile",
              mobile: "desktop",
              desktop: "browser",
            }[activeView]
            setActiveView(nextView as string)
          }}
        >
          View Next Platform
        </Button>
      </CardFooter>
    </Card>
  )
}
