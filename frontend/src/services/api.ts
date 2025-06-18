import axios from "axios"
import type { ChatRequest, ChatResponse, ChatSession, DocumentUpload, LLMProvider } from "../types/api"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const chatApi = {
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await apiClient.post("/chat/message", request)
    return response.data
  },

  getSessions: async (): Promise<ChatSession[]> => {
    const response = await apiClient.get("/chat/sessions")
    return response.data
  },

  getSession: async (sessionId: string): Promise<ChatSession> => {
    const response = await apiClient.get(`/chat/sessions/${sessionId}`)
    return response.data
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/chat/sessions/${sessionId}`)
  },
}

export const documentsApi = {
  upload: async (file: File): Promise<DocumentUpload> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  getDocuments: async (): Promise<DocumentUpload[]> => {
    const response = await apiClient.get("/documents")
    return response.data
  },

  deleteDocument: async (documentId: string): Promise<void> => {
    await apiClient.delete(`/documents/${documentId}`)
  },
}

export const providersApi = {
  getProviders: async (): Promise<LLMProvider[]> => {
    const response = await apiClient.get("/providers")
    return response.data
  },
}
