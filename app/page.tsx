"use client"

import { useEffect, useMemo } from "react"
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

export default function HomePage() {
  const router = useRouter()
  const token = useAuthStore((s) => s.token)

  const storedToken = useMemo(() => {
    if (token) return null
    return getStoredToken()
  }, [token])

  const isAuthed = Boolean(token || storedToken)

  useEffect(() => {
    router.replace(isAuthed ? "/dashboard" : "/login")
  }, [isAuthed, router])

  return null
}
