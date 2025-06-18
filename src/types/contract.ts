export interface Contract {
  id: string
  title: string
  type: "freelancer" | "agency"
  status: ContractStatus
  sections: ContractSection[]
  parties: ContractParty[]
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
}

export interface ContractSection {
  id: string
  title: string
  order: number
  status: SectionStatus
  content: SectionContent
  keyTerms: KeyTerm[]
  lastModifiedBy: PartyRole
  negotiationHistory: NegotiationEvent[]
  aiMemoryWiped: boolean
}

export interface ContractParty {
  id: string
  role: PartyRole
  name: string
}

export interface SectionContent {
  text: string
}

export interface KeyTerm {
  term: string
  definition: string
}

export interface NegotiationEvent {
  id: string
  timestamp: Date
  party: PartyRole
  action: string
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

export type SectionStatus = "pending" | "in_negotiation" | "agreed" | "conflicted"

export type PartyRole = "freelancer" | "agency" | "client" | "mediator"
