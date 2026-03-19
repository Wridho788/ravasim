"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Badge, Button, Card, Group, Skeleton, Stack, Text, Title } from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { packagesService } from "@/modules/packages/services/packages.service"

export default function PackageDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ["package", params.id],
    queryFn: () => packagesService.getPackageDetail(params.id),
  })

  return (
    <AuthGuard>
      <DashboardShell>
        {isLoading ? (
          <Stack>
            <Skeleton height={34} width="60%" />
            <Skeleton height={180} radius="lg" />
          </Stack>
        ) : !data ? (
          <Text>Package not found</Text>
        ) : (
          <Card p="lg">
            <Group justify="space-between" align="flex-start" gap="md">
              <div style={{ flex: 1, minWidth: 0 }}>
                <Title order={2} lineClamp={2}>
                  {data.name}
                </Title>
                <Text c="dimmed" mt={6}>
                  {data.country}
                </Text>
              </div>
              {data.badge ? (
                <Badge variant="light" color={data.badge === "Best Seller" ? "yellow" : "brand"}>
                  {data.badge}
                </Badge>
              ) : null}
            </Group>

            <Stack gap={6} mt="lg">
              <Text>
                <Text span fw={600}>
                  Data:
                </Text>{" "}
                {data.data}
              </Text>
              <Text>
                <Text span fw={600}>
                  Validity:
                </Text>{" "}
                {data.validity}
              </Text>
            </Stack>

            <Text mt="lg" fw={800} size="xl">
              ${data.price}
            </Text>

            <Button mt="lg" onClick={() => router.push(`/checkout/${data.id}`)}>
              Buy Package
            </Button>
          </Card>
        )}
      </DashboardShell>
    </AuthGuard>
  )
}
