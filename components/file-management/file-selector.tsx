"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileManager } from "./file-manager"
import type { FileType } from "@/lib/supabase-storage"
import { FolderOpen } from "lucide-react"

interface FileSelectorProps {
  onFileSelect: (fileUrl: string) => void
  defaultBucket?: FileType
  buttonText?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function FileSelector({
  onFileSelect,
  defaultBucket = "resource",
  buttonText = "Select File",
  buttonVariant = "outline",
}: FileSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleFileSelect = (fileUrl: string) => {
    onFileSelect(fileUrl)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>
          <FolderOpen className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select a File</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <FileManager defaultBucket={defaultBucket} onSelect={handleFileSelect} selectable={true} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
