// @ts-nocheck
// @ts-nocheck
import { Megaphone } from "lucide-react"

export function DemoBanner() {
    return (
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border-b border-cyan-200 dark:border-cyan-900 px-4 py-3">
            <div className="max-w-5xl mx-auto flex items-start gap-3 text-sm text-cyan-900 dark:text-cyan-100">
                <Megaphone className="h-4 w-4 mt-0.5 shrink-0" />
                <p>
                    <strong>You&apos;re viewing the full product preview.</strong> Our first cohort launches
                    with unified login and classroom analytics — everything else shown here is on the
                    roadmap and will roll out in upcoming releases.
                </p>
            </div>
        </div>
    )
}