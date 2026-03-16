import { mockDelay } from "@/adapters/mock/mockDelay"
import type { Package } from "../types/packages.types"

const packages: Package[] = [
  {
    id: "1",
    name: "Singapore 5GB",
    country: "Singapore",
    data: "5 GB",
    validity: "7 Days",
    price: 5,
  },
  {
    id: "2",
    name: "Singapore 10GB",
    country: "Singapore",
    data: "10 GB",
    validity: "15 Days",
    price: 8,
  },
  {
    id: "3",
    name: "Asia 20GB",
    country: "Asia",
    data: "20 GB",
    validity: "30 Days",
    price: 15,
  },
  {
    id: "4",
    name: "Global 50GB",
    country: "Global",
    data: "50 GB",
    validity: "30 Days",
    price: 25,
  },
]

export const fetchPackages = async (): Promise<Package[]> => {
  await mockDelay(800)
  return packages
}

export const fetchPackageDetail = async (id: string): Promise<Package | undefined> => {
  await mockDelay(500)
  return packages.find((p) => p.id === id)
}
