import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { Order } from "../types/orders.types"
import { ordersService } from "../services/orders.service"

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (order: Order) => ordersService.createOrder(order),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
  })
}
