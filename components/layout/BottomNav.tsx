"use client"

import { Group, Paper, Text, UnstyledButton } from "@mantine/core"
import {
  IconDeviceMobile,
  IconDeviceSim,
  IconLayoutDashboard,
  IconPackage,
  IconReceipt2,
} from "@tabler/icons-react"
import { usePathname, useRouter } from "next/navigation"
import type { ComponentType } from "react"

type NavItem = {
  label: string
  href: string
  icon: ComponentType<{ size?: number; stroke?: number; color?: string }>
  isActive: (pathname: string) => boolean
}

const items: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: IconLayoutDashboard,
    isActive: (p) => p === "/dashboard" || p === "/",
  },
  {
    label: "Packages",
    href: "/packages",
    icon: IconPackage,
    isActive: (p) => p.startsWith("/packages"),
  },
  {
    label: "My eSIM",
    href: "/my-packages",
    icon: IconDeviceSim,
    isActive: (p) => p.startsWith("/my-packages"),
  },
  {
    label: "Devices",
    href: "/devices",
    icon: IconDeviceMobile,
    isActive: (p) => p.startsWith("/devices"),
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: IconReceipt2,
    isActive: (p) => p.startsWith("/transactions"),
  },
]

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Paper
      withBorder
      h="100%"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Group justify="space-between" w="100%" gap="xs" wrap="nowrap">
        {items.map((item) => {
          const active = item.isActive(pathname)
          const Icon = item.icon
          const color = active
            ? "var(--mantine-color-brand-6)"
            : "var(--mantine-color-dimmed)"
          return (
            <UnstyledButton
              key={item.href}
              onClick={() => router.push(item.href)}
              aria-current={active ? "page" : undefined}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Icon size={20} stroke={active ? 2.4 : 2} color={color} />
                <Text size="xs" fw={active ? 700 : 500} c={active ? "brand.6" : "dimmed"}>
                  {item.label}
                </Text>
              </div>
            </UnstyledButton>
          )
        })}
      </Group>
    </Paper>
  )
}
