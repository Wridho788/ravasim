import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { Device } from "../types/devices.types"
import { devicesService } from "../services/devices.service"

export const useAddDevice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (device: Device) => devicesService.addDevice(device),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["devices"] })
    },
  })
}
