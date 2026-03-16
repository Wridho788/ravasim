import { mockLogin, mockRegister } from "../api/mockAuth.api"

export const authService = {
  login: async (email: string, password: string) => {
    return mockLogin(email, password)
  },

  register: async (payload: { name: string; email: string; password: string }) => {
    return mockRegister(payload)
  },
}
