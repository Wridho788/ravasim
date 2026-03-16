import { useMutation } from "@tanstack/react-query"

import { authService } from "../services/auth.service"

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
  })
}
