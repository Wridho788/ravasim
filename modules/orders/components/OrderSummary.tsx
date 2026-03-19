"use client"

import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core"

import type { Package } from "@/modules/packages/types/packages.types"

export default function OrderSummary({ pkg }: { pkg: Package }) {
  return (
    <Card>
      <Stack gap={10}>
        <Group justify="space-between" align="flex-start" gap="sm">
          <div style={{ flex: 1, minWidth: 0 }}>
            <Title order={4} lineClamp={1}>
              Order Summary
            </Title>
            <Text fw={700} mt={6} lineClamp={1}>
              {pkg.name}
            </Text>
            <Text size="sm" c="dimmed">
              {pkg.country}
            </Text>
          </div>
          {pkg.badge ? (
            <Badge variant="light" color={pkg.badge === "Best Seller" ? "yellow" : "brand"}>
              {pkg.badge}
            </Badge>
          ) : null}
        </Group>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Data
          </Text>
          <Text size="sm" fw={600}>
            {pkg.data}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Validity
          </Text>
          <Text size="sm" fw={600}>
            {pkg.validity}
          </Text>
        </Group>

        <Group justify="space-between" mt={6}>
          <Text size="sm" c="dimmed">
            Total
          </Text>
          <Text fw={800} size="xl">
            ${pkg.price}
          </Text>
        </Group>
      </Stack>
    </Card>
  )
}
