import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { db } from "@/lib/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`)
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session

      // Update user subscription in database
      if (session.customer && session.subscription) {
        await db.user.update({
          where: { stripeCustomerId: session.customer as string },
          data: {
            stripeSubscriptionId: session.subscription as string, // Changed from subscriptionId
            subscriptionStatus: "active",
            subscriptionPlan: session.metadata?.planType || "basic", // Changed from planType
            trialEndsAt: null, // End trial if they were on one
          },
        })
      }
      break

    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription

      // Update subscription status in database
      await db.user.update({
        where: { stripeSubscriptionId: subscription.id }, // Changed from subscriptionId
        data: {
          subscriptionStatus: subscription.status,
          subscriptionPlan: subscription.metadata.planType || "basic", // Changed from planType
        },
      })
      break

    case "customer.subscription.deleted":
      const canceledSubscription = event.data.object as Stripe.Subscription

      // Update user when subscription is canceled
      await db.user.update({
        where: { stripeSubscriptionId: canceledSubscription.id }, // Changed from subscriptionId
        data: {
          subscriptionStatus: "canceled",
          stripeSubscriptionId: null, // Changed from subscriptionId
          subscriptionPlan: "free", // Changed from planType
        },
      })
      break
  }

  return NextResponse.json({ received: true })
}
