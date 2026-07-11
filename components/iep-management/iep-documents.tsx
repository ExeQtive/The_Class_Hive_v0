// @ts-nocheck
// @ts-nocheck
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileSelector } from "@/components/file-management/file-selector"
import { Search, Download, Eye, Trash2, FileText, FilePlus } from "lucide-react"

// Mock data for demonstration
const mockDocuments = [
  {
    id: "1",
    name: "Alex Johnson - IEP 2023-2024.pdf",
    student: "Alex Johnson",
    type: "IEP Document",
    uploadDate: "2023-09-15",
    size: "1.2 MB",
    url: "#",
  },
  {
    id: "2",
    name: "Jamie Smith - Evaluation Report.pdf",
    student: "Jamie Smith",
    type: "Evaluation",
    uploadDate: "2023-08-10",
    size: "2.5 MB",
    url: "#",
  },
  {
    id: "3",
    name: "Taylor Williams - Accommodation Plan.docx",
    student: "Taylor Williams",
    type: "Accommodation",
    uploadDate: "2023-10-05",
    size: "850 KB",
    url: "#",
  },
  {
    id: "4",
    name: "Morgan Brown - Progress Report Q1.pdf",
    student: "Morgan Brown",
    type: "Progress Report",
    uploadDate: "2023-11-20",
    size: "1.1 MB",
    url: "#",
  },
]

export function IEPDocuments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleFileSelect = (fileUrl: string) => {
    setSelectedFile(fileUrl)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <FileSelector onFileSelect={handleFileSelect} defaultBucket="document" buttonText="Select Document" />
          <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            Upload New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">No documents found</div>
        ) : (
          filteredDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted p-4 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate" title={doc.name}>
                      {doc.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{doc.student}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{doc.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex justify-between gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-none">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
