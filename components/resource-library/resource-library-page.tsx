// @ts-nocheck
"use client"

import { useState } from "react"
import { BookOpen, Filter, Grid, List, Search, SortAsc, Star, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceGrid } from "@/components/resource-library/resource-grid"
import { ResourceList } from "@/components/resource-library/resource-list"
import { ResourceUploader } from "@/components/resource-library/resource-uploader"
import { ResourceDetail } from "@/components/resource-library/resource-detail"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ResourceCategories } from "@/components/resource-library/resource-categories"
import { ResourceCollections } from "@/components/resource-library/resource-collections"

// Sample data for demonstration
const sampleResources = [
  {
    id: "resource-1",
    title: "Fractions Worksheet Bundle",
    description: "A comprehensive set of worksheets covering all fraction operations for grades 4-5.",
    type: "worksheet",
    format: "pdf",
    subject: "Math",
    gradeLevel: ["4", "5"],
    tags: ["fractions", "operations", "printable"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Fractions+Worksheet",
    url: "#",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-04-15",
    downloads: 128,
    favorites: 42,
    isFavorite: true,
    isPublic: true,
    fileSize: "2.4 MB",
    pages: 12,
  },
  {
    id: "resource-2",
    title: "States of Matter Interactive Presentation",
    description: "An engaging presentation with animations and interactive elements about the states of matter.",
    type: "presentation",
    format: "pptx",
    subject: "Science",
    gradeLevel: ["5"],
    tags: ["states of matter", "interactive", "slides"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=States+of+Matter",
    url: "#",
    uploadedBy: "Michael Chen",
    uploadDate: "2023-03-22",
    downloads: 95,
    favorites: 31,
    isFavorite: false,
    isPublic: true,
    fileSize: "5.7 MB",
    slides: 24,
  },
  {
    id: "resource-3",
    title: "American Revolution Timeline Activity",
    description:
      "A collaborative timeline activity for students to understand the key events of the American Revolution.",
    type: "activity",
    format: "docx",
    subject: "Social Studies",
    gradeLevel: ["5"],
    tags: ["american revolution", "timeline", "collaborative"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Revolution+Timeline",
    url: "#",
    uploadedBy: "Emma Wilson",
    uploadDate: "2023-05-02",
    downloads: 76,
    favorites: 18,
    isFavorite: true,
    isPublic: true,
    fileSize: "1.8 MB",
    pages: 8,
  },
  {
    id: "resource-4",
    title: "Poetry Analysis Graphic Organizers",
    description: "A set of graphic organizers to help students analyze and understand poetry elements.",
    type: "worksheet",
    format: "pdf",
    subject: "Language Arts",
    gradeLevel: ["4", "5", "6"],
    tags: ["poetry", "analysis", "graphic organizers"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Poetry+Analysis",
    url: "#",
    uploadedBy: "David Rodriguez",
    uploadDate: "2023-02-18",
    downloads: 152,
    favorites: 47,
    isFavorite: false,
    isPublic: true,
    fileSize: "3.1 MB",
    pages: 15,
  },
  {
    id: "resource-5",
    title: "Watercolor Techniques Guide",
    description: "A step-by-step guide for teaching basic watercolor techniques to elementary students.",
    type: "guide",
    format: "pdf",
    subject: "Art",
    gradeLevel: ["3", "4", "5"],
    tags: ["watercolor", "painting", "techniques"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Watercolor+Guide",
    url: "#",
    uploadedBy: "Olivia Park",
    uploadDate: "2023-04-30",
    downloads: 89,
    favorites: 36,
    isFavorite: true,
    isPublic: true,
    fileSize: "4.2 MB",
    pages: 10,
  },
  {
    id: "resource-6",
    title: "Multiplication Strategies Posters",
    description: "A set of colorful posters illustrating different multiplication strategies for classroom display.",
    type: "poster",
    format: "pdf",
    subject: "Math",
    gradeLevel: ["3", "4"],
    tags: ["multiplication", "strategies", "visual aids"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Multiplication+Posters",
    url: "#",
    uploadedBy: "James Thompson",
    uploadDate: "2023-03-15",
    downloads: 203,
    favorites: 65,
    isFavorite: false,
    isPublic: true,
    fileSize: "8.5 MB",
    pages: 8,
  },
  {
    id: "resource-7",
    title: "Plant Life Cycle Lab Activity",
    description: "A hands-on lab activity for students to observe and document the plant life cycle.",
    type: "activity",
    format: "pdf",
    subject: "Science",
    gradeLevel: ["2", "3", "4"],
    tags: ["plants", "life cycle", "lab"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Plant+Life+Cycle",
    url: "#",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-05-10",
    downloads: 67,
    favorites: 22,
    isFavorite: false,
    isPublic: true,
    fileSize: "2.8 MB",
    pages: 6,
  },
  {
    id: "resource-8",
    title: "Grammar Rules Cheat Sheet",
    description: "A comprehensive cheat sheet covering essential grammar rules for elementary students.",
    type: "reference",
    format: "pdf",
    subject: "Language Arts",
    gradeLevel: ["3", "4", "5", "6"],
    tags: ["grammar", "reference", "rules"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Grammar+Rules",
    url: "#",
    uploadedBy: "Emma Wilson",
    uploadDate: "2023-04-05",
    downloads: 184,
    favorites: 59,
    isFavorite: true,
    isPublic: true,
    fileSize: "1.2 MB",
    pages: 4,
  },
  {
    id: "resource-9",
    title: "World Map Interactive Quiz",
    description: "An interactive digital quiz to help students learn countries, capitals, and geographical features.",
    type: "quiz",
    format: "html",
    subject: "Social Studies",
    gradeLevel: ["4", "5", "6"],
    tags: ["geography", "maps", "interactive"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=World+Map+Quiz",
    url: "#",
    uploadedBy: "Michael Chen",
    uploadDate: "2023-03-28",
    downloads: 112,
    favorites: 41,
    isFavorite: false,
    isPublic: true,
    fileSize: "3.6 MB",
  },
  {
    id: "resource-10",
    title: "Classroom Management Strategies",
    description: "A guide for teachers on effective classroom management strategies and techniques.",
    type: "guide",
    format: "pdf",
    subject: "Professional Development",
    gradeLevel: ["K", "1", "2", "3", "4", "5", "6"],
    tags: ["classroom management", "behavior", "teacher resource"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Classroom+Management",
    url: "#",
    uploadedBy: "David Rodriguez",
    uploadDate: "2023-02-10",
    downloads: 245,
    favorites: 87,
    isFavorite: true,
    isPublic: true,
    fileSize: "5.3 MB",
    pages: 22,
  },
  {
    id: "resource-11",
    title: "Seasonal Art Projects Bundle",
    description: "A collection of art projects for each season, complete with templates and instructions.",
    type: "activity",
    format: "pdf",
    subject: "Art",
    gradeLevel: ["K", "1", "2", "3", "4"],
    tags: ["art", "seasonal", "projects"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Seasonal+Art",
    url: "#",
    uploadedBy: "Olivia Park",
    uploadDate: "2023-01-15",
    downloads: 178,
    favorites: 63,
    isFavorite: false,
    isPublic: true,
    fileSize: "12.7 MB",
    pages: 35,
  },
  {
    id: "resource-12",
    title: "Reading Comprehension Strategies Toolkit",
    description: "A comprehensive toolkit for teaching and reinforcing reading comprehension strategies.",
    type: "toolkit",
    format: "pdf",
    subject: "Language Arts",
    gradeLevel: ["3", "4", "5"],
    tags: ["reading", "comprehension", "strategies"],
    thumbnail: "/placeholder.svg?height=400&width=600&text=Reading+Strategies",
    url: "#",
    uploadedBy: "James Thompson",
    uploadDate: "2023-04-22",
    downloads: 156,
    favorites: 52,
    isFavorite: true,
    isPublic: true,
    fileSize: "7.8 MB",
    pages: 28,
  },
]

export function ResourceLibraryPage() {
  const [view, setView] = useState<"grid" | "list" | "categories" | "collections" | "upload" | "detail">("grid")
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid")
  const [selectedResource, setSelectedResource] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [gradeLevelFilter, setGradeLevelFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [resources, setResources] = useState(sampleResources)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("grid")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = subjectFilter === "all" || resource.subject === subjectFilter
    const matchesType = typeFilter === "all" || resource.type === typeFilter
    const matchesGradeLevel = gradeLevelFilter === "all" || resource.gradeLevel.includes(gradeLevelFilter)
    const matchesFavorites = !showFavoritesOnly || resource.isFavorite

    return matchesSearch && matchesSubject && matchesType && matchesGradeLevel && matchesFavorites
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "downloads") {
      return b.downloads - a.downloads
    } else if (sortBy === "favorites") {
      return b.favorites - a.favorites
    } else {
      return 0
    }
  })

  const handleViewResource = (resource: any) => {
    setSelectedResource(resource)
    setView("detail")
  }

  const handleUploadResource = () => {
    setSelectedResource(null)
    setView("upload")
  }

  const handleEditResource = (resource: any) => {
    setSelectedResource(resource)
    setView("upload")
  }

  const handleDeleteResource = (resourceId: string) => {
    setResources(resources.filter((resource) => resource.id !== resourceId))
    if (selectedResource && selectedResource.id === resourceId) {
      setSelectedResource(null)
      setView(displayMode)
    }
  }

  const handleToggleFavorite = (resourceId: string) => {
    setResources(
      resources.map((resource) => {
        if (resource.id === resourceId) {
          const newFavoriteStatus = !resource.isFavorite
          return {
            ...resource,
            isFavorite: newFavoriteStatus,
            favorites: newFavoriteStatus ? resource.favorites + 1 : resource.favorites - 1,
          }
        }
        return resource
      }),
    )
  }

  const handleSaveResource = (resource: any) => {
    // In a real app, this would save to a database
    const isNewResource = !resource.id || resource.id.startsWith("new-")

    if (isNewResource) {
      // Add new resource
      const newResource = {
        ...resource,
        id: `resource-${Date.now()}`,
        uploadDate: new Date().toISOString().split("T")[0],
        downloads: 0,
        favorites: 0,
        isFavorite: false,
      }
      setResources([...resources, newResource])
    } else {
      // Update existing resource
      setResources(resources.map((r) => (r.id === resource.id ? { ...r, ...resource } : r)))
    }

    setView(displayMode)
    setSelectedResource(null)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSubjectFilter("all")
    setTypeFilter("all")
    setGradeLevelFilter("all")
    setShowFavoritesOnly(false)
  }

  const handleBackToLibrary = () => {
    setSelectedResource(null)
    setView(displayMode)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-8 rounded-lg text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
          <p className="text-violet-100 mb-6">
            Discover, share, and organize educational resources to enhance your teaching experience.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="bg-white text-violet-700 hover:bg-violet-50 hover:text-violet-800"
              onClick={() => setActiveTab("upload")}
            >
              Upload New Resource
            </Button>
            <Button
              variant="outline"
              className="bg-violet-600/30 text-white border-violet-400 hover:bg-violet-600/50 hover:text-white"
              onClick={() => setActiveTab("collections")}
            >
              Browse Collections
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="grid"
          className="w-full"
          value={view === "detail" || view === "upload" ? displayMode : view}
          onValueChange={(value) => {
            if (value === "grid" || value === "list") {
              setDisplayMode(value as "grid" | "list")
            }
            setView(value as any)
          }}
        >
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center">
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Collections
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={handleUploadResource}>
          <Upload className="mr-2 h-4 w-4" /> Upload Resource
        </Button>
      </div>

      {(view === "grid" || view === "list") && (
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter Resources</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Subject</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setSubjectFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", subjectFilter === "all" ? "bg-primary/10" : "")}>
                      All
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubjectFilter("Math")}>
                    <Badge variant="outline" className={cn("mr-2", subjectFilter === "Math" ? "bg-primary/10" : "")}>
                      Math
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubjectFilter("Science")}>
                    <Badge variant="outline" className={cn("mr-2", subjectFilter === "Science" ? "bg-primary/10" : "")}>
                      Science
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubjectFilter("Language Arts")}>
                    <Badge
                      variant="outline"
                      className={cn("mr-2", subjectFilter === "Language Arts" ? "bg-primary/10" : "")}
                    >
                      Language Arts
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubjectFilter("Social Studies")}>
                    <Badge
                      variant="outline"
                      className={cn("mr-2", subjectFilter === "Social Studies" ? "bg-primary/10" : "")}
                    >
                      Social Studies
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubjectFilter("Art")}>
                    <Badge variant="outline" className={cn("mr-2", subjectFilter === "Art" ? "bg-primary/10" : "")}>
                      Art
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSubjectFilter("Professional Development")}>
                    <Badge
                      variant="outline"
                      className={cn("mr-2", subjectFilter === "Professional Development" ? "bg-primary/10" : "")}
                    >
                      Professional Development
                    </Badge>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Resource Type</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "all" ? "bg-primary/10" : "")}>
                      All Types
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("worksheet")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "worksheet" ? "bg-primary/10" : "")}>
                      Worksheets
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("activity")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "activity" ? "bg-primary/10" : "")}>
                      Activities
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("presentation")}>
                    <Badge
                      variant="outline"
                      className={cn("mr-2", typeFilter === "presentation" ? "bg-primary/10" : "")}
                    >
                      Presentations
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("guide")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "guide" ? "bg-primary/10" : "")}>
                      Guides
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("poster")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "poster" ? "bg-primary/10" : "")}>
                      Posters
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("reference")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "reference" ? "bg-primary/10" : "")}>
                      References
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("quiz")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "quiz" ? "bg-primary/10" : "")}>
                      Quizzes
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("toolkit")}>
                    <Badge variant="outline" className={cn("mr-2", typeFilter === "toolkit" ? "bg-primary/10" : "")}>
                      Toolkits
                    </Badge>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Grade Level</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setGradeLevelFilter("all")}>
                    <Badge variant="outline" className={cn("mr-2", gradeLevelFilter === "all" ? "bg-primary/10" : "")}>
                      All Grades
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setGradeLevelFilter("K")}>
                    <Badge variant="outline" className={cn("mr-2", gradeLevelFilter === "K" ? "bg-primary/10" : "")}>
                      Kindergarten
                    </Badge>
                  </DropdownMenuItem>
                  {["1", "2", "3", "4", "5", "6"].map((grade) => (
                    <DropdownMenuItem key={grade} onClick={() => setGradeLevelFilter(grade)}>
                      <Badge
                        variant="outline"
                        className={cn("mr-2", gradeLevelFilter === grade ? "bg-primary/10" : "")}
                      >
                        Grade {grade}
                      </Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
                  <div className="flex items-center">
                    <Star className={cn("mr-2 h-4 w-4", showFavoritesOnly ? "fill-yellow-400 text-yellow-400" : "")} />
                    {showFavoritesOnly ? "Show All Resources" : "Show Favorites Only"}
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <Button variant="ghost" size="sm" className="w-full justify-center" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "newest" ? "bg-primary/10" : "")}>
                    Newest
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "oldest" ? "bg-primary/10" : "")}>
                    Oldest
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("title")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "title" ? "bg-primary/10" : "")}>
                    Title
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("downloads")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "downloads" ? "bg-primary/10" : "")}>
                    Most Downloads
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("favorites")}>
                  <Badge variant="outline" className={cn("mr-2", sortBy === "favorites" ? "bg-primary/10" : "")}>
                    Most Favorites
                  </Badge>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(searchQuery ||
              subjectFilter !== "all" ||
              typeFilter !== "all" ||
              gradeLevelFilter !== "all" ||
              showFavoritesOnly) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {view === "grid" && (
        <ResourceGrid
          resources={sortedResources}
          onView={handleViewResource}
          onEdit={handleEditResource}
          onDelete={handleDeleteResource}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {view === "list" && (
        <ResourceList
          resources={sortedResources}
          onView={handleViewResource}
          onEdit={handleEditResource}
          onDelete={handleDeleteResource}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {view === "categories" && <ResourceCategories onSelectCategory={setSubjectFilter} />}

      {view === "collections" && <ResourceCollections resources={resources} />}

      {view === "upload" && (
        <ResourceUploader resource={selectedResource} onSave={handleSaveResource} onCancel={handleBackToLibrary} />
      )}

      {view === "detail" && selectedResource && (
        <ResourceDetail
          resource={selectedResource}
          onBack={handleBackToLibrary}
          onEdit={() => handleEditResource(selectedResource)}
          onDelete={handleDeleteResource}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  )
}
