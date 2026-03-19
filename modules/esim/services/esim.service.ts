import { activateEsim, createEsim, fetchEsims } from "../api/mockEsim.api"

import type { Esim } from "../types/esim.types"

export const esimService = {
  getEsims: async () => {
    return fetchEsims()
  },

  activateEsim: async (id: string) => {
    return activateEsim(id)
  },

  createEsim: async (esim: Omit<Esim, "id"> & { id?: string }) => {
    return createEsim(esim)
  },
}
