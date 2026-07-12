import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "Payments available in Sprint 1" },
    { status: 503 }
  )
}
