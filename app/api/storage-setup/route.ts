import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Storage setup deferred to Sprint 1",
    buckets: [],
  })
}
