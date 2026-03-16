"use client"

import { Button, Card, Text } from "@mantine/core"
import { useRouter } from "next/navigation"

import type { Package } from "../types/packages.types"

export default function PackageCard({ pkg }: { pkg: Package }) {
  const router = useRouter()

  return (
    <Card withBorder p="lg">
      <Text fw={700}>{pkg.name}</Text>

      <Text size="sm">Data: {pkg.data}</Text>
      <Text size="sm">Validity: {pkg.validity}</Text>

      <Text mt="md" fw={700}>
        ${pkg.price}
      </Text>

      <Button mt="md" fullWidth onClick={() => router.push(`/packages/${pkg.id}`)}>
        View Detail
      </Button>
    </Card>
  )
}
