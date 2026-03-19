"use client"

import type { ReactNode } from "react"
import { AppShell as MantineAppShell } from "@mantine/core"
import Topbar from "./Topbar"
import BottomNav from "./BottomNav"

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <MantineAppShell
      padding="md"
      header={{ height: 60 }}
      footer={{ height: 64 }}
    >
      <MantineAppShell.Header>
        <Topbar />
      </MantineAppShell.Header>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>

      <MantineAppShell.Footer>
        <BottomNav />
      </MantineAppShell.Footer>
    </MantineAppShell>
  )
}
