"use client"

import { Card, Text } from "@mantine/core"

export default function OrderSummary({ pkg }: any) {
  return (
    <Card withBorder p="lg">
      <Text fw={700}>{pkg.name}</Text>

      <Text size="sm">Data: {pkg.data}</Text>
      <Text size="sm">Validity: {pkg.validity}</Text>

      <Text mt="md" fw={700}>
        ${pkg.price}
      </Text>
    </Card>
  )
}
