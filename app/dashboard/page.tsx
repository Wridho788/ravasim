"use client"

import { Card, Grid, Text, Title } from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          Dashboard
        </Title>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder p="lg">
              <Text size="sm">Active eSIM</Text>
              <Text fw={700} size="xl">
                3
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder p="lg">
              <Text size="sm">Data Usage</Text>
              <Text fw={700} size="xl">
                12 GB
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder p="lg">
              <Text size="sm">Transactions</Text>
              <Text fw={700} size="xl">
                8
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </DashboardShell>
    </AuthGuard>
  )
}
