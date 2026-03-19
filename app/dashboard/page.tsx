"use client"

import Link from "next/link"
import { useMemo } from "react"
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Progress,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core"
import {
  IconArrowRight,
  IconBulb,
  IconReceipt,
  IconSignal5g,
  IconTrendingUp,
} from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { useAuthStore } from "@/store/auth.store"

import { useEsims } from "@/modules/esim/hooks/useEsims"
import { ordersService } from "@/modules/orders/services/orders.service"

export default function DashboardPage() {
  const theme = useMantineTheme()
  const user = useAuthStore((s) => s.user)

  const esimsQuery = useEsims()
  const txQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: ordersService.getTransactions,
  })

  const { activeEsims, totalUsedGb, totalEsims } = useMemo(() => {
    const esims = esimsQuery.data ?? []
    const active = esims.filter((e) => e.status === "active")
    const used = esims.reduce((sum, e) => sum + (e.usedData ?? 0), 0)
    return {
      activeEsims: active,
      totalUsedGb: used,
      totalEsims: esims.length,
    }
  }, [esimsQuery.data])

  const transactionsCount = (txQuery.data ?? []).length
  const activeCount = activeEsims.length
  const primaryEsim = activeEsims[0] ?? null
  const primaryUsedPct =
    primaryEsim && primaryEsim.totalData > 0
      ? (primaryEsim.usedData / primaryEsim.totalData) * 100
      : 0

  const greetingName = user?.name?.split(" ")[0] || "there"

  const statusText = primaryEsim
    ? "Your connectivity is active"
    : totalEsims > 0
      ? "Activate your first eSIM to get connected"
      : "Get started by buying your first eSIM"

  const insightText = primaryEsim
    ? `You're currently using ${Math.round(primaryUsedPct)}% of your data`
    : "Track usage and manage plans in one place"

  const usageBars = useMemo(() => {
    const base = Math.max(1, Math.round((primaryUsedPct || 12) / 12))
    return [3, 5, 7, 2, 6, 4, 8].map((v, idx) => {
      const scaled = Math.min(10, Math.max(1, v + (idx % 2 === 0 ? base : 0)))
      return scaled
    })
  }, [primaryUsedPct])

  return (
    <AuthGuard>
      <DashboardShell>
        <Stack gap={24}>
          <Paper
            withBorder
            radius="lg"
            p="lg"
            style={{
              background:
                `linear-gradient(135deg, ${theme.colors.brand[0]} 0%, ${theme.colors.cyan?.[0] ?? theme.white} 100%)`,
            }}
          >
            <Group justify="space-between" align="flex-start" gap="md">
              <Stack gap={6}>
                <Title order={3}>Hello, {greetingName}</Title>
                <Text size="sm" c="dimmed">
                  {statusText}
                </Text>
                <Text size="sm">{insightText}</Text>
              </Stack>

              <ThemeIcon size={44} radius="xl" variant="light" color="brand">
                <IconSignal5g size={22} />
              </ThemeIcon>
            </Group>
          </Paper>

          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <Card>
              <Group justify="space-between">
                <Group gap="sm">
                  <ThemeIcon variant="light" radius="xl" color="brand">
                    <IconSignal5g size={18} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    Active SIM
                  </Text>
                </Group>
                {esimsQuery.isLoading ? (
                  <Skeleton height={18} width={40} />
                ) : (
                  <Text size="xl" fw={800}>
                    {activeCount}
                  </Text>
                )}
              </Group>
            </Card>

            <Card>
              <Group justify="space-between">
                <Group gap="sm">
                  <ThemeIcon variant="light" radius="xl" color="brand">
                    <IconTrendingUp size={18} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    Data Usage
                  </Text>
                </Group>
                {esimsQuery.isLoading ? (
                  <Skeleton height={18} width={60} />
                ) : (
                  <Text size="xl" fw={800}>
                    {totalUsedGb} GB
                  </Text>
                )}
              </Group>
            </Card>

            <Card>
              <Group justify="space-between">
                <Group gap="sm">
                  <ThemeIcon variant="light" radius="xl" color="brand">
                    <IconReceipt size={18} />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    Transactions
                  </Text>
                </Group>
                {txQuery.isLoading ? (
                  <Skeleton height={18} width={40} />
                ) : (
                  <Text size="xl" fw={800}>
                    {transactionsCount}
                  </Text>
                )}
              </Group>
            </Card>

            <Card style={{ gridColumn: "1 / -1" }}>
              <Group justify="space-between" mb="xs">
                <Title order={4}>Active eSIM</Title>
                <Button
                  component={Link}
                  href="/my-packages"
                  variant="subtle"
                  rightSection={<IconArrowRight size={16} />}
                >
                  View Details
                </Button>
              </Group>

              {esimsQuery.isLoading ? (
                <Stack gap={10}>
                  <Skeleton height={14} width="70%" />
                  <Skeleton height={10} width="40%" />
                  <Skeleton height={10} width="90%" />
                  <Skeleton height={10} width="60%" />
                </Stack>
              ) : primaryEsim ? (
                <Stack gap={10}>
                  <Group justify="space-between">
                    <Text fw={700}>{primaryEsim.packageName}</Text>
                    <Badge variant="light" color="green">
                      Active
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {primaryEsim.usedData}GB used of {primaryEsim.totalData}GB
                  </Text>
                  <Progress value={Math.min(100, Math.max(0, primaryUsedPct))} radius="xl" />
                  <Text size="xs" c="dimmed">
                    You might run out of data in{" "}
                    {Math.max(
                      1,
                      Math.round((primaryEsim.totalData - primaryEsim.usedData) / 1.5)
                    )}{" "}
                    days
                  </Text>
                </Stack>
              ) : (
                <Stack gap={6}>
                  <Text fw={700}>No eSIM yet</Text>
                  <Text size="sm" c="dimmed">
                    Buy your first eSIM to get started
                  </Text>
                  <Button component={Link} href="/packages" variant="light">
                    Browse Packages
                  </Button>
                </Stack>
              )}
            </Card>

            <Card style={{ gridColumn: "1 / -1" }}>
              <Title order={4} mb="xs">
                Data Usage (Chart)
              </Title>
              <Text size="sm" c="dimmed" mb="md">
                Last 7 days activity
              </Text>

              {esimsQuery.isLoading ? (
                <Skeleton height={84} />
              ) : (
                <Box style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 84 }}>
                  {usageBars.map((v, i) => (
                    <Box
                      key={i}
                      style={{
                        width: "100%",
                        height: `${v * 8}px`,
                        borderRadius: 999,
                        backgroundColor: theme.colors.brand[4],
                        opacity: i === usageBars.length - 1 ? 1 : 0.55,
                      }}
                    />
                  ))}
                </Box>
              )}
            </Card>
          </Box>

          <Card>
            <Group justify="space-between" mb="xs">
              <Title order={4}>Recent Transactions</Title>
              <Button
                component={Link}
                href="/transactions"
                variant="subtle"
                rightSection={<IconArrowRight size={16} />}
              >
                View all
              </Button>
            </Group>
            <Divider mb="md" />

            {txQuery.isLoading ? (
              <Stack gap={10}>
                <Skeleton height={18} />
                <Skeleton height={18} />
                <Skeleton height={18} />
              </Stack>
            ) : (txQuery.data ?? []).length === 0 ? (
              <Text size="sm" c="dimmed">
                No transactions yet.
              </Text>
            ) : (
              <Stack gap={10}>
                {(txQuery.data ?? []).slice(0, 3).map((tx) => (
                  <Group key={tx.id} justify="space-between" wrap="nowrap" gap="md">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text fw={600} lineClamp={1}>
                        {tx.packageName}
                      </Text>
                      <Text size="xs" c="dimmed">
                        ${tx.price} · {tx.paymentMethod}
                      </Text>
                    </div>
                    <Badge variant="light" color={tx.status === "success" ? "green" : "yellow"}>
                      {tx.status}
                    </Badge>
                  </Group>
                ))}
              </Stack>
            )}
          </Card>

          <Paper
            withBorder
            radius="lg"
            p="lg"
            style={{
              background:
                `linear-gradient(135deg, ${theme.colors.brand[1]} 0%, ${theme.colors.cyan?.[1] ?? theme.white} 100%)`,
            }}
          >
            <Group gap="sm" align="flex-start">
              <ThemeIcon variant="light" color="brand" radius="xl">
                <IconBulb size={18} />
              </ThemeIcon>
              <div>
                <Text fw={700}>Travel Tip</Text>
                <Text size="sm" c="dimmed">
                  Use eSIM before landing to avoid roaming fees
                </Text>
              </div>
            </Group>
          </Paper>
        </Stack>
      </DashboardShell>
    </AuthGuard>
  )
}
