"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"

const hasClerkKey =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.length > 5 &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder")

const ClerkProviderLazy = hasClerkKey
  ? dynamic(
      () =>
        import("@clerk/nextjs").then(({ ClerkProvider }) => {
          return function ClerkWrapper({ children }: { children: ReactNode }) {
            return <ClerkProvider>{children}</ClerkProvider>
          }
        }),
      { ssr: true }
    )
  : null

export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  if (!ClerkProviderLazy) {
    return <>{children}</>
  }
  return <ClerkProviderLazy>{children}</ClerkProviderLazy>
}
