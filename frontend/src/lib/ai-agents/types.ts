export interface AIAgent {
  id: string
  name: string
  description: string
  model: string
  provider: "openai" | "anthropic" | "local" | "backend"
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  tools?: AITool[]
}

export interface AITool {
  name: string
  description: string
  parameters: Record<string, any>
  handler: (params: any) => Promise<any>
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system" | "tool"
  content: string
  timestamp: Date
  agentId?: string
  toolCalls?: ToolCall[]
  metadata?: Record<string, any>
}

export interface ToolCall {
  id: string
  name: string
  parameters: Record<string, any>
  result?: any
}

export interface StreamingResponse {
  content: string
  isComplete: boolean
  usage?: {
    promptTokens: number
    completionTokens: number
  }
}
