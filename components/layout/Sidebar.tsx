"use client"

import { NavLink, Stack } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Packages", href: "/packages" },
  { label: "My eSIM", href: "/my-packages" },
  { label: "Devices", href: "/devices" },
  { label: "Transactions", href: "/transactions" },
  { label: "Profile", href: "/profile" },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Stack p="md" gap={4}>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          label={item.label}
          active={pathname === item.href}
          onClick={() => router.push(item.href)}
        />
      ))}
    </Stack>
  )
}
