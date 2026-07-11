import { NextResponse } from "next/server"
import Stripe from "stripe"

interface CheckoutRequestBody {
  priceId: string
  planType: string
  customerId?: string
}

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    const { priceId, planType, customerId }: CheckoutRequestBody = await req.json()

    if (!priceId || !planType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer: customerId || undefined,
      metadata: {
        planType,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        message: error.message,
      },
      { status: 500 },
    )
  }
}
