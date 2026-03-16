import type { Order } from "../types/orders.types"
import { createOrder, fetchTransactions } from "../api/mockOrders.api"

export const ordersService = {
  createOrder: async (order: Order) => {
    return createOrder(order)
  },

  getTransactions: async () => {
    return fetchTransactions()
  },
}
