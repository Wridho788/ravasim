"use client"

import { Badge, Button, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconMapPin, IconSparkles, IconStars } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

import type { Package } from "../types/packages.types"

export default function PackageCard({ pkg }: { pkg: Package }) {
  const router = useRouter()

  const badgeColor = pkg.badge === "Best Seller" ? "yellow" : "brand"
  const badgeIcon = pkg.badge === "Best Seller" ? IconStars : IconSparkles

  return (
    <Card>
      <Stack gap={10}>
        <Group justify="space-between" align="flex-start" gap="sm">
          <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
            <Text fw={700} lineClamp={1}>
              {pkg.name}
            </Text>

            <Group gap={6} c="dimmed" wrap="nowrap">
              <ThemeIcon variant="light" size={22} radius="xl" color="brand">
                <IconMapPin size={14} />
              </ThemeIcon>
              <Text size="sm" lineClamp={1}>
                {pkg.country}
              </Text>
            </Group>
          </Stack>

          {pkg.badge ? (
            <Badge
              variant="light"
              color={badgeColor}
              leftSection={(() => {
                const I = badgeIcon
                return <I size={12} />
              })()}
            >
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

        <Group justify="space-between" mt={4}>
          <Text size="xs" c="dimmed">
            Price
          </Text>
          <Text fw={800} size="lg">
            ${pkg.price}
          </Text>
        </Group>

        <Button fullWidth onClick={() => router.push(`/packages/${pkg.id}`)}>
          View Details
        </Button>
      </Stack>
    </Card>
  )
}
