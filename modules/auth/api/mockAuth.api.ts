import { mockDelay } from "@/adapters/mock/mockDelay"
import type { LoginResponse, RegisterPayload, RegisterResponse } from "../types/auth.types"

const DEMO_EMAIL = "demo@ravasim.com"
const DEMO_PASSWORD = "123456"

export const mockLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  await mockDelay(1000)

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return {
      token: "mock-token-123",
      user: {
        id: "1",
        name: "Demo User",
        email,
      },
    }
  }

  throw new Error("Invalid credentials")
}

export const mockRegister = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  await mockDelay(900)

  return {
    token: "mock-token-registered",
    user: {
      id: Date.now().toString(),
      name: payload.name,
      email: payload.email,
    },
  }
}
