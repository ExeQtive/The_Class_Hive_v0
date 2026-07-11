// @ts-nocheck
// @ts-nocheck
"use client"

import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, Edit, MoreHorizontal, Star, Trash, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Resource {
  id: string
  title: string
  description: string
  uploadDate: Date
  downloads: number
  isFavorite: boolean
  subject: string
  gradeLevel: string[]
  type: string
  format: string
  thumbnail?: string
}

interface ResourceGridProps {
  resources: Resource[]
  onView: (resource: Resource) => void
  onEdit: (resource: Resource) => void
  onDelete: (resourceId: string) => void
  onToggleFavorite: (resourceId: string) => void
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString(undefined, options)
}

const getResourceTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "lesson":
      return "📚"
    case "worksheet":
      return "📝"
    case "presentation":
      return " slides"
    case "assessment":
      return "✅"
    default:
      return "📄"
  }
}

const getFileFormatBadge = (format: string) => {
  const formatColorMap: { [key: string]: string } = {
    pdf: "bg-red-100 text-red-500",
    docx: "bg-blue-100 text-blue-500",
    pptx: "bg-orange-100 text-orange-500",
    xlsx: "bg-green-100 text-green-500",
    mp4: "bg-purple-100 text-purple-500",
    mp3: "bg-yellow-100 text-yellow-500",
  }

  const badgeColor = formatColorMap[format.toLowerCase()] || "bg-gray-100 text-gray-500"

  return (
    <Badge variant="secondary" className={`text-xs ${badgeColor}`}>
      {format.toUpperCase()}
    </Badge>
  )
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ resources, onView, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {resources.map((resource) => (
        <Card
          key={resource.id}
          className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          <div
            className="aspect-video bg-muted relative cursor-pointer overflow-hidden"
            onClick={() => onView(resource)}
          >
            <img
              src={resource.thumbnail || "/placeholder.svg"}
              alt={resource.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-2 flex gap-1">{getFileFormatBadge(resource.format)}</div>
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs bg-white/80 backdrop-blur-sm">
                {getResourceTypeIcon(resource.type)} {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-medium text-white line-clamp-1">{resource.title}</h3>
              <p className="text-xs text-white/80 line-clamp-1">{resource.description}</p>
            </div>
          </div>
          <CardContent className="p-4 flex-1 bg-gradient-to-b from-white to-cyan-50">
            <div className="flex justify-between items-start gap-2">
              <h3
                className="font-medium line-clamp-2 hover:text-primary cursor-pointer transition-colors"
                onClick={() => onView(resource)}
              >
                {resource.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 text-cyan-500 hover:bg-cyan-100">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2">
                  <DropdownMenuItem
                    onClick={() => onView(resource)}
                    className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                  >
                    <User className="mr-2 h-4 w-4 text-cyan-500" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onEdit(resource)}
                    className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                  >
                    <Edit className="mr-2 h-4 w-4 text-teal-500" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onToggleFavorite(resource.id)}
                    className="cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                  >
                    <Star
                      className={cn("mr-2 h-4 w-4", resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "")}
                    />
                    {resource.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer flex items-center p-2 gap-x-2 rounded-lg"
                    onClick={() => onDelete(resource.id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                {resource.subject}
              </Badge>
              {resource.gradeLevel.length > 0 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                >
                  Grade{resource.gradeLevel.length > 1 ? "s" : ""} {resource.gradeLevel.join(", ")}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto bg-gradient-to-r from-cyan-50 to-teal-50">
            <div className="text-xs text-muted-foreground">{formatDate(resource.uploadDate)}</div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  resource.isFavorite ? "text-yellow-500 hover:bg-yellow-100" : "hover:bg-amber-100",
                )}
                onClick={() => onToggleFavorite(resource.id)}
              >
                <Star
                  className={cn(
                    "h-4 w-4",
                    resource.isFavorite ? "fill-yellow-400 text-yellow-400 animate-pulse-slow" : "",
                  )}
                />
                <span className="sr-only">{resource.isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
              </Button>
              <div className="flex items-center text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full">
                <Download className="h-3 w-3 mr-1 text-teal-500" />
                {resource.downloads}
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ResourceGrid
