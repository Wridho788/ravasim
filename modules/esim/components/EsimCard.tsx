"use client"

import { Badge, Button, Card, Group, Progress, Stack, Text } from "@mantine/core"
import { IconQrcode, IconRocket } from "@tabler/icons-react"

import type { Esim } from "../types/esim.types"

function daysUntil(iso?: string) {
  if (!iso) return null
  const end = new Date(iso).getTime()
  if (Number.isNaN(end)) return null
  const diff = end - Date.now()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days
}

export default function EsimCard({
  esim,
  onActivate,
  onViewQr,
}: {
  esim: Esim
  onActivate: (id: string) => void
  onViewQr: () => void
}) {
  const usedPct = esim.totalData > 0 ? (esim.usedData / esim.totalData) * 100 : 0
  const expiresInDays = daysUntil(esim.expiresAt)

  return (
    <Card>
      <Stack gap={10}>
        <Group justify="space-between" align="flex-start" gap="sm">
          <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
            <Text fw={800} lineClamp={1}>
              {esim.packageName}
            </Text>
            <Text size="sm" c="dimmed">
              Used: {esim.usedData}GB / {esim.totalData}GB
            </Text>
          </Stack>

          <Badge
            variant="light"
            color={esim.status === "active" ? "green" : "gray"}
          >
            {esim.status}
          </Badge>
        </Group>

        <Progress value={Math.min(100, Math.max(0, usedPct))} radius="xl" />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            {Math.round(usedPct)}% used
          </Text>
          {typeof expiresInDays === "number" ? (
            <Text size="xs" c={expiresInDays <= 3 ? "red" : "dimmed"}>
              Expires in {Math.max(0, expiresInDays)} days
            </Text>
          ) : (
            <Text size="xs" c="dimmed">
              Expiry not set
            </Text>
          )}
        </Group>

        <Group mt={4}>
          {esim.status === "inactive" ? (
            <Button
              leftSection={<IconRocket size={16} />}
              onClick={() => onActivate(esim.id)}
            >
              Activate
            </Button>
          ) : (
            <Button
              variant="light"
              leftSection={<IconQrcode size={16} />}
              onClick={onViewQr}
            >
              View QR
            </Button>
          )}
        </Group>
      </Stack>
    </Card>
  )
}
