// All types in one file to avoid import issues
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

export type ContractStatus =
  | "draft"
  | "invitation_sent"
  | "questionnaire_pending"
  | "in_negotiation"
  | "review"
  | "signature_pending"
  | "completed"
  | "expired"

export type ContractType = "freelancer" | "agency"

export type SectionStatus = "pending" | "in_negotiation" | "agreed" | "conflicted"

export type PartyRole = "freelancer" | "agency" | "client" | "mediator"

export interface Contract extends Identifiable, TimeStamped {
  title: string
  type: ContractType
  status: ContractStatus
  sections: ContractSection[]
  parties: ContractParty[]
  templateId: string
  expiresAt?: Date
  completedAt?: Date
  signedAt?: Date
}

export interface ContractSection extends Identifiable, TimeStamped {
  title: string
  order: number
  status: SectionStatus
  content: SectionContent
  keyTerms: KeyTerm[]
  lastModifiedBy: PartyRole
  negotiationHistory: NegotiationEvent[]
  aiMemoryWiped: boolean
}

export interface ContractParty extends Identifiable {
  role: PartyRole
  user: User
  joinedAt: Date
  isActive: boolean
}

export interface SectionContent {
  text: string
  variables: Record<string, any>
}

export interface KeyTerm {
  id: string
  label: string
  value: string
  description?: string
}

export interface NegotiationEvent extends Identifiable, TimeStamped {
  sectionId: string
  type: "proposal" | "acceptance" | "rejection" | "counter" | "comment"
  data: Record<string, any>
  performedBy: PartyRole
  message?: string
}
