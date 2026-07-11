// @ts-nocheck
// @ts-nocheck
"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Save,
  FileDown,
  Printer,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface WordDocumentEditorProps {
  initialTitle?: string
  initialContent?: string
}

export function WordDocumentEditor({
  initialTitle = "Untitled Document",
  initialContent = "",
}: WordDocumentEditorProps) {
  const [documentTitle, setDocumentTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [fontSize, setFontSize] = useState("16px")
  const [fontFamily, setFontFamily] = useState("Arial")
  const editorRef = useRef<HTMLDivElement>(null)

  // Initialize editor with content if provided
  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent
    }
  }, [initialContent])

  // Handle formatting commands
  const formatDoc = (command: string, value = "") => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // Handle font size change
  const handleFontSizeChange = (value: string) => {
    setFontSize(value)
    formatDoc("fontSize", value === "16px" ? "3" : value === "14px" ? "2" : "4")
  }

  // Handle font family change
  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value)
    formatDoc("fontName", value)
  }

  // Save document content when it changes
  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  // Print document
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${documentTitle}</title>
            <style>
              body { font-family: ${fontFamily}; padding: 20px; }
              h1 { font-size: 24px; margin-bottom: 16px; }
              h2 { font-size: 20px; margin-bottom: 12px; margin-top: 24px; }
              h3 { font-size: 16px; margin-bottom: 8px; margin-top: 16px; }
              p { margin-bottom: 8px; }
              ul, ol { margin-left: 20px; margin-bottom: 16px; }
            </style>
          </head>
          <body>
            <h1>${documentTitle}</h1>
            ${content}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Export as HTML
  const handleExport = () => {
    const blob = new Blob(
      [
        `
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            body { font-family: ${fontFamily}; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 16px; }
            h2 { font-size: 20px; margin-bottom: 12px; margin-top: 24px; }
            h3 { font-size: 16px; margin-bottom: 8px; margin-top: 16px; }
            p { margin-bottom: 8px; }
            ul, ol { margin-left: 20px; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <h1>${documentTitle}</h1>
          ${content}
        </body>
      </html>
    `,
      ],
      { type: "text/html" },
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${documentTitle.replace(/\s+/g, "-").toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Document exported",
      description: `${documentTitle} has been exported as HTML.`,
    })
  }

  // Export as Word document (simulated as HTML with .docx extension)
  const handleExportWord = () => {
    const blob = new Blob(
      [
        `
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            body { font-family: ${fontFamily}; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 16px; }
            h2 { font-size: 20px; margin-bottom: 12px; margin-top: 24px; }
            h3 { font-size: 16px; margin-bottom: 8px; margin-top: 16px; }
            p { margin-bottom: 8px; }
            ul, ol { margin-left: 20px; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <h1>${documentTitle}</h1>
          ${content}
        </body>
      </html>
    `,
      ],
      { type: "application/vnd.ms-word" },
    )

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${documentTitle.replace(/\s+/g, "-").toLowerCase()}.docx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Document downloaded",
      description: `${documentTitle} has been downloaded as a Word document.`,
    })
  }

  // Save document (simulated)
  const handleSave = () => {
    // In a real app, this would save to a database
    localStorage.setItem(
      "wordDoc",
      JSON.stringify({
        title: documentTitle,
        content: content,
        fontFamily: fontFamily,
        fontSize: fontSize,
      }),
    )

    toast({
      title: "Document saved",
      description: "Your document has been saved successfully.",
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-white border-b">
          <div className="flex items-center justify-between">
            <Input
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="max-w-xs font-semibold border-none text-lg focus-visible:ring-0"
            />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FileDown className="h-4 w-4 mr-1" />
                Export HTML
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportWord}>
                <FileDown className="h-4 w-4 mr-1" />
                Download Word
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>

        <div className="bg-gray-100 p-2 border-b">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => formatDoc("bold")} className="h-8 w-8 p-0">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => formatDoc("italic")} className="h-8 w-8 p-0">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => formatDoc("underline")} className="h-8 w-8 p-0">
                <Underline className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => formatDoc("justifyLeft")} className="h-8 w-8 p-0">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => formatDoc("justifyCenter")} className="h-8 w-8 p-0">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => formatDoc("justifyRight")} className="h-8 w-8 p-0">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatDoc("insertUnorderedList")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => formatDoc("insertOrderedList")} className="h-8 w-8 p-0">
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center space-x-2">
              <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Verdana">Verdana</SelectItem>
                </SelectContent>
              </Select>

              <Select value={fontSize} onValueChange={handleFontSizeChange}>
                <SelectTrigger className="w-[80px] h-8">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14px">Small</SelectItem>
                  <SelectItem value="16px">Medium</SelectItem>
                  <SelectItem value="20px">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div
            ref={editorRef}
            contentEditable={true}
            className="min-h-[500px] p-8 focus:outline-none"
            style={{ fontFamily, fontSize }}
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: initialContent }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
