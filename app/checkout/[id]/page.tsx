"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import {
  Button,
  Card,
  Grid,
  Group,
  Radio,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconCreditCard, IconBrandPaypal } from "@tabler/icons-react"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { packagesService } from "@/modules/packages/services/packages.service"
import { useCreateOrder } from "@/modules/orders/hooks/useCreateOrder"
import OrderSummary from "@/modules/orders/components/OrderSummary"
import { useCreateEsim } from "@/modules/esim/hooks/useCreateEsim"

function parseNumberFromText(text: string) {
  const m = text.match(/(\d+(?:\.\d+)?)/)
  return m ? Number(m[1]) : 0
}

function daysFromNowIso(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + Math.max(1, Math.round(days)))
  return d.toISOString()
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string") return message
  }
  return "Something went wrong"
}

export default function CheckoutPage() {
  const params = useParams<{ id: string }>()

  const [payment, setPayment] = useState("card")
  const [paid, setPaid] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["package", params.id],
    queryFn: () => packagesService.getPackageDetail(params.id),
  })

  const createOrder = useCreateOrder()
  const createEsim = useCreateEsim()

  const handleCheckout = async () => {
    if (!data) return

    try {
      await createOrder.mutateAsync({
        id: Date.now().toString(),
        packageId: data.id,
        packageName: data.name,
        price: data.price,
        paymentMethod: payment,
        status: "success",
      })

      try {
        const totalData = parseNumberFromText(data.data)
        const validityDays = parseNumberFromText(data.validity)

        await createEsim.mutateAsync({
          packageName: data.name,
          totalData,
          usedData: 0,
          status: "active",
          expiresAt: daysFromNowIso(validityDays || 7),
        })
      } catch {
        // eSIM creation is best-effort for the demo
      }

      notifications.show({
        title: "Payment success",
        message: "Your eSIM is ready",
      })
      setPaid(true)
    } catch (e: unknown) {
      notifications.show({
        color: "red",
        title: "Checkout failed",
        message: getErrorMessage(e),
      })
    }
  }

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          Checkout
        </Title>

        {isLoading ? (
          <Stack>
            <Skeleton height={180} radius="lg" />
            <Skeleton height={140} radius="lg" />
          </Stack>
        ) : !data ? (
          <Text fw={700}>Package not found</Text>
        ) : paid ? (
          <Card p="lg">
            <Group gap="md" align="flex-start">
              <ThemeIcon size={44} radius="xl" color="green" variant="light">
                <IconCheck size={22} />
              </ThemeIcon>
              <div>
                <Title order={3}>Payment Successful</Title>
                <Text size="sm" c="dimmed" mt={4}>
                  Your eSIM is ready
                </Text>
                <Button
                  mt="lg"
                  component={Link}
                  href="/my-packages"
                >
                  Go to My eSIM
                </Button>
              </div>
            </Group>
          </Card>
        ) : (
          <Grid align="flex-start" gutter="lg">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap={16}>
                <Card>
                  <Title order={4} mb="xs">
                    Payment Method
                  </Title>
                  <Text size="sm" c="dimmed" mb="md">
                    Choose how you want to pay
                  </Text>

                  <Radio.Group value={payment} onChange={setPayment}>
                    <Stack gap={10}>
                      <Radio
                        value="card"
                        label={
                          <Group gap={8}>
                            <IconCreditCard size={16} />
                            <Text size="sm">Credit Card</Text>
                          </Group>
                        }
                      />
                      <Radio
                        value="paypal"
                        label={
                          <Group gap={8}>
                            <IconBrandPaypal size={16} />
                            <Text size="sm">PayPal</Text>
                          </Group>
                        }
                      />
                    </Stack>
                  </Radio.Group>
                </Card>

                <Button
                  size="md"
                  loading={createOrder.isPending || createEsim.isPending}
                  onClick={handleCheckout}
                >
                  Pay Now
                </Button>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }}>
              <div style={{ position: "sticky", top: 76 }}>
                <OrderSummary pkg={data} />
              </div>
            </Grid.Col>
          </Grid>
        )}
      </DashboardShell>
    </AuthGuard>
  )
}
