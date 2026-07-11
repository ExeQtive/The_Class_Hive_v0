import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
})

export async function POST(req: Request) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Cancel any active subscriptions in Stripe
    if (user.subscriptionId) {
      await stripe.subscriptions.cancel(user.subscriptionId)
    }

    // Update user with lifetime access
    await db.user.update({
      where: { id: user.id },
      data: {
        isLifetimeMember: true,
        subscriptionPlan: "pro", // Changed from planType to subscriptionPlan
        subscriptionStatus: "lifetime",
        stripeSubscriptionId: null, // Changed from subscriptionId to stripeSubscriptionId
        aiCreditsRemaining: 999999, // Changed from aiCredits to aiCreditsRemaining
      },
    })

    return NextResponse.json({
      success: true,
      message: "Lifetime access granted successfully",
    })
  } catch (error) {
    console.error("Error granting lifetime access:", error)
    return NextResponse.json({ error: "Failed to grant lifetime access" }, { status: 500 })
  }
}
