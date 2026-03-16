"use client"

import type { ReactNode } from "react"

import { MantineAppProvider } from "./mantine.provider"
import { QueryProvider } from "./query.provider"

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <MantineAppProvider>
      <QueryProvider>{children}</QueryProvider>
    </MantineAppProvider>
  )
}
