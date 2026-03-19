import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { Esim } from "../types/esim.types"
import { esimService } from "../services/esim.service"

export const useCreateEsim = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (esim: Omit<Esim, "id"> & { id?: string }) =>
      esimService.createEsim(esim),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["esims"] })
    },
  })
}
