// @ts-nocheck
// @ts-nocheck
"use client"

import { ArrowLeft, Download, Edit, FileText, Star, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ResourceDetailProps {
  resource: any
  onBack: () => void
  onEdit: () => void
  onDelete: (resourceId: string) => void
  onToggleFavorite: (resourceId: string) => void
}

export function ResourceDetail({ resource, onBack, onEdit, onDelete, onToggleFavorite }: ResourceDetailProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM d, yyyy")
  }

  const getFileFormatBadge = (format: string) => {
    switch (format) {
      case "pdf":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            PDF
          </Badge>
        )
      case "docx":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            DOCX
          </Badge>
        )
      case "pptx":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            PPTX
          </Badge>
        )
      case "xlsx":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            XLSX
          </Badge>
        )
      case "html":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            HTML
          </Badge>
        )
      default:
        return <Badge variant="outline">{format.toUpperCase()}</Badge>
    }
  }

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "worksheet":
        return "📝"
      case "presentation":
        return "🖥️"
      case "activity":
        return "🎮"
      case "guide":
        return "📚"
      case "poster":
        return "🖼️"
      case "reference":
        return "📋"
      case "quiz":
        return "❓"
      case "toolkit":
        return "🧰"
      default:
        return "📄"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Library
        </Button>
      </div>

      <Card>
        <CardHeader className="p-0">
          <div className="aspect-video w-full bg-muted relative">
            <img
              src={resource.thumbnail || "/placeholder.svg"}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {getFileFormatBadge(resource.format)}
              <Badge variant="secondary">
                {getResourceTypeIcon(resource.type)} {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{resource.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>Uploaded on {formatDate(resource.uploadDate)}</span>
                <span>•</span>
                <span>by {resource.uploadedBy}</span>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground">{resource.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:text-right">
              <Button className="w-full md:w-auto" onClick={() => window.open(resource.url, "_blank")}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="w-full md:w-auto" onClick={() => onToggleFavorite(resource.id)}>
                <Star className={cn("h-4 w-4 mr-2", resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "")} />
                {resource.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject:</span>
                  <span className="font-medium">{resource.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grade Level:</span>
                  <span className="font-medium">
                    {resource.gradeLevel.length === 0
                      ? "Not specified"
                      : `Grade${resource.gradeLevel.length > 1 ? "s" : ""} ${resource.gradeLevel.join(", ")}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Format:</span>
                  <span className="font-medium">{resource.format.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="font-medium">{resource.fileSize}</span>
                </div>
                {resource.pages && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pages:</span>
                    <span className="font-medium">{resource.pages}</span>
                  </div>
                )}
                {resource.slides && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Slides:</span>
                    <span className="font-medium">{resource.slides}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Downloads:</span>
                  <span className="font-medium">{resource.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorites:</span>
                  <span className="font-medium">{resource.favorites}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="text-lg font-medium mt-6 mb-4">Preview</h3>
              <div className="border rounded-md p-6 flex flex-col items-center justify-center bg-muted/20 h-48">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">Preview not available</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  Download to View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between p-6">
          <Button variant="destructive" onClick={() => onDelete(resource.id)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete Resource
          </Button>
          <Button onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Resource
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
