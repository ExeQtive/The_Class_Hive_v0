//"use client"

import type React from "react"

import { useState } from "react"
import { Save, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Add these imports at the top
import { uploadFile } from "@/lib/supabase-storage"
import { useToast } from "@/hooks/use-toast"

interface ResourceUploaderProps {
  resource?: any
  onSave: (resource: any) => void
  onCancel: () => void
}

export function ResourceUploader({ resource, onSave, onCancel }: ResourceUploaderProps) {
  const isEditing = !!resource
  const [formData, setFormData] = useState({
    id: resource?.id || `new-${Date.now()}`,
    title: resource?.title || "",
    description: resource?.description || "",
    type: resource?.type || "worksheet",
    format: resource?.format || "pdf",
    subject: resource?.subject || "",
    gradeLevel: resource?.gradeLevel || [],
    tags: resource?.tags || [],
    thumbnail: resource?.thumbnail || "/placeholder.svg?height=400&width=600&text=Resource+Thumbnail",
    url: resource?.url || "#",
    uploadedBy: resource?.uploadedBy || "Current User",
    isPublic: resource?.isPublic !== undefined ? resource.isPublic : true,
    fileSize: resource?.fileSize || "",
    pages: resource?.pages || "",
    slides: resource?.slides || "",
  })

  // Inside the ResourceUploader component, add this after the state declarations
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const [newTag, setNewTag] = useState("")
  const [selectedGrade, setSelectedGrade] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag: string) => tag !== tagToRemove) })
  }

  const handleAddGrade = () => {
    if (selectedGrade && !formData.gradeLevel.includes(selectedGrade)) {
      setFormData({ ...formData, gradeLevel: [...formData.gradeLevel, selectedGrade] })
      setSelectedGrade("")
    }
  }

  const handleRemoveGrade = (gradeToRemove: string) => {
    setFormData({
      ...formData,
      gradeLevel: formData.gradeLevel.filter((grade: string) => grade !== gradeToRemove),
    })
  }

  // Add this function before handleSubmit
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)

    // Update the form with file information
    setFormData({
      ...formData,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      format: file.name.split(".").pop()?.toLowerCase() || formData.format,
    })
  }

  // Replace the handleSubmit function with this
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsUploading(true)

      // If we have a file to upload, upload it to Supabase Storage
      if (uploadedFile) {
        const fileData = await uploadFile(uploadedFile, "resource")

        // Update the form data with the file URL
        setFormData({
          ...formData,
          url: fileData.url,
        })

        // Save the resource with the updated URL
        onSave({
          ...formData,
          url: fileData.url,
        })
      } else {
        // No file to upload, just save the resource as is
        onSave(formData)
      }

      toast({
        title: isEditing ? "Resource updated" : "Resource uploaded",
        description: `${formData.title} has been ${isEditing ? "updated" : "uploaded"} successfully.`,
      })
    } catch (error) {
      console.error("Error uploading resource:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resource. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>{isEditing ? "Edit Resource" : "Upload New Resource"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title">Resource Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter resource description"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="type">Resource Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worksheet">Worksheet</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="poster">Poster</SelectItem>
                    <SelectItem value="reference">Reference</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="toolkit">Toolkit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="format">File Format</Label>
                <Select value={formData.format} onValueChange={(value) => handleSelectChange("format", value)}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="pptx">PPTX</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="epub">EPUB</SelectItem>
                    <SelectItem value="mp4">MP4</SelectItem>
                    <SelectItem value="mp3">MP3</SelectItem>
                    <SelectItem value="zip">ZIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => handleSelectChange("subject", value)}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Language Arts">Language Arts</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Physical Education">Physical Education</SelectItem>
                    <SelectItem value="Professional Development">Professional Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Grade Levels</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.gradeLevel.map((grade: string) => (
                  <Badge key={grade} variant="secondary" className="flex items-center gap-1">
                    {grade === "K" ? "Kindergarten" : `Grade ${grade}`}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleRemoveGrade(grade)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {formData.gradeLevel.length === 0 && (
                  <div className="text-sm text-muted-foreground">No grade levels selected</div>
                )}
              </div>
              <div className="flex gap-2">
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="K">Kindergarten</SelectItem>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                    <SelectItem value="5">Grade 5</SelectItem>
                    <SelectItem value="6">Grade 6</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={handleAddGrade}>
                  Add Grade
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {formData.tags.length === 0 && <div className="text-sm text-muted-foreground">No tags added</div>}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add Tag
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="fileSize">File Size</Label>
                <Input
                  id="fileSize"
                  name="fileSize"
                  value={formData.fileSize}
                  onChange={handleInputChange}
                  placeholder="E.g., 2.4 MB"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="pages">{formData.format === "pptx" ? "Number of Slides" : "Number of Pages"}</Label>
                <Input
                  id={formData.format === "pptx" ? "slides" : "pages"}
                  name={formData.format === "pptx" ? "slides" : "pages"}
                  value={formData.format === "pptx" ? formData.slides : formData.pages}
                  onChange={handleInputChange}
                  placeholder="Enter number"
                  type="number"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                placeholder="Enter thumbnail URL"
              />
            </div>

            {/* Add a file input field in the form, after the thumbnail URL input */}
            {/* Find the "Resource URL" input section and replace it with this: */}
            <div className="grid gap-3">
              <Label htmlFor="file">Resource File</Label>
              <Input id="file" name="file" type="file" onChange={handleFileUpload} className="cursor-pointer" />
              {uploadedFile && (
                <div className="text-sm text-muted-foreground">
                  Selected file: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="url">Resource URL</Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="Enter resource URL or upload a file"
                disabled={!!uploadedFile}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleSwitchChange("isPublic", checked)}
              />
              <Label htmlFor="isPublic">Make this resource public</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          {/* Update the submit button to show loading state */}
          {/* Find the submit button in CardFooter and replace it with: */}
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <span className="mr-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
                {isEditing ? "Saving..." : "Uploading..."}
              </>
            ) : isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> Upload Resource
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
