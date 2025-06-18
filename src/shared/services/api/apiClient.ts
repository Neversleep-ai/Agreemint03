import axios, { type AxiosInstance, type AxiosError } from "axios"
import { tokenStorage } from "../storage/tokenStorage"

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: { "Content-Type": "application/json" },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = tokenStorage.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(this.transformError(error)),
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        const transformedError = this.transformError(error)

        if (this.isAuthError(error)) {
          this.handleAuthError()
        }

        return Promise.reject(transformedError)
      },
    )
  }

  private isAuthError(error: AxiosError): boolean {
    return error.response?.status === 401
  }

  private handleAuthError(): void {
    tokenStorage.removeToken()
    // In a real app, you might want to use a more sophisticated navigation method
    window.location.href = "/login"
  }

  private transformError(error: AxiosError): ApiError {
    const message = error.response?.data?.message || error.message || "An error occurred"
    const status = error.response?.status || 500

    return new ApiError(message, status, error.response?.data)
  }

  // Generic HTTP methods
  async get<T>(url: string, config = {}): Promise<T> {
    return this.client.get(url, config)
  }

  async post<T>(url: string, data?: unknown, config = {}): Promise<T> {
    return this.client.post(url, data, config)
  }

  async put<T>(url: string, data?: unknown, config = {}): Promise<T> {
    return this.client.put(url, data, config)
  }

  async patch<T>(url: string, data?: unknown, config = {}): Promise<T> {
    return this.client.patch(url, data, config)
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    return this.client.delete(url, config)
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api")
