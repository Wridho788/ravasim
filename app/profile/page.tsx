"use client"

import { Card, Text, Title } from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"
import { useAuthStore } from "@/store/auth.store"

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          Profile
        </Title>

        <Card withBorder p="lg">
          <Text fw={700}>{user?.name ?? "-"}</Text>
          <Text c="dimmed" size="sm">
            {user?.email ?? "-"}
          </Text>
        </Card>
      </DashboardShell>
    </AuthGuard>
  )
}
