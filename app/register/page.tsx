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
  TextInput,
  Title,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"

import { registerSchema } from "@/modules/auth/schemas/auth.schema"
import { authService } from "@/modules/auth/services/auth.service"
import { useAuthStore } from "@/store/auth.store"

type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword", string>
>

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

export default function RegisterPage() {
  const router = useRouter()

  const token = useAuthStore((s) => s.token)
  const canRedirectToken = useMemo(() => token ?? null, [token])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const t = canRedirectToken ?? getStoredToken()
    if (t) router.replace("/dashboard")
  }, [canRedirectToken, router])

  const handleRegister = async () => {
    setErrors({})

    try {
      await registerSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      )
    } catch (err: any) {
      const next: FieldErrors = {}
      if (Array.isArray(err?.inner)) {
        for (const e of err.inner) {
          if (e?.path) next[e.path as keyof FieldErrors] = e.message
        }
      }
      setErrors(next)
      return
    }

    setIsSubmitting(true)
    try {
      await authService.register({ name, email, password })
      notifications.show({
        title: "Register success",
        message: "Account created. Please login.",
      })
      router.push("/login")
    } catch (e: any) {
      notifications.show({
        color: "red",
        title: "Register failed",
        message: e?.message ?? "Something went wrong",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container size={420} py="xl">
      <Paper p="xl" withBorder radius="md">
        <Title order={2} mb="lg">
          Create RavaSIM Account
        </Title>

        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          error={errors.name}
          autoComplete="name"
        />

        <TextInput
          mt="md"
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
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={errors.password}
          autoComplete="new-password"
        />

        <PasswordInput
          mt="md"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button
          fullWidth
          mt="xl"
          loading={isSubmitting}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Group mt="md" justify="space-between">
          <Anchor component={Link} href="/login" size="sm">
            Already have account? Login
          </Anchor>
        </Group>
      </Paper>
    </Container>
  )
}
