import { activateEsim, fetchEsims } from "../api/mockEsim.api"

export const esimService = {
  getEsims: async () => {
    return fetchEsims()
  },

  activateEsim: async (id: string) => {
    return activateEsim(id)
  },
}
