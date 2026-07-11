// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
"use client"

import { Download, Edit, MoreHorizontal, Star, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ResourceListProps {
  resources: any[]
  onView: (resource: any) => void
  onEdit: (resource: any) => void
  onDelete: (resourceId: string) => void
  onToggleFavorite: (resourceId: string) => void
}

export function ResourceList({ resources, onView, onEdit, onDelete, onToggleFavorite }: ResourceListProps) {
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
          <Badge variant="outline" className="bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200">
            PDF
          </Badge>
        )
      case "docx":
        return (
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200">
            DOCX
          </Badge>
        )
      case "pptx":
        return (
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200"
          >
            PPTX
          </Badge>
        )
      case "xlsx":
        return (
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200"
          >
            XLSX
          </Badge>
        )
      case "html":
        return (
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border-purple-200"
          >
            HTML
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gradient-to-r from-gray-50 to-slate-50">
            {format.toUpperCase()}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      {resources.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-violet-700 font-medium mb-2">No resources found</p>
          <p className="text-sm text-violet-600 text-center">Try adjusting your filters or upload a new resource.</p>
        </div>
      ) : (
        resources.map((resource) => (
          <Card
            key={resource.id}
            className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div
                  className="w-full md:w-48 h-32 bg-muted relative cursor-pointer flex-shrink-0 overflow-hidden group"
                  onClick={() => onView(resource)}
                >
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs backdrop-blur-sm bg-white/70">
                      {getResourceTypeIcon(resource.type)}{" "}
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex-1 relative">
                  <div className="absolute -top-3 right-4 md:-left-6 md:top-4 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 z-10">
                    <span className="text-white text-xs font-bold">{resource.format.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3
                        className="font-medium hover:text-violet-700 transition-colors cursor-pointer"
                        onClick={() => onView(resource)}
                      >
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs text-violet-600">Uploaded {formatDate(resource.uploadDate)}</div>
                        <div className="text-xs text-muted-foreground">by {resource.uploadedBy}</div>
                      </div>
                    </div>
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
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{resource.description}</p>
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
                    {resource.tags.slice(0, 3).map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                      >
                        +{resource.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm">
                        <Download className="h-3.5 w-3.5 mr-1 text-violet-600" />
                        <span className="text-violet-600 font-medium">{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star
                          className={cn(
                            "h-3.5 w-3.5 mr-1",
                            resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-violet-600",
                          )}
                        />
                        <span
                          className={
                            resource.isFavorite ? "text-yellow-600 font-medium" : "text-violet-600 font-medium"
                          }
                        >
                          {resource.favorites} favorites
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-8 transition-colors",
                          resource.isFavorite
                            ? "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            : "text-violet-600 hover:text-violet-700 hover:bg-violet-50",
                        )}
                        onClick={() => onToggleFavorite(resource.id)}
                      >
                        <Star
                          className={cn("h-4 w-4 mr-1", resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "")}
                        />
                        {resource.isFavorite ? "Favorited" : "Favorite"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 hover:border-violet-300"
                        onClick={() => onView(resource)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
