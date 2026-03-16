import { useMutation, useQueryClient } from "@tanstack/react-query"

import { esimService } from "../services/esim.service"

export const useActivateEsim = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => esimService.activateEsim(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["esims"] })
    },
  })
}
