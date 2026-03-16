"use client"

import type { ReactNode } from "react"
import { AppShell as MantineAppShell } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import BottomNav from "./BottomNav"

export default function DashboardShell({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 48em)")

  return (
    <MantineAppShell
      padding="md"
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: true },
      }}
      header={{ height: 60 }}
      footer={{ height: 64 }}
    >
      {!isMobile && (
        <MantineAppShell.Navbar>
          <Sidebar />
        </MantineAppShell.Navbar>
      )}

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
