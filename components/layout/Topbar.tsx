"use client"

import { Button, Group, Text, UnstyledButton } from "@mantine/core"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth.store"

export default function Topbar() {
  const router = useRouter()

  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Group justify="space-between" px="md" h="100%">
      <Text fw={700}>RavaSIM</Text>

      <Group>
        {user?.name ? (
          <UnstyledButton onClick={() => router.push("/profile")} aria-label="Open profile">
            <Text size="sm">{user.name}</Text>
          </UnstyledButton>
        ) : null}
        <Button size="xs" variant="light" onClick={handleLogout}>
          Logout
        </Button>
      </Group>
    </Group>
  )
}
