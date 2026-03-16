"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button, Card, Loader, Text, Title } from "@mantine/core"

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
          <Loader />
        ) : !data ? (
          <Text>Package not found</Text>
        ) : (
          <Card withBorder p="xl">
            <Title order={2}>{data.name}</Title>

            <Text mt="md">Country: {data.country}</Text>
            <Text>Data: {data.data}</Text>
            <Text>Validity: {data.validity}</Text>

            <Text mt="md" fw={700}>
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
