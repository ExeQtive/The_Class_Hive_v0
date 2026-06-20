import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <h1 className="text-3xl font-bold mb-3">That page isn&apos;t in the hive.</h1>
            <p className="text-muted-foreground mb-8 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist, or it may have moved.
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/">Back to home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/preview">See the demo</Link>
                </Button>
            </div>
        </div>
    )
}