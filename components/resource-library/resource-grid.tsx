// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
"use client"

import { Download, Edit, MoreHorizontal, Star, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ResourceGridProps {
  resources: any[]
  onView: (resource: any) => void
  onEdit: (resource: any) => void
  onDelete: (resourceId: string) => void
  onToggleFavorite: (resourceId: string) => void
}

export function ResourceGrid({ resources, onView, onEdit, onDelete, onToggleFavorite }: ResourceGridProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
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

  return (
    <div>
      {resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-violet-700 font-medium mb-2">No resources found</p>
          <p className="text-sm text-violet-600 text-center">Try adjusting your filters or upload a new resource.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="overflow-hidden flex flex-col h-full group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50"
            >
              <div
                className="aspect-video bg-muted relative cursor-pointer overflow-hidden"
                onClick={() => onView(resource)}
              >
                <img
                  src={resource.thumbnail || "/placeholder.svg"}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-1">{getFileFormatBadge(resource.format)}</div>
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/70">
                    {getResourceTypeIcon(resource.type)}{" "}
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 flex-1 relative">
                <div className="absolute -top-6 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <span className="text-white text-xs font-bold">{resource.format.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <h3
                    className="font-medium line-clamp-2 hover:text-primary cursor-pointer group-hover:text-violet-700 transition-colors"
                    onClick={() => onView(resource)}
                  >
                    {resource.title}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(resource)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(resource)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleFavorite(resource.id)}>
                        <Star
                          className={cn("mr-2 h-4 w-4", resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "")}
                        />
                        {resource.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(resource.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 text-violet-700"
                  >
                    {resource.subject}
                  </Badge>
                  {resource.gradeLevel.length > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700"
                    >
                      Grade{resource.gradeLevel.length > 1 ? "s" : ""} {resource.gradeLevel.join(", ")}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto bg-gradient-to-r from-violet-50/50 to-purple-50/50">
                <div className="text-xs text-muted-foreground">{formatDate(resource.uploadDate)}</div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-violet-100 hover:text-violet-700"
                    onClick={() => onToggleFavorite(resource.id)}
                  >
                    <Star className={cn("h-4 w-4", resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "")} />
                    <span className="sr-only">
                      {resource.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </span>
                  </Button>
                  <div className="flex items-center text-xs text-violet-600 font-medium">
                    <Download className="h-3 w-3 mr-1" />
                    {resource.downloads}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
