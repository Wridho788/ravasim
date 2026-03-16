"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button, Card, Loader, Text, Title } from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { devicesService } from "@/modules/devices/services/devices.service"

export default function DeviceDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ["device", params.id],
    queryFn: () => devicesService.getDeviceDetail(params.id),
  })

  return (
    <AuthGuard>
      <DashboardShell>
        {isLoading ? (
          <Loader />
        ) : !data ? (
          <Text>Device not found</Text>
        ) : (
          <Card withBorder p="xl">
            <Title order={2}>{data.name}</Title>

            <Text mt="md">Brand: {data.brand}</Text>
            <Text>eSIM Compatible: {data.esimCompatible ? "Yes" : "No"}</Text>
            <Text>Linked eSIM: {data.linkedEsim || "None"}</Text>

            <Button mt="lg" variant="light" onClick={() => router.back()}>
              Back
            </Button>
          </Card>
        )}
      </DashboardShell>
    </AuthGuard>
  )
}
