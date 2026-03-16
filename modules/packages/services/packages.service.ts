import { fetchPackageDetail, fetchPackages } from "../api/mockPackages.api"

export const packagesService = {
  getPackages: async () => {
    return fetchPackages()
  },

  getPackageDetail: async (id: string) => {
    return fetchPackageDetail(id)
  },
}
