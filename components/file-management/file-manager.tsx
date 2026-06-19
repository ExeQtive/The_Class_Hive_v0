"use client"

import { useState, useEffect } from "react"
import { listFiles, deleteFile, type FileType } from "@/lib/supabase-storage"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Eye, FileIcon, ImageIcon, FileText, FileArchive, Film } from "lucide-react"
import { formatBytes } from "@/lib/utils"

interface FileManagerProps {
  defaultBucket?: FileType
  onSelect?: (fileUrl: string) => void
  selectable?: boolean
}

export function FileManager({ defaultBucket = "resource", onSelect, selectable = false }: FileManagerProps) {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeBucket, setActiveBucket] = useState<FileType>(defaultBucket)
  const { toast } = useToast()

  useEffect(() => {
    loadFiles(activeBucket)
  }, [activeBucket])

  const loadFiles = async (bucket: FileType) => {
    setLoading(true)
    try {
      const fileList = await listFiles(bucket)
      setFiles(fileList)
    } catch (error) {
      console.error("Error loading files:", error)
      toast({
        title: "Error loading files",
        description: "There was a problem loading your files.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (path: string) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await deleteFile(path, activeBucket)
        toast({
          title: "File deleted",
          description: "The file has been successfully deleted.",
        })
        loadFiles(activeBucket)
      } catch (error) {
        console.error("Error deleting file:", error)
        toast({
          title: "Error deleting file",
          description: "There was a problem deleting the file.",
          variant: "destructive",
        })
      }
    }
  }

  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase()

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) {
      return <ImageIcon className="h-6 w-6" />
    } else if (["mp4", "webm", "mov"].includes(ext || "")) {
      return <Film className="h-6 w-6" />
    } else if (["pdf", "doc", "docx", "txt"].includes(ext || "")) {
      return <FileText className="h-6 w-6" />
    } else if (["zip", "rar", "7z", "tar", "gz"].includes(ext || "")) {
      return <FileArchive className="h-6 w-6" />
    } else {
      return <FileIcon className="h-6 w-6" />
    }
  }

  const isImage = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase()
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>File Manager</CardTitle>
        <CardDescription>Manage your uploaded files</CardDescription>
      </CardHeader>
      <Tabs defaultValue={activeBucket} onValueChange={(value) => setActiveBucket(value as FileType)}>
        <div className="px-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="resource">Resources</TabsTrigger>
            <TabsTrigger value="avatar">Avatars</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="attachment">Attachments</TabsTrigger>
          </TabsList>
        </div>

        {["resource", "avatar", "document", "attachment"].map((bucket) => (
          <TabsContent key={bucket} value={bucket} className="m-0">
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No files found in this bucket</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file) => {
                    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${file.name}`

                    return (
                      <div key={file.id} className="border rounded-lg overflow-hidden">
                        <div className="h-32 bg-muted flex items-center justify-center p-4">
                          {isImage(file.name) ? (
                            <img
                              src={fileUrl || "/placeholder.svg"}
                              alt={file.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center">
                              {getFileIcon(file.name)}
                              <span className="text-xs mt-2 text-center break-all">{file.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="text-sm font-medium truncate" title={file.name}>
                            {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{formatBytes(file.metadata?.size || 0)}</div>
                          <div className="flex mt-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => window.open(fileUrl, "_blank")}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            {selectable && (
                              <Button
                                variant="default"
                                size="sm"
                                className="flex-1"
                                onClick={() => onSelect && onSelect(fileUrl)}
                              >
                                Select
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-none"
                              onClick={() => handleDelete(file.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </TabsContent>
        ))}
      </Tabs>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="outline" onClick={() => loadFiles(activeBucket)}>
          Refresh
        </Button>
      </CardFooter>
    </Card>
  )
}
