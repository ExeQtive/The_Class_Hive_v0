"use client"

import Link from "next/link"
import { BookOpen, Users, MessageSquare, Sparkles, Shield, Clock, Puzzle, TrendingUp } from "lucide-react"

export function LandingSections() {
    return (
        <div className="bg-[#0a0f0f] text-white">

            {/* SECTION 1: THE PROBLEM */}
            <section className="py-24 px-6 border-t border-teal-900/40">
                <div className="max-w-5xl mx-auto">

                    <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4">
                        Let's be honest for a second
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
                        You didn't get into teaching<br />
                        to manage software subscriptions.
                    </h2>

                    <p className="text-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
                        But here you are. Seven browser tabs open. Three apps that don't talk to each other.
                        A parent email buried somewhere in a tool you barely remember signing up for.
                        Meanwhile, the actual teaching (the part you went to school for) gets whatever's left.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                stat: "7+",
                                label: "Apps the average K-12 teacher juggles daily",
                                sub: "None of them were designed to work together. That's not an accident. It's a business model.",
                                icon: <Puzzle className="h-6 w-6 text-teal-400" />,
                            },
                            {
                                stat: "4.3 hrs",
                                label: "Lost every week to administrative busywork",
                                sub: "That's 23 school days a year. Gone. Not to teaching. To logging in, copying, pasting, and switching tabs.",
                                icon: <Clock className="h-6 w-6 text-teal-400" />,
                            },
                            {
                                stat: "$2,800",
                                label: "Average per-teacher annual edtech spend",
                                sub: "Districts are paying for a dozen tools that overlap, conflict, and confuse. Most teachers use 40% of what they're given.",
                                icon: <TrendingUp className="h-6 w-6 text-teal-400" />,
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-teal-950/30 border border-teal-800/30 rounded-2xl p-8 hover:border-teal-600/40 transition-colors duration-300"
                            >
                                <div className="mb-4">{item.icon}</div>
                                <div className="text-5xl font-bold text-teal-300 mb-2">{item.stat}</div>
                                <div className="text-white font-semibold mb-3 leading-snug">{item.label}</div>
                                <div className="text-gray-400 text-sm leading-relaxed">{item.sub}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-teal-900/10 border-l-4 border-teal-500 rounded-r-xl">
                        <p className="text-gray-300 italic text-lg leading-relaxed">
                            "The problem isn't that teachers aren't organized enough.
                            The problem is they were handed 15 tools and told to figure it out."
                        </p>
                        <p className="text-teal-400 text-sm mt-2 font-medium">Every principal we've talked to</p>
                    </div>
                </div>
            </section>

            {/* SECTION 2: FEATURES */}
            <section className="py-24 px-6 border-t border-teal-900/40">
                <div className="max-w-5xl mx-auto">

                    <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4">
                        What TheClassHive actually does
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
                        One login. Everything you need.<br />
                        Nothing you don't.
                    </h2>

                    <p className="text-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
                        We're not building another app for your collection. We're replacing the collection.
                        Here's what's inside and why each one matters on a Tuesday morning at 7:45am.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <BookOpen className="h-7 w-7 text-teal-400" />,
                                title: "Lesson Planning",
                                hook: "Build a week of lessons in the time it used to take to build one.",
                                body: "Templates, standards alignment, and AI-assisted content generation all in one place. Your lesson plans are searchable, shareable, and actually reusable next year. Revolutionary concept, we know.",
                            },
                            {
                                icon: <Users className="h-7 w-7 text-teal-400" />,
                                title: "Student Management",
                                hook: "Every student. Every note. Every attendance record. One screen.",
                                body: "No more hunting through three systems to remember why Marcus was struggling in October. Performance trends, attendance, IEP flags, and small group assignments live in one profile. You'll actually use it.",
                            },
                            {
                                icon: <MessageSquare className="h-7 w-7 text-teal-400" />,
                                title: "Parent Communication",
                                hook: "Stop losing parent emails in a tool you barely remember logging into.",
                                body: "Message inbox, announcement builder, and conference scheduler all in one place. Templates for the messages you send 40 times a year. Auto-translated for multilingual families. Parents get clarity. You get your evenings back.",
                            },
                            {
                                icon: <Sparkles className="h-7 w-7 text-teal-400" />,
                                title: "AI Assistant",
                                hook: "It does the first draft. You do the thinking. That's a good deal.",
                                body: "Generate differentiated assignments, rubrics, IEP goal suggestions, and parent update drafts in seconds. Not to replace your judgment. To stop burning it on things that don't require it.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group bg-teal-950/20 border border-teal-800/30 rounded-2xl p-8 hover:bg-teal-950/40 hover:border-teal-600/40 transition-all duration-300"
                            >
                                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 bg-teal-900/40 rounded-xl group-hover:bg-teal-900/60 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-teal-300 font-medium mb-3 leading-snug">{feature.hook}</p>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: TRUST STRIP */}
            <section className="py-20 px-6 border-t border-teal-900/40">
                <div className="max-w-5xl mx-auto">

                    <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-4 text-center">
                        For the IT director who has to sign off on this
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        We know you've been burned before.<br />
                        Here's why this is different.
                    </h2>

                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
                        Student data compliance isn't a checkbox for us. It's the foundation.
                        We built TheClassHive for districts that can't afford to get this wrong.
                        Which is every district.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                badge: "FERPA Aligned",
                                title: "We operate as a school official",
                                body: "Under FERPA §99.31(a)(1), we process student data on behalf of the school, not as a third party extracting value from it. Your district stays in control. That's not marketing language. That's the legal structure.",
                            },
                            {
                                badge: "COPPA Compliant",
                                title: "Students under 13 are protected by design",
                                body: "No direct data collection from minors outside supervised school use. No ad targeting. No behavioral profiling. If it can't pass a parent review, it doesn't ship. That's our policy, not just our pitch.",
                            },
                            {
                                badge: "SOC 2 Roadmap",
                                title: "TLS 1.3 in transit. AES-256 at rest.",
                                body: "Row-level security at the database layer, not just the application layer. All data stored in the US. SOC 2 Type II certification is on the roadmap. DPA available on request at legal@theclasshive.com.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-teal-950/20 border border-teal-800/30 rounded-2xl p-8"
                            >
                                <div className="inline-flex items-center px-3 py-1 bg-teal-900/50 border border-teal-700/50 rounded-full text-xs font-semibold text-teal-300 mb-5">
                                    <Shield className="h-3 w-3 mr-1.5" />
                                    {item.badge}
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        {[
                            "Named Privacy Officer",
                            "72-hour breach notification",
                            "Data purged within 30 days of account deletion",
                            "No data sold. Ever.",
                            "DPA available on request",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: BOTTOM CTA */}
            <section className="py-28 px-6 border-t border-teal-900/40">
                <div className="max-w-3xl mx-auto text-center">

                    <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-6">
                        The part where we ask you to do something
                    </p>

                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
                        Your teachers are losing 23 days a year.
                        <span className="block text-teal-300 mt-2">That ends now, or it doesn't.</span>
                    </h2>

                    <p className="text-lg text-gray-400 max-w-xl mx-auto mb-4 leading-relaxed">
                        Look, we're not going to tell you this is the only solution.
                        We're going to tell you it's the one built specifically for this problem,
                        by people who understand why the other solutions keep failing.
                    </p>

                    <p className="text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
                        Early access is limited. Not in a fake-scarcity way. More like a
                        "we're onboarding carefully so our first cohort actually succeeds" way.
                        If that sounds like the kind of product you want your teachers using,
                        the form is right below.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/request-early-access"
                            className="px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30"
                        >
                            Request Early Access
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-10 py-5 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-400/30 hover:border-teal-400/50 text-teal-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                        >
                            See the Demo First
                        </Link>
                    </div>

                    <p className="text-gray-600 text-sm mt-8">
                        No credit card. No sales call. No "synergy."
                        Just a product that respects your teachers' time as much as you do.
                    </p>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-10 px-6 border-t border-teal-900/40">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>© 2026 TheClassHive. Built for the teachers holding it together.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy</Link>
                        <Link href="/security" className="hover:text-teal-400 transition-colors">Security</Link>
                        <Link href="/request-early-access" className="hover:text-teal-400 transition-colors">Early Access</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}
