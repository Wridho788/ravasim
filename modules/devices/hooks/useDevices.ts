import { useQuery } from "@tanstack/react-query"

import { devicesService } from "../services/devices.service"

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: devicesService.getDevices,
  })
}
