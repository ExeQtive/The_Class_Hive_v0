import Hero from "@/components/ui/animated-shader-hero"

export default function Home() {
  return (
    <Hero
      trustBadge={{
        text: "Built for K-12 educators",
        icons: ["✨"],
      }}
      headline={{
        line1: "One Workspace.",
        line2: "Every Teacher Needs.",
      }}
      subtitle="Replace 15 disconnected edtech tools with one unified dashboard for lesson planning, student management, and parent communication."
      buttons={{
        primary: {
          text: "Request Early Access",
          href: "/request-early-access",
        },
        secondary: {
          text: "See the Demo",
          href: "/dashboard",
        },
      }}
    />
  )
}