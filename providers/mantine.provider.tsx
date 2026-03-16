"use client"

import type { ReactNode } from "react"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

import { theme } from "@/config/theme"

export function MantineAppProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      {children}
    </MantineProvider>
  )
}
