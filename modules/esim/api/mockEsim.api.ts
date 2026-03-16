import { mockDelay } from "@/adapters/mock/mockDelay"
import type { Esim } from "../types/esim.types"

const STORAGE_KEY = "ravasim_esims"

const seed: Esim[] = [
  {
    id: "1",
    packageName: "Singapore 10GB",
    totalData: 10,
    usedData: 2,
    status: "active",
  },
  {
    id: "2",
    packageName: "Asia 20GB",
    totalData: 20,
    usedData: 0,
    status: "inactive",
  },
]

function read(): Esim[] {
  if (typeof window === "undefined") return seed
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Esim[]) : seed
  } catch {
    return seed
  }
}

function write(esims: Esim[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(esims))
}

export const fetchEsims = async () => {
  await mockDelay(600)
  return read()
}

export const activateEsim = async (id: string) => {
  await mockDelay(500)

  const esims = read()
  const esim = esims.find((e) => e.id === id)

  if (esim) {
    esim.status = "active"
    write(esims)
  }

  return esim
}
