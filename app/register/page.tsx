"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})
const codeSchema = z.object({
  code: z.string().length(6, { message: "Enter the 6-digit code from your email" }),
})

type RegisterFormValues = z.infer<typeof registerSchema>
type CodeFormValues = z.infer<typeof codeSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "" },
  })
  const codeForm = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  })

  const requestCode = async (data: RegisterFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: { data: { full_name: data.name } },
      })
      if (otpError) {
        setError(otpError.message)
        return
      }
      setSentTo(data.email)
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyCode = async (data: CodeFormValues) => {
    if (!sentTo) return
    setIsLoading(true)
    setError(null)

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: sentTo,
        token: data.code,
        type: "email",
      })

      if (verifyError) {
        setError(verifyError.message)
        return
      }

      router.push("/dashboard")
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (sentTo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-cyan-50/30 dark:from-background dark:to-cyan-950/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Enter your code</CardTitle>
            <CardDescription className="text-center">
              We sent a 6-digit code to <span className="font-medium text-foreground">{sentTo}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={codeForm.handleSubmit(verifyCode)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  className="text-center text-lg tracking-widest"
                  {...codeForm.register("code")}
                />
                {codeForm.formState.errors.code && (
                  <p className="text-sm text-red-500">{codeForm.formState.errors.code.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify and create account"
                )}
              </Button>

              <Button type="button" variant="ghost" className="w-full" onClick={() => setSentTo(null)}>
                Use a different email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-cyan-50/30 dark:from-background dark:to-cyan-950/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information and we&apos;ll send you a sign-in code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerForm.handleSubmit(requestCode)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" {...registerForm.register("name")} />
              {registerForm.formState.errors.name && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" {...registerForm.register("email")} />
              {registerForm.formState.errors.email && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                "Send sign-in code"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" disabled title="Google sign-in coming soon">
            Google (coming soon)
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
