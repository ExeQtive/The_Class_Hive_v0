import { ResponsiveDemo } from "@/components/responsive-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function PreviewPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">
        TeachFlow Platform Preview
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Preview Without Database</CardTitle>
            <CardDescription>How to preview TeachFlow without Prisma support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TeachFlow uses mock data for previews, allowing you to test the UI and interactions without a database
              connection.
            </p>

            <Tabs defaultValue="mock">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="mock">Mock Data</TabsTrigger>
                <TabsTrigger value="local">Local Dev</TabsTrigger>
                <TabsTrigger value="deploy">Full Deploy</TabsTrigger>
              </TabsList>

              <TabsContent value="mock" className="space-y-4 mt-4">
                <p className="text-sm">
                  The app automatically uses mock data when no database is available, perfect for UI development and
                  demos.
                </p>
                <Button variant="outline" size="sm">
                  View Demo with Mock Data
                </Button>
              </TabsContent>

              <TabsContent value="local" className="space-y-4 mt-4">
                <p className="text-sm">
                  For local development with a database, run a local PostgreSQL instance or use a service like Neon or
                  Supabase.
                </p>
                <Button variant="outline" size="sm">
                  Setup Local Database
                </Button>
              </TabsContent>

              <TabsContent value="deploy" className="space-y-4 mt-4">
                <p className="text-sm">
                  For a full deployment with Prisma, deploy to Vercel and connect to a PostgreSQL database like Vercel
                  Postgres.
                </p>
                <Button variant="outline" size="sm">
                  Deploy to Vercel
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <ResponsiveDemo />
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">TeachFlow Platform Compatibility</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-500"
              >
                <rect width="18" height="12" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="2" x2="22" y1="20" y2="20"></line>
              </svg>
              Web Application
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The primary platform is a responsive web application that works on all modern browsers. Access from any
              device with an internet connection.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-500"
              >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
              </svg>
              Mobile Responsive
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              TeachFlow is fully responsive and works on smartphones and tablets. The UI adapts to smaller screens for
              on-the-go access.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-500"
              >
                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path>
              </svg>
              Desktop Application
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              For offline access, TeachFlow can be packaged as a desktop application using Electron or Tauri, available
              for Windows, macOS, and Linux.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
