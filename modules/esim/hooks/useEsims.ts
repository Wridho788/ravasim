import { useQuery } from "@tanstack/react-query"

import { esimService } from "../services/esim.service"

export const useEsims = () => {
  return useQuery({
    queryKey: ["esims"],
    queryFn: esimService.getEsims,
  })
}
