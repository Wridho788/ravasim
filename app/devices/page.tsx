"use client"

import { useState } from "react"
import { Button, Grid, Loader, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { useDevices } from "@/modules/devices/hooks/useDevices"
import { useAddDevice } from "@/modules/devices/hooks/useAddDevice"
import DeviceCard from "@/modules/devices/components/DeviceCard"
import AddDeviceModal from "@/modules/devices/components/AddDeviceModal"
import type { Device } from "@/modules/devices/types/devices.types"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string") return message
  }
  return "Something went wrong"
}

export default function DevicesPage() {
  const { data, isLoading } = useDevices()
  const addDevice = useAddDevice()

  const [opened, setOpened] = useState(false)

  const handleAddDevice = async (device: Device) => {
    try {
      await addDevice.mutateAsync(device)
      notifications.show({ title: "Saved", message: "Device added" })
    } catch (e: unknown) {
      notifications.show({
        color: "red",
        title: "Save failed",
        message: getErrorMessage(e),
      })
    }
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          Devices
        </Title>

        <Button mb="lg" onClick={() => setOpened(true)}>
          Add Device
        </Button>

        {isLoading ? (
          <Loader />
        ) : (
          <Grid>
            {(data ?? []).map((device) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={device.id}>
                <DeviceCard device={device} />
              </Grid.Col>
            ))}
          </Grid>
        )}

        <AddDeviceModal
          opened={opened}
          onClose={() => setOpened(false)}
          onSubmit={handleAddDevice}
        />
      </DashboardShell>
    </AuthGuard>
  )
}
