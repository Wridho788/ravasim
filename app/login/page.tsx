"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"

import { loginSchema } from "@/modules/auth/schemas/auth.schema"
import { useLogin } from "@/modules/auth/hooks/useLogin"
import { useAuthStore } from "@/store/auth.store"

type FieldErrors = Partial<Record<"email" | "password", string>>

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === "string") return message
  }
  return "Invalid credentials"
}

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

export default function LoginPage() {
  const router = useRouter()

  const token = useAuthStore((s) => s.token)
  const doLogin = useAuthStore((s) => s.login)

  const loginMutation = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})

  const isSubmitting = loginMutation.isPending

  const canRedirectToken = useMemo(() => token ?? null, [token])

  useEffect(() => {
    const t = canRedirectToken ?? getStoredToken()
    if (t) router.replace("/dashboard")
  }, [canRedirectToken, router])

  const handleLogin = async () => {
    setErrors({})

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false })
    } catch (err: unknown) {
      const next: FieldErrors = {}
      if (
        typeof err === "object" &&
        err &&
        "inner" in err &&
        Array.isArray((err as { inner?: unknown }).inner)
      ) {
        const inner = (err as {
          inner: Array<{ path?: unknown; message?: unknown }>
        }).inner
        for (const e of inner) {
          if (typeof e?.path === "string" && typeof e?.message === "string") {
            next[e.path as "email" | "password"] = e.message
          }
        }
      }
      setErrors(next)
      return
    }

    try {
      const res = await loginMutation.mutateAsync({ email, password })
      doLogin(res.user, res.token)
      notifications.show({
        title: "Login success",
        message: `Welcome, ${res.user.name}`,
      })
      router.push("/dashboard")
    } catch (e: unknown) {
      notifications.show({
        color: "red",
        title: "Login failed",
        message: getErrorMessage(e),
      })
    }
  }

  return (
    <Container size={420} py="xl">
      <Paper p="xl" withBorder radius="md">
        <Title order={2} mb="xs">
          Login to RavaSIM
        </Title>
        <Text size="sm" c="dimmed" mb="lg">
          Use demo credentials: demo@ravasim.com / 123456
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={errors.email}
          autoComplete="email"
        />

        <PasswordInput
          mt="md"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />

        <Button fullWidth mt="xl" loading={isSubmitting} onClick={handleLogin}>
          Login
        </Button>

        <Group mt="md" justify="space-between">
          <Anchor component={Link} href="/register" size="sm">
            Don&apos;t have account? Register
          </Anchor>
        </Group>
      </Paper>
    </Container>
  )
}
