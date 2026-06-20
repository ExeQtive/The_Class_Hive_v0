import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Security",
    description: "TheClassHive's compliance posture, data handling practices, and subprocessors.",
}

export default function SecurityPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-2">Security</h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: June 2026</p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Compliance posture</h2>
                <p className="text-muted-foreground leading-relaxed">
                    TheClassHive is FERPA aligned and COPPA compliant. SOC 2 Type II certification is on our
                    roadmap. We are also designed with awareness of state-level student privacy laws,
                    including New York Education Law 2-D and California&apos;s SOPIPA.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Data handling</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Data is encrypted with TLS 1.3 in transit and AES-256 at rest. Access control is enforced
                    at the database layer using row-level security, not just at the application layer. All
                    data is stored within the United States.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Subprocessors</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We rely on a small set of named, SOC 2 certified subprocessors: Supabase (database and
                    backend infrastructure), Vercel (hosting), and Anthropic (AI features). We will provide
                    advance notice before adding or changing any subprocessor.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Data Processing Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                    A Data Processing Agreement covering FERPA, COPPA, and applicable state laws is available
                    on request at{" "}
                    <a href="mailto:legal@theclasshive.com" className="underline">
                        legal@theclasshive.com
                    </a>
                    .
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Incident response</h2>
                <p className="text-muted-foreground leading-relaxed">
                    In the event of a data breach, affected customers are notified within 72 hours, followed
                    by a written summary within 7 days.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Privacy Officer &amp; vulnerability disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Privacy questions:{" "}
                    <a href="mailto:privacy@theclasshive.com" className="underline">
                        privacy@theclasshive.com
                    </a>
                    . Security vulnerabilities or disclosures:{" "}
                    <a href="mailto:security@theclasshive.com" className="underline">
                        security@theclasshive.com
                    </a>
                    .
                </p>
            </section>
        </div>
    )
}