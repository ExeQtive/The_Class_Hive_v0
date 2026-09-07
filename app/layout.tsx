import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// Import the StorageInitializer
import { StorageInitializer } from "@/components/storage-initializer"

const inter = Inter({ subsets: ["latin"] })
// Bold display face for the hero logo's wordmark — exposed as a CSS variable
// so it can be used inside the logo's SVG <text> without going global.
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: {
    default: "TheClassHive",
    template: "%s | TheClassHive",
  },
  description: "Replace 15 edtech tools with one unified teacher workspace. Lesson planning, student management, and parent communication in one place.",
  openGraph: {
    title: "TheClassHive",
    description: "Replace 15 edtech tools with one unified teacher workspace.",
    url: "https://www.theclasshive.com",
    siteName: "TheClassHive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheClassHive",
    description: "Replace 15 edtech tools with one unified teacher workspace.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${orbitron.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StorageInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
