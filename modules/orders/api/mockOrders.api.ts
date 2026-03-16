import { mockDelay } from "@/adapters/mock/mockDelay"
import type { Order } from "../types/orders.types"

const STORAGE_KEY = "ravasim_transactions"

function read(): Order[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Order[]) : []
  } catch {
    return []
  }
}

function write(transactions: Order[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export const createOrder = async (order: Order) => {
  await mockDelay(800)
  const transactions = read()
  transactions.unshift(order)
  write(transactions)
  return order
}

export const fetchTransactions = async () => {
  await mockDelay(500)
  return read()
}
