"use client"

import { Button, Card, Text } from "@mantine/core"
import { useRouter } from "next/navigation"

import type { Device } from "../types/devices.types"

export default function DeviceCard({ device }: { device: Device }) {
  const router = useRouter()

  return (
    <Card withBorder p="lg">
      <Text fw={700}>{device.name}</Text>

      <Text size="sm">Brand: {device.brand}</Text>
      <Text size="sm">
        eSIM Compatible: {device.esimCompatible ? "Yes" : "No"}
      </Text>
      <Text size="sm">Linked eSIM: {device.linkedEsim || "None"}</Text>

      <Button mt="md" fullWidth onClick={() => router.push(`/devices/${device.id}`)}>
        View Device
      </Button>
    </Card>
  )
}
