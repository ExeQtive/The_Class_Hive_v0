"use client"

import { useSession } from "next-auth/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function SubscriptionStatus() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const { planType, subscriptionStatus, trialEndsAt, isLifetimeMember, aiCredits } = session.user

  // Calculate days left in trial
  const daysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  // Determine subscription state
  const isTrialing = trialEndsAt && new Date(trialEndsAt) > new Date()
  const isActive = subscriptionStatus === "active" || isLifetimeMember
  const isPastDue = subscriptionStatus === "past_due"
  const isCanceled = subscriptionStatus === "canceled"

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Subscription Status</CardTitle>
        <CardDescription>Your current plan and usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Current Plan</p>
            <div className="flex items-center gap-2 mt-1">
              {isLifetimeMember ? (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Lifetime Pro
                </Badge>
              ) : (
                <Badge variant={planType === "free" ? "outline" : "default"}>
                  {planType === "basic"
                    ? "Basic"
                    : planType === "pro"
                      ? "Pro"
                      : planType === "school"
                        ? "School"
                        : "Free"}
                </Badge>
              )}

              {isTrialing && (
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                  <Clock className="h-3 w-3 mr-1" />
                  Trial ({daysLeft} days left)
                </Badge>
              )}

              {isPastDue && (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Payment Past Due
                </Badge>
              )}

              {isCanceled && (
                <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                  Canceled
                </Badge>
              )}
            </div>
          </div>

          {!isLifetimeMember && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/request-early-access">{isActive ? "Change Plan" : "Upgrade"}</Link>
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">AI Credits</p>
            <p className="text-sm">{aiCredits} credits</p>
          </div>
          <Progress value={aiCredits} max={planType === "basic" ? 15 : planType === "pro" ? 75 : 100} />
          <p className="text-xs text-muted-foreground">
            {isLifetimeMember ? "Unlimited AI credits available" : `${aiCredits} credits remaining this month`}
          </p>
        </div>
      </CardContent>
      {!isLifetimeMember && !isActive && (
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/request-early-access">{isTrialing ? "Subscribe Now" : "Reactivate Subscription"}</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
