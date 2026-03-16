"use client"

import type { ReactNode } from "react"
import { AppShell as MantineAppShell } from "@mantine/core"

import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <MantineAppShell
      padding="md"
      navbar={{ width: 240, breakpoint: "sm" }}
      header={{ height: 60 }}
    >
      <MantineAppShell.Navbar>
        <Sidebar />
      </MantineAppShell.Navbar>

      <MantineAppShell.Header>
        <Topbar />
      </MantineAppShell.Header>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  )
}
