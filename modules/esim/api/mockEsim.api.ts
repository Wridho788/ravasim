import { mockDelay } from "@/adapters/mock/mockDelay"
import type { Esim } from "../types/esim.types"

const STORAGE_KEY = "ravasim_esims"

function daysFromNowIso(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

const seed: Esim[] = [
  {
    id: "1",
    packageName: "Singapore 10GB",
    totalData: 10,
    usedData: 2,
    status: "active",
    expiresAt: daysFromNowIso(5),
  },
  {
    id: "2",
    packageName: "Asia 20GB",
    totalData: 20,
    usedData: 0,
    status: "inactive",
    expiresAt: daysFromNowIso(30),
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
    if (!esim.expiresAt) esim.expiresAt = daysFromNowIso(7)
    write(esims)
  }

  return esim
}

export const createEsim = async (payload: Omit<Esim, "id"> & { id?: string }) => {
  await mockDelay(700)

  const esims = read()
  const id = payload.id ?? Date.now().toString()

  const next: Esim = {
    id,
    packageName: payload.packageName,
    totalData: payload.totalData,
    usedData: payload.usedData,
    status: payload.status,
    expiresAt: payload.expiresAt,
  }

  esims.unshift(next)
  write(esims)
  return next
}
