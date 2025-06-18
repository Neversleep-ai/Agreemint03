import type { AgentPersonality, PartyRole } from "./someOtherFile" // Assuming these are imported from another file

export interface AIAgent {
  id: string
  type: AgentType
  personality: AgentPersonality
  role: PartyRole
  isPrivate: boolean
  memoryState: AIMemoryState
}

export type AgentType = "freelancer_advocate" | "client_advocate" | "mediator"

export interface AIMemoryState {
  sectionId?: string
  lastWipeTimestamp?: Date
  contextInitialized: boolean
  conversationHistory: AgentMessage[]
}

export interface AgentMessage {
  id: string
  agentId: string
  content: string
  type: MessageType
  isPrivate: boolean
  timestamp: Date
  metadata?: Record<string, any>
}

export type MessageType = "guidance" | "suggestion" | "explanation" | "warning" | "celebration"
