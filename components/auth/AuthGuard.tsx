"use client"

import type { ReactNode } from "react"
import { useEffect, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth.store"

function getStoredToken(): string | null {
  try {
    const raw = localStorage.getItem("ravasim_auth")
    if (!raw) return null
    const parsed = JSON.parse(raw) as { state?: { token?: string | null } }
    return parsed?.state?.token ?? null
  } catch {
    return null
  }
}

function subscribeToAuthStorage(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {}

  // Cross-tab updates.
  window.addEventListener("storage", onStoreChange)

  // Same-tab updates (optional). If you ever need it, you can dispatch:
  // window.dispatchEvent(new Event("ravasim-auth"))
  window.addEventListener("ravasim-auth", onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener("ravasim-auth", onStoreChange)
  }
}

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)

  const storedToken = useSyncExternalStore(
    subscribeToAuthStorage,
    () => (typeof window === "undefined" ? null : getStoredToken()),
    () => null
  )

  const isAuthed = Boolean(token || storedToken)

  useEffect(() => {
    if (token) return
    // Delay redirect decision until after mount (effects only run on client).
    if (!getStoredToken()) router.replace("/login")
  }, [router, token])

  if (!isAuthed) return null
  return children
}
