import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "Registration available in Sprint 1" },
    { status: 503 }
  )
}
