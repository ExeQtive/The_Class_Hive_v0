// @ts-nocheck
//"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type FileType, uploadFile } from "@/lib/supabase-storage"
import { Loader2, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  type: FileType
  onFileUploaded: () => void
}

export function FileUploader({ type, onFileUploaded }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 100)

      await uploadFile(file, type)

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        setFile(null)
        setUploading(false)
        setProgress(0)
        onFileUploaded()
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload file")
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">Upload File</Label>
        <Input id="file" type="file" onChange={handleFileChange} disabled={uploading} className="cursor-pointer" />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-sm text-muted-foreground">Uploading... {progress}%</p>
        </div>
      )}

      <Button onClick={handleUpload} disabled={!file || uploading} className="w-full sm:w-auto">
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </>
        )}
      </Button>
    </div>
  )
}
