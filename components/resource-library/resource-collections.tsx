"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResourceCollectionsProps {
  resources: any[]
}

export function ResourceCollections({ resources }: ResourceCollectionsProps) {
  // Get favorite resources
  const favoriteResources = resources.filter((resource) => resource.isFavorite)

  // Create collections based on subjects
  const subjectCollections = Array.from(new Set(resources.map((resource) => resource.subject)))
    .filter((subject) => subject)
    .map((subject) => ({
      name: subject,
      resources: resources.filter((resource) => resource.subject === subject),
    }))

  // Create collections based on grade levels
  const gradeLevelMap: Record<string, any[]> = {}
  resources.forEach((resource) => {
    resource.gradeLevel.forEach((grade: string) => {
      if (!gradeLevelMap[grade]) {
        gradeLevelMap[grade] = []
      }
      if (!gradeLevelMap[grade].includes(resource)) {
        gradeLevelMap[grade].push(resource)
      }
    })
  })

  const gradeLevelCollections = Object.entries(gradeLevelMap)
    .map(([grade, resources]) => ({
      name: grade === "K" ? "Kindergarten" : `Grade ${grade}`,
      grade,
      resources,
    }))
    .sort((a, b) => {
      if (a.grade === "K") return -1
      if (b.grade === "K") return 1
      return Number.parseInt(a.grade) - Number.parseInt(b.grade)
    })

  // Create recent uploads collection
  const recentUploads = [...resources]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 5)

  // Create most downloaded collection
  const mostDownloaded = [...resources].sort((a, b) => b.downloads - a.downloads).slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-2 text-violet-800">My Collections</h3>
        <p className="text-violet-600">Access your saved collections and favorite resources.</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mr-3">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800">Favorites</h3>
              <p className="text-sm text-amber-700">Your most valued teaching resources</p>
            </div>
          </div>

          {favoriteResources.length === 0 ? (
            <Card className="border border-yellow-100">
              <CardContent className="p-6 text-center bg-gradient-to-br from-yellow-50/50 to-amber-50/50">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-amber-500" />
                </div>
                <p className="text-amber-700 mb-2">You haven't favorited any resources yet.</p>
                <p className="text-sm text-amber-600 mb-4">Save your favorite resources for quick access.</p>
                <Button
                  variant="outline"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300"
                >
                  Browse Resources
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteResources.slice(0, 6).map((resource) => (
                <ResourceCollectionItem key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mr-2">
              <span className="text-white text-xs">🕒</span>
            </div>
            <span className="text-violet-800">Recent Uploads</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentUploads.map((resource) => (
              <ResourceCollectionItem key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mr-2">
              <span className="text-white text-xs">📈</span>
            </div>
            <span className="text-blue-800">Most Downloaded</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mostDownloaded.map((resource) => (
              <ResourceCollectionItem key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-violet-800 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mr-3">
            <span className="text-white text-sm">📚</span>
          </div>
          Subject Collections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectCollections.map((collection) => (
            <Card
              key={collection.name}
              className="hover:shadow-md transition-shadow border-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 hover:from-violet-100/50 hover:to-purple-100/50"
            >
              <CardHeader className="pb-2 border-b border-violet-100">
                <CardTitle className="text-violet-800">{collection.name}</CardTitle>
                <CardDescription className="text-violet-600">
                  {collection.resources.length} resource{collection.resources.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(collection.resources.flatMap((resource) => resource.type).filter((type) => type)))
                    .slice(0, 5)
                    .map((type) => (
                      <Badge
                        key={type}
                        variant="outline"
                        className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 text-violet-700"
                      >
                        {type}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-blue-800 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mr-3">
            <span className="text-white text-sm">🎓</span>
          </div>
          Grade Level Collections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gradeLevelCollections.map((collection) => (
            <Card
              key={collection.name}
              className="hover:shadow-md transition-shadow border-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 hover:from-blue-100/50 hover:to-cyan-100/50"
            >
              <CardHeader className="pb-2 border-b border-blue-100">
                <CardTitle className="text-blue-800">{collection.name}</CardTitle>
                <CardDescription className="text-blue-600">
                  {collection.resources.length} resource{collection.resources.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(collection.resources.map((resource) => resource.subject).filter((subject) => subject)),
                  )
                    .slice(0, 3)
                    .map((subject) => (
                      <Badge
                        key={subject}
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700"
                      >
                        {subject}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function ResourceCollectionItem({ resource }: { resource: any }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={resource.thumbnail || "/placeholder.svg"}
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
            {resource.format.toUpperCase()}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent className="p-4 flex-1 bg-gradient-to-br from-white to-slate-50">
        <h4 className="font-medium line-clamp-1 group-hover:text-violet-700 transition-colors">{resource.title}</h4>
        <p className="text-xs text-violet-600 mt-1">{resource.subject}</p>
        <div className="flex items-center mt-2 text-xs">
          <Star
            className={cn(
              "h-3.5 w-3.5 mr-1",
              resource.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-violet-500",
            )}
          />
          <span className={resource.isFavorite ? "text-yellow-600" : "text-violet-600"}>{resource.favorites}</span>
        </div>
      </CardContent>
    </Card>
  )
}
