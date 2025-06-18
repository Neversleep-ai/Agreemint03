import type { User, TimeStamped, Identifiable } from "../../types/shared"

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

// API Request/Response types
export interface CreateContractRequest {
  title: string
  type: ContractType
  templateId: string
  inviteeEmail: string
  initiatorRole: PartyRole
}

export interface UpdateContractRequest {
  title?: string
  status?: ContractStatus
}

export interface ContractResponse {
  id: string
  title: string
  type: ContractType
  status: ContractStatus
  templateId: string
  sections: ContractSectionResponse[]
  parties: ContractPartyResponse[]
  createdAt: string
  updatedAt: string
  expiresAt?: string
  completedAt?: string
  signedAt?: string
}

export interface ContractSectionResponse {
  id: string
  title: string
  order: number
  status: SectionStatus
  content: SectionContent
  keyTerms: KeyTerm[]
  lastModifiedBy: PartyRole
  negotiationHistory: NegotiationEventResponse[]
  aiMemoryWiped: boolean
  createdAt: string
  updatedAt: string
}

export interface ContractPartyResponse {
  id: string
  role: PartyRole
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  joinedAt: string
  isActive: boolean
}

export interface NegotiationEventResponse {
  id: string
  sectionId: string
  type: string
  data: Record<string, any>
  performedBy: PartyRole
  message?: string
  createdAt: string
  updatedAt: string
}

export interface ContractListParams {
  page?: number
  size?: number
  search?: string
  status?: ContractStatus[]
  type?: ContractType[]
  sortBy?: "title" | "createdAt" | "updatedAt" | "status"
  sortOrder?: "asc" | "desc"
}
