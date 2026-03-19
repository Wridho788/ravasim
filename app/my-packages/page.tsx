"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Badge, Button, Box, Group, Skeleton, Stack, Text, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { useEsims } from "@/modules/esim/hooks/useEsims"
import { useActivateEsim } from "@/modules/esim/hooks/useActivateEsim"
import EsimCard from "@/modules/esim/components/EsimCard"
import QRActivation from "@/modules/esim/components/QRActivation"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string") return message
  }
  return "Something went wrong"
}

export default function MyPackagesPage() {
  const { data, isLoading } = useEsims()
  const activate = useActivateEsim()

  const [qrOpened, setQrOpened] = useState(false)

  const { featured, rest, counts } = useMemo(() => {
    const esims = data ?? []
    const active = esims.filter((e) => e.status === "active")
    const featured = active[0] ?? null
    const rest = featured ? esims.filter((e) => e.id !== featured.id) : esims
    return {
      featured,
      rest,
      counts: {
        total: esims.length,
        active: active.length,
        inactive: esims.length - active.length,
      },
    }
  }, [data])

  const handleActivate = async (id: string) => {
    try {
      await activate.mutateAsync(id)
      notifications.show({ title: "Activated", message: "eSIM is now active" })
    } catch (e: unknown) {
      notifications.show({
        color: "red",
        title: "Activate failed",
        message: getErrorMessage(e),
      })
    }
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <Stack gap={24}>
          <Group justify="space-between" align="flex-end" mb="lg">
            <div>
              <Title order={2}>My eSIM</Title>
              <Text size="sm" c="dimmed" mt={4}>
                Manage your plans and track usage
              </Text>
            </div>
            {!isLoading && counts.total > 0 ? (
              <Group gap={8}>
                <Badge variant="light" color={counts.active > 0 ? "green" : "gray"}>
                  {counts.active} active
                </Badge>
                <Badge variant="light" color="gray">
                  {counts.inactive} inactive
                </Badge>
              </Group>
            ) : null}
          </Group>

          {isLoading ? (
            <Stack gap={16}>
              <Skeleton height={180} radius="lg" />
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                }}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} height={170} radius="lg" />
                ))}
              </Box>
            </Stack>
          ) : (data ?? []).length === 0 ? (
            <Stack gap={8}>
              <Text fw={700}>No eSIM yet</Text>
              <Text size="sm" c="dimmed">
                Buy your first eSIM to get started
              </Text>
              <Button
                component={Link}
                href="/packages"
                variant="light"
                w="fit-content"
              >
                Browse Packages
              </Button>
            </Stack>
          ) : (
            <Stack gap={20}>
              <Stack gap={10}>
                <Group justify="space-between">
                  <Text fw={800}>Featured</Text>
                  <Text size="xs" c="dimmed">
                    Active plan highlighted
                  </Text>
                </Group>

                {featured ? (
                  <EsimCard
                    esim={featured}
                    onActivate={handleActivate}
                    onViewQr={() => setQrOpened(true)}
                  />
                ) : (
                  <Stack gap={6}>
                    <Text fw={700}>No active eSIM</Text>
                    <Text size="sm" c="dimmed">
                      Activate one of your inactive eSIMs to get connected
                    </Text>
                  </Stack>
                )}
              </Stack>

              <Stack gap={10}>
                <Group justify="space-between">
                  <Text fw={800}>All eSIM</Text>
                  <Text size="xs" c="dimmed">
                    {counts.total} plans
                  </Text>
                </Group>

                <Box
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                  }}
                >
                  {rest.map((esim) => (
                    <EsimCard
                      key={esim.id}
                      esim={esim}
                      onActivate={handleActivate}
                      onViewQr={() => setQrOpened(true)}
                    />
                  ))}
                </Box>
              </Stack>
            </Stack>
          )}
        </Stack>

        <QRActivation opened={qrOpened} onClose={() => setQrOpened(false)} />
      </DashboardShell>
    </AuthGuard>
  )
}
