"use client"

import { useQuery } from "@tanstack/react-query"
import { Badge, Table, Text, Title } from "@mantine/core"

import AuthGuard from "@/components/auth/AuthGuard"
import DashboardShell from "@/components/layout/AppShell"

import { ordersService } from "@/modules/orders/services/orders.service"

export default function TransactionsPage() {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: ordersService.getTransactions,
  })

  return (
    <AuthGuard>
      <DashboardShell>
        <Title order={2} mb="lg">
          Transactions
        </Title>

        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Package</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Payment</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {(data ?? []).map((tx) => (
              <Table.Tr key={tx.id}>
                <Table.Td>{tx.packageName}</Table.Td>
                <Table.Td>${tx.price}</Table.Td>
                <Table.Td>{tx.paymentMethod}</Table.Td>
                <Table.Td>
                  <Badge variant="light">{tx.status}</Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {(data ?? []).length === 0 && (
          <Text size="sm" c="dimmed" mt="md">
            No transactions yet.
          </Text>
        )}
      </DashboardShell>
    </AuthGuard>
  )
}
