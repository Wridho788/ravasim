"use client"

import { useState } from "react"
import { Grid, Loader, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { useEsims } from "@/modules/esim/hooks/useEsims"
import { useActivateEsim } from "@/modules/esim/hooks/useActivateEsim"
import EsimCard from "@/modules/esim/components/EsimCard"
import QRActivation from "@/modules/esim/components/QRActivation"

export default function MyPackagesPage() {
  const { data, isLoading } = useEsims()
  const activate = useActivateEsim()

  const [qrOpened, setQrOpened] = useState(false)

  const handleActivate = async (id: string) => {
    try {
      await activate.mutateAsync(id)
      notifications.show({ title: "Activated", message: "eSIM is now active" })
    } catch (e: any) {
      notifications.show({
        color: "red",
        title: "Activate failed",
        message: e?.message ?? "Something went wrong",
      })
    }
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          My eSIM
        </Title>

        {isLoading ? (
          <Loader />
        ) : (
          <Grid>
            {(data ?? []).map((esim) => (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={esim.id}>
                <EsimCard
                  esim={esim}
                  onActivate={handleActivate}
                  onViewQr={() => setQrOpened(true)}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}

        <QRActivation opened={qrOpened} onClose={() => setQrOpened(false)} />
      </DashboardShell>
    </AuthGuard>
  )
}
