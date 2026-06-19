import { createClientSupabaseClient, createServerSupabaseClient } from "./supabase"
import { v4 as uuidv4 } from "uuid"

// File types we'll support
export type FileType = "resource" | "avatar" | "document" | "attachment"

/**
 * Upload a file to Supabase Storage
 * @param file The file to upload
 * @param type The type of file (determines the bucket)
 * @param customPath Optional custom path within the bucket
 * @returns Object containing the file URL and other metadata
 */
export async function uploadFile(file: File, type: FileType = "resource", customPath?: string) {
  const supabase = createClientSupabaseClient()

  // Generate a unique filename to prevent collisions
  const fileExt = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExt}`

  // Determine the path where the file will be stored
  const filePath = customPath ? `${customPath}/${fileName}` : fileName

  // Upload the file to the appropriate bucket
  const { data, error } = await supabase.storage.from(type).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    console.error("Error uploading file:", error)
    throw new Error(`Failed to upload file: ${error.message}`)
  }

  // Get the public URL for the uploaded file
  const {
    data: { publicUrl },
  } = supabase.storage.from(type).getPublicUrl(data.path)

  return {
    path: data.path,
    url: publicUrl,
    size: file.size,
    type: file.type,
    name: file.name,
  }
}

/**
 * Delete a file from Supabase Storage
 * @param path The path of the file to delete
 * @param type The type of file (determines the bucket)
 */
export async function deleteFile(path: string, type: FileType = "resource") {
  const supabase = createClientSupabaseClient()

  const { error } = await supabase.storage.from(type).remove([path])

  if (error) {
    console.error("Error deleting file:", error)
    throw new Error(`Failed to delete file: ${error.message}`)
  }

  return true
}

/**
 * Get a list of files from a Supabase Storage bucket
 * @param type The type of files to list (determines the bucket)
 * @param path Optional path within the bucket
 */
export async function listFiles(type: FileType = "resource", path?: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(type).list(path || "")

  if (error) {
    console.error("Error listing files:", error)
    throw new Error(`Failed to list files: ${error.message}`)
  }

  return data
}

/**
 * Create a signed URL for a file (for temporary access)
 * @param path The path of the file
 * @param type The type of file (determines the bucket)
 * @param expiresIn Expiration time in seconds (default: 60 minutes)
 */
export async function createSignedUrl(path: string, type: FileType = "resource", expiresIn = 3600) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.storage.from(type).createSignedUrl(path, expiresIn)

  if (error) {
    console.error("Error creating signed URL:", error)
    throw new Error(`Failed to create signed URL: ${error.message}`)
  }

  return data
}
