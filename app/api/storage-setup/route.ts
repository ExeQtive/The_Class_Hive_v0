import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

// This API route ensures that the necessary storage buckets exist
export async function GET() {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "Supabase environment variables not configured",
        },
        { status: 503 },
      )
    }

    const supabase = createServerSupabaseClient()

    // List of buckets we need for the application
    const requiredBuckets = [
      { name: "resource", public: true },
      { name: "avatar", public: true },
      { name: "document", public: false },
      { name: "attachment", public: true },
    ]

    // Get existing buckets
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error("Error listing buckets:", listError)
      return NextResponse.json(
        {
          success: false,
          error: `Failed to list buckets: ${listError.message}`,
        },
        { status: 500 },
      )
    }

    const existingBucketNames = existingBuckets?.map((bucket) => bucket.name) || []

    // Create any missing buckets
    const createdBuckets = []
    for (const bucket of requiredBuckets) {
      if (!existingBucketNames.includes(bucket.name)) {
        try {
          const { error: createError } = await supabase.storage.createBucket(bucket.name, {
            public: bucket.public,
          })

          if (createError) {
            console.error(`Error creating bucket ${bucket.name}:`, createError)
            // Continue with other buckets instead of failing completely
            continue
          }

          createdBuckets.push(bucket.name)
        } catch (error) {
          console.error(`Error creating bucket ${bucket.name}:`, error)
          // Continue with other buckets
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Storage buckets verified",
      buckets: requiredBuckets.map((b) => b.name),
      created: createdBuckets,
    })
  } catch (error) {
    console.error("Error setting up storage:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
