"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button, Loader, Radio, Stack, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { packagesService } from "@/modules/packages/services/packages.service"
import { useCreateOrder } from "@/modules/orders/hooks/useCreateOrder"
import OrderSummary from "@/modules/orders/components/OrderSummary"

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const [payment, setPayment] = useState("card")

  const { data, isLoading } = useQuery({
    queryKey: ["package", params.id],
    queryFn: () => packagesService.getPackageDetail(params.id),
  })

  const createOrder = useCreateOrder()

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

      notifications.show({
        title: "Payment success",
        message: "Transaction created",
      })
      router.push("/transactions")
    } catch (e: any) {
      notifications.show({
        color: "red",
        title: "Checkout failed",
        message: e?.message ?? "Something went wrong",
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
          <Loader />
        ) : !data ? (
          <Title order={4}>Package not found</Title>
        ) : (
          <Stack>
            <OrderSummary pkg={data} />

            <Radio.Group
              label="Payment Method"
              value={payment}
              onChange={setPayment}
            >
              <Stack mt="xs">
                <Radio value="card" label="Credit Card" />
                <Radio value="paypal" label="PayPal" />
              </Stack>
            </Radio.Group>

            <Button loading={createOrder.isPending} onClick={handleCheckout}>
              Pay Now
            </Button>
          </Stack>
        )}
      </DashboardShell>
    </AuthGuard>
  )
}
