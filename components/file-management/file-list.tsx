"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { type FileType, deleteFile } from "@/lib/supabase-storage"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FileIcon, Trash2, Download, Loader2 } from "lucide-react"
import { formatBytes, formatDate } from "@/lib/utils"

interface FileListProps {
  files: any[]
  type: FileType
  onFileDeleted: () => void
}

export function FileList({ files, type, onFileDeleted }: FileListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!fileToDelete) return

    setDeleting(true)
    try {
      await deleteFile(fileToDelete, type)
      onFileDeleted()
    } catch (error) {
      console.error("Error deleting file:", error)
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
      setFileToDelete(null)
    }
  }

  const confirmDelete = (path: string) => {
    setFileToDelete(path)
    setDeleteDialogOpen(true)
  }

  if (files.length === 0) {
    return (
      <div className="py-12 text-center">
        <FileIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No files found</h3>
        <p className="text-sm text-muted-foreground">Upload files to see them here.</p>
      </div>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>{formatBytes(file.metadata?.size || 0)}</TableCell>
              <TableCell>{formatDate(file.created_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${type}/${file.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => confirmDelete(file.name)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
