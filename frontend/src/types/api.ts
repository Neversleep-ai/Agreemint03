export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface LLMProvider {
  id: string
  name: string
  models: string[]
  enabled: boolean
}

export interface ChatRequest {
  message: string
  sessionId?: string
  model?: string
  temperature?: number
  maxTokens?: number
}

export interface ChatResponse {
  message: ChatMessage
  sessionId: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface DocumentUpload {
  id: string
  filename: string
  size: number
  type: string
  status: "uploading" | "processing" | "ready" | "error"
  uploadedAt: Date
}
