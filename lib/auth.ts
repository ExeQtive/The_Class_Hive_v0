import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.password) {
          throw new Error("User not found")
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub

        // Fetch user subscription data
        const user = await db.user.findUnique({
          where: { id: token.sub },
          select: {
            subscriptionPlan: true, // Changed from planType
            subscriptionStatus: true,
            trialEndsAt: true,
            isLifetimeMember: true,
            aiCreditsRemaining: true, // Changed from aiCredits
            role: true,
          },
        })

        if (user) {
          session.user.planType = user.subscriptionPlan // Map subscriptionPlan to planType for frontend
          session.user.subscriptionStatus = user.subscriptionStatus
          session.user.trialEndsAt = user.trialEndsAt
          session.user.isLifetimeMember = user.isLifetimeMember
          session.user.aiCredits = user.aiCreditsRemaining // Map aiCreditsRemaining to aiCredits for frontend
          session.user.role = user.role || "teacher" // Default to teacher if not set
        }
      }
      return session
    },
  },
}
