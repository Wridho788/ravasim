"use client"

import { Badge, Button, Card, Group, Text } from "@mantine/core"

import type { Esim } from "../types/esim.types"

export default function EsimCard({
  esim,
  onActivate,
  onViewQr,
}: {
  esim: Esim
  onActivate: (id: string) => void
  onViewQr: () => void
}) {
  return (
    <Card withBorder p="lg">
      <Group justify="space-between" mb="xs">
        <Text fw={700}>{esim.packageName}</Text>
        <Badge variant="light" color={esim.status === "active" ? "green" : "gray"}>
          {esim.status}
        </Badge>
      </Group>

      <Text size="sm">
        Data Used: {esim.usedData}GB / {esim.totalData}GB
      </Text>

      <Group mt="md">
        {esim.status === "inactive" && (
          <Button onClick={() => onActivate(esim.id)}>Activate</Button>
        )}

        {esim.status === "active" && (
          <Button variant="light" onClick={onViewQr}>
            View QR
          </Button>
        )}
      </Group>
    </Card>
  )
}
