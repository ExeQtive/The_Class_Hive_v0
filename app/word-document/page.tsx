import { WordDocumentEditor } from "@/components/word-document/document-editor"

export default function WordDocumentPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Word Document Editor</h1>
      <WordDocumentEditor />
    </div>
  )
}
