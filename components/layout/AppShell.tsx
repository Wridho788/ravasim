"use client"

import type { ReactNode } from "react"
import { AppShell as MantineAppShell, Box } from "@mantine/core"
import Topbar from "./Topbar"
import BottomNav from "./BottomNav"

const FRAME_MAX_WIDTH = 480

const frameStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: FRAME_MAX_WIDTH,
  margin: "0 auto",
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <MantineAppShell
      padding={0}
      header={{ height: 60 }}
      footer={{ height: 64 }}
    >
      <MantineAppShell.Header>
        <Box style={frameStyle} h="100%" px={24}>
          <Topbar />
        </Box>
      </MantineAppShell.Header>

      <MantineAppShell.Main>
        <Box style={frameStyle} px={24} py={24}>
          {children}
        </Box>
      </MantineAppShell.Main>

      <MantineAppShell.Footer>
        <Box style={frameStyle} h="100%" px={12}>
          <BottomNav />
        </Box>
      </MantineAppShell.Footer>
    </MantineAppShell>
  )
}
