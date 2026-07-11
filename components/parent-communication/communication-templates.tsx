// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Edit, Plus, Save, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CommunicationTemplatesProps {
  templates?: any[]
  onSaveTemplate?: (templateData: any) => void
}

export default function CommunicationTemplates({
  templates = [],
  onSaveTemplate = () => {},
}: CommunicationTemplatesProps) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "edit">("list")
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null)
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("General")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")

  const handleCreateTemplate = () => {
    resetForm()
    setActiveTab("create")
  }

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template)
    setTitle(template.title)
    setSubject(template.subject)
    setContent(template.content)
    setCategory(template.category)
    setActiveTab("edit")
  }

  const handleSaveTemplate = () => {
    if (!title || !subject || !content) return

    const templateData = {
      id: selectedTemplate?.id,
      title,
      subject,
      content,
      category,
    }

    onSaveTemplate(templateData)
    resetForm()
    setActiveTab("list")
  }

  const resetForm = () => {
    setSelectedTemplate(null)
    setTitle("")
    setSubject("")
    setContent("")
    setCategory("General")
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplateToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // In a real app, this would delete the template via an API
    setShowDeleteConfirm(false)
    setTemplateToDelete(null)
  }

  const filteredTemplates = templates.filter(
    (template) => filterCategory === "all" || template.category === filterCategory,
  )

  return (
    <div className="space-y-6">
      {activeTab === "list" ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-medium">Message Templates</h3>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Homework">Homework</SelectItem>
                  <SelectItem value="Behavior">Behavior</SelectItem>
                  <SelectItem value="Conferences">Conferences</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          {filteredTemplates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Save className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Templates Found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {filterCategory === "all"
                    ? "Create your first message template to save time."
                    : "No templates found in this category."}
                </p>
                <Button onClick={handleCreateTemplate}>Create Template</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditTemplate(template)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-sm font-medium">{template.subject}</div>
                    <div className="text-sm text-muted-foreground mt-2 line-clamp-3">{template.content}</div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Badge variant="outline">{template.category}</Badge>
                    <Button variant="ghost" size="sm" className="ml-auto" onClick={() => handleEditTemplate(template)}>
                      Edit Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{activeTab === "create" ? "Create New Template" : "Edit Template"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Template Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter template name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Homework">Homework</SelectItem>
                  <SelectItem value="Behavior">Behavior</SelectItem>
                  <SelectItem value="Conferences">Conferences</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject line"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message Content</Label>
              <div className="text-xs text-muted-foreground mb-2">
                Use placeholders like [Parent Name], [Student Name], etc. that will be replaced when using the template.
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter message content"
                className="min-h-[200px] font-mono"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("list")}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate} disabled={!title || !subject || !content}>
              <Save className="h-4 w-4 mr-2" />
              {activeTab === "create" ? "Create Template" : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      )}

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
