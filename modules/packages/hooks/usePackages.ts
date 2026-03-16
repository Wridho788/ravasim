import { useQuery } from "@tanstack/react-query"

import { packagesService } from "../services/packages.service"

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: packagesService.getPackages,
  })
}
