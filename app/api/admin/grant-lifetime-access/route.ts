import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "Admin features available in Sprint 1" },
    { status: 503 }
  )
}
