"use client"

import { Group, Paper, Text, UnstyledButton } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"

type NavItem = {
  label: string
  href: string
  isActive: (pathname: string) => boolean
}

const items: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    isActive: (p) => p === "/dashboard" || p === "/",
  },
  {
    label: "Packages",
    href: "/packages",
    isActive: (p) => p.startsWith("/packages"),
  },
  {
    label: "My eSIM",
    href: "/my-packages",
    isActive: (p) => p.startsWith("/my-packages"),
  },
  {
    label: "Devices",
    href: "/devices",
    isActive: (p) => p.startsWith("/devices"),
  },
  {
    label: "Transactions",
    href: "/transactions",
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
      px="md"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Group justify="space-between" w="100%" gap="xs" wrap="nowrap">
        {items.map((item) => {
          const active = item.isActive(pathname)
          return (
            <UnstyledButton
              key={item.href}
              onClick={() => router.push(item.href)}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <Text size="xs" fw={active ? 700 : 500} c={active ? "brand.6" : "dimmed"}>
                {item.label}
              </Text>
            </UnstyledButton>
          )
        })}
      </Group>
    </Paper>
  )
}
