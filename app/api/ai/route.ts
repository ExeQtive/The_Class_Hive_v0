import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

// Abacus.AI API endpoint
const ABACUS_API_ENDPOINT = "https://api.abacus.ai/v0/inference"

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database to check subscription status
    const user = await db.user.findUnique({
      where: { email: session.user.email as string },
      select: {
        id: true,
        aiCreditsRemaining: true,
        subscriptionStatus: true,
        isLifetimeMember: true,
        trialEndsAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if user has AI credits or is a lifetime member
    const hasActiveSubscription =
      user.subscriptionStatus === "active" ||
      user.isLifetimeMember ||
      (user.trialEndsAt && new Date(user.trialEndsAt) > new Date())

    if (!hasActiveSubscription && user.aiCreditsRemaining <= 0) {
      return NextResponse.json({ error: "No AI credits remaining. Please upgrade your plan." }, { status: 403 })
    }

    // Parse the request body
    const { prompt, type } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Determine which Abacus.AI model to use based on the request type
    let model = "chat"
    switch (type) {
      case "lesson-plan":
        model = "teachflow-lesson-plan"
        break
      case "email":
        model = "teachflow-email"
        break
      case "behavior":
        model = "teachflow-behavior"
        break
      case "differentiation":
        model = "teachflow-differentiation"
        break
      case "experiment":
        model = "teachflow-experiment"
        break
      case "assignment":
        model = "teachflow-assignment"
        break
      case "rubric":
        model = "teachflow-rubric"
        break
      default:
        model = "chat"
    }

    // Call the Abacus.AI API
    const response = await fetch(ABACUS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ABACUS_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: "AI service error", details: errorData }, { status: response.status })
    }

    const data = await response.json()

    // Deduct an AI credit if the user is not a lifetime member and not on an active subscription
    if (!user.isLifetimeMember && user.subscriptionStatus !== "active") {
      await db.user.update({
        where: { id: user.id },
        data: { aiCreditsRemaining: Math.max(0, user.aiCreditsRemaining - 1) },
      })
    }

    // Log the AI usage
    await db.aiUsageLog.create({
      data: {
        userId: user.id,
        promptType: type,
        tokensUsed: data.usage?.total_tokens || 0,
      },
    })

    return NextResponse.json({
      result: data.choices[0].text,
      creditsRemaining: user.isLifetimeMember ? "unlimited" : user.aiCreditsRemaining - 1,
    })
  } catch (error) {
    console.error("AI API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
