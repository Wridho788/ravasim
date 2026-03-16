export interface User {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export type RegisterResponse = LoginResponse
