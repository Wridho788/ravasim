import { mockDelay } from "@/adapters/mock/mockDelay"
import type { Device } from "../types/devices.types"

const STORAGE_KEY = "ravasim_devices"

const seed: Device[] = [
  {
    id: "1",
    name: "iPhone 14",
    brand: "Apple",
    esimCompatible: true,
    linkedEsim: "Singapore 10GB",
  },
  {
    id: "2",
    name: "Pixel 7",
    brand: "Google",
    esimCompatible: true,
  },
]

function read(): Device[] {
  if (typeof window === "undefined") return seed
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Device[]) : seed
  } catch {
    return seed
  }
}

function write(devices: Device[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devices))
}

export const fetchDevices = async () => {
  await mockDelay(600)
  return read()
}

export const fetchDeviceDetail = async (id: string) => {
  await mockDelay(400)
  return read().find((d) => d.id === id)
}

export const addDevice = async (device: Device) => {
  await mockDelay(500)
  const devices = read()
  devices.unshift(device)
  write(devices)
  return device
}
