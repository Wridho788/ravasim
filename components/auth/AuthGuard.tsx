"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
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

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)

  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const storedToken = getStoredToken()

    if (!token && !storedToken) {
      router.replace("/login")
      return
    }

    setAllowed(true)
  }, [router, token])

  if (!allowed) return null
  return children
}
