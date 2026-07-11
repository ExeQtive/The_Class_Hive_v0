// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "./file-uploader"
import { FileList } from "./file-list"
import { type FileType, listFiles } from "@/lib/supabase-storage"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FileManagementPage() {
  const [activeTab, setActiveTab] = useState<FileType>("resource")
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchFiles = async () => {
    setLoading(true)
    setError(null)
    try {
      const fileList = await listFiles(activeTab)
      setFiles(fileList)
    } catch (err) {
      console.error("Error fetching files:", err)
      setError(err instanceof Error ? err.message : "Failed to load files")
      toast({
        title: "Error loading files",
        description: "There was a problem loading your files. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [activeTab])

  const handleFileUploaded = () => {
    fetchFiles()
    toast({
      title: "File uploaded",
      description: "Your file has been uploaded successfully.",
    })
  }

  const handleFileDeleted = () => {
    fetchFiles()
    toast({
      title: "File deleted",
      description: "Your file has been deleted successfully.",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Management</h1>
          <p className="text-muted-foreground">Upload, organize, and manage your teaching resources and documents.</p>
        </div>
      </div>

      <Tabs defaultValue="resource" value={activeTab} onValueChange={(value) => setActiveTab(value as FileType)}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="resource">Teaching Resources</TabsTrigger>
          <TabsTrigger value="document">Student Documents</TabsTrigger>
          <TabsTrigger value="attachment">Lesson Attachments</TabsTrigger>
          <TabsTrigger value="avatar">Profile Images</TabsTrigger>
        </TabsList>

        {error && error.includes("Supabase") ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Storage Not Available</AlertTitle>
            <AlertDescription>
              The file storage system is not properly configured. Please contact your administrator.
            </AlertDescription>
          </Alert>
        ) : null}

        <TabsContent value="resource" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Resources</CardTitle>
              <CardDescription>
                Upload and manage worksheets, presentations, and other teaching materials.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader type="resource" onFileUploaded={handleFileUploaded} />

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <FileList files={files} type="resource" onFileDeleted={handleFileDeleted} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="document" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Documents</CardTitle>
              <CardDescription>Store and organize student assignments, reports, and other documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader type="document" onFileUploaded={handleFileUploaded} />

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <FileList files={files} type="document" onFileDeleted={handleFileDeleted} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Attachments</CardTitle>
              <CardDescription>Manage files that are attached to specific lessons or units.</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader type="attachment" onFileUploaded={handleFileUploaded} />

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <FileList files={files} type="attachment" onFileDeleted={handleFileDeleted} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avatar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Images</CardTitle>
              <CardDescription>Upload and manage profile pictures for yourself and students.</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader type="avatar" onFileUploaded={handleFileUploaded} />

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <FileList files={files} type="avatar" onFileDeleted={handleFileDeleted} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
