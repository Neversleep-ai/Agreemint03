// Consolidated shared types
export interface User {
  id: string
  email: string
  name: string
  role: "freelancer" | "agency" | "client" | "admin"
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export interface ApiError {
  message: string
  status: number
  code?: string
  details?: unknown
}

export type LoadingState = "idle" | "loading" | "success" | "error"

export interface TimeStamped {
  createdAt: Date
  updatedAt: Date
}

export interface Identifiable {
  id: string
}
