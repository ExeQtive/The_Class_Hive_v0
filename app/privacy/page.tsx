import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How TheClassHive collects, uses, and protects data for teachers, students, and schools.",
}

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: June 2026</p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Who we are</h2>
                <p className="text-muted-foreground leading-relaxed">
                    TheClassHive is a unified workspace built for K-12 teachers, replacing the patchwork
                    of separate tools used for lesson planning, student management, and parent communication.
                    This policy explains what information we collect when schools, teachers, and families use our service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">What we collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Account information such as name and email address. Classroom information entered by
                    teachers, including lesson plans, assignments, and student rosters. Basic usage analytics
                    (pages visited, features used) to help us improve the product.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">What we do not collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We do not collect home addresses, Social Security numbers, biometric data, or health records.
                    If a feature ever requires this kind of data in the future, it will be opt-in and disclosed here first.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">How we use it</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We use collected data to operate and improve TheClassHive. We do not sell student or
                    teacher data to third parties, and we do not allow any data to be used to train
                    third-party AI models.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">FERPA &amp; COPPA compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                    TheClassHive operates as a &quot;school official&quot; with a legitimate educational interest
                    under FERPA §99.31(a)(1), meaning schools maintain control over student education records.
                    We do not knowingly collect personal information directly from children under 13 outside
                    of a school&apos;s supervised use of the platform, consistent with COPPA.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Data is retained for as long as an account remains active. If an account is deleted,
                    associated data is permanently purged within 30 days.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Your rights</h2>
                <p className="text-muted-foreground leading-relaxed">
                    You may request a copy of your data, request corrections, or request deletion at any time.
                    We respond to all such requests within 30 days.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Questions about this policy can be directed to our Privacy Officer at{" "}
                    <a href="mailto:privacy@theclasshive.com" className="underline">
                        privacy@theclasshive.com
                    </a>
                    .
                </p>
            </section>
        </div>
    )
}