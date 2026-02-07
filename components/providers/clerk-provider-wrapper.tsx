"use client"

import { ClerkProvider } from "@clerk/nextjs"
import type { ReactNode } from "react"

const hasClerkKey =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 5 &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  if (!hasClerkKey) {
    return <>{children}</>
  }
  return <ClerkProvider>{children}</ClerkProvider>
}
