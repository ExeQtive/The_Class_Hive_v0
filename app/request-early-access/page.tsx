"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function RequestEarlyAccessPage() {
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [district, setDistrict] = useState("")
    const [schoolSize, setSchoolSize] = useState("")
    const [currentTools, setCurrentTools] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const { error } = await supabase.from("waitlist").insert({
            email,
            role,
            district,
            school_size: schoolSize,
            current_tools: currentTools,
        })

        setIsLoading(false)

        if (error) {
            console.error("Supabase error:", error)
            if (error.code === "23505") {
                setError("That email is already on the waitlist.")
            } else {
                setError("Something went wrong. Please try again.")
            }
            return
        }

        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-cyan-50/30 dark:from-background dark:to-cyan-950/10 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                        <CardTitle className="text-2xl font-bold">You're on the list</CardTitle>
                        <CardDescription>
                            Thanks for your interest in TheClassHive. We'll reach out as we open up early access.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-cyan-50/30 dark:from-background dark:to-cyan-950/10 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Request Early Access</CardTitle>
                    <CardDescription className="text-center">Join the waitlist for TheClassHive</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="space-y-2">
                            <Label htmlFor="email">Work email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@school.edu"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Teacher">Teacher</SelectItem>
                                    <SelectItem value="Principal">Principal</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="IT-CIO">IT / CIO</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="district">District or school name</Label>
                            <Input
                                id="district"
                                placeholder="e.g. Douglas County School District"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="schoolSize">Approximate student count</Label>
                            <Select value={schoolSize} onValueChange={setSchoolSize}>
                                <SelectTrigger id="schoolSize">
                                    <SelectValue placeholder="Select a range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Under 200">Under 200</SelectItem>
                                    <SelectItem value="200-500">200–500</SelectItem>
                                    <SelectItem value="500-1000">500–1,000</SelectItem>
                                    <SelectItem value="Over 1000">Over 1,000</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currentTools">What edtech tools do you use today?</Label>
                            <Input
                                id="currentTools"
                                placeholder="e.g. ClassDojo, Google Classroom"
                                value={currentTools}
                                onChange={(e) => setCurrentTools(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Join the waitlist"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}