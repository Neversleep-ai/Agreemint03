import type { User, TimeStamped, Identifiable } from "./shared"

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
