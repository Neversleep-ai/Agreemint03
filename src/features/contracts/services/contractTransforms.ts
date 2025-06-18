import type {
  ContractResponse,
  Contract,
  ContractSectionResponse,
  ContractSection,
  ContractPartyResponse,
  ContractParty,
  NegotiationEventResponse,
  NegotiationEvent,
  CreateContractRequest,
} from "../types"

export const contractTransforms = {
  fromResponse: (response: ContractResponse): Contract => ({
    id: response.id,
    title: response.title,
    type: response.type,
    status: response.status,
    templateId: response.templateId,
    sections: response.sections.map(sectionTransforms.fromResponse),
    parties: response.parties.map(partyTransforms.fromResponse),
    createdAt: new Date(response.createdAt),
    updatedAt: new Date(response.updatedAt),
    expiresAt: response.expiresAt ? new Date(response.expiresAt) : undefined,
    completedAt: response.completedAt ? new Date(response.completedAt) : undefined,
    signedAt: response.signedAt ? new Date(response.signedAt) : undefined,
  }),

  toCreateRequest: (data: {
    title: string
    type: "freelancer" | "agency"
    templateId: string
    inviteeEmail: string
    initiatorRole: "freelancer" | "agency" | "client"
  }): CreateContractRequest => ({
    title: data.title,
    type: data.type,
    templateId: data.templateId,
    inviteeEmail: data.inviteeEmail,
    initiatorRole: data.initiatorRole,
  }),
} as const

const sectionTransforms = {
  fromResponse: (response: ContractSectionResponse): ContractSection => ({
    id: response.id,
    title: response.title,
    order: response.order,
    status: response.status,
    content: response.content,
    keyTerms: response.keyTerms,
    lastModifiedBy: response.lastModifiedBy,
    negotiationHistory: response.negotiationHistory.map(eventTransforms.fromResponse),
    aiMemoryWiped: response.aiMemoryWiped,
    createdAt: new Date(response.createdAt),
    updatedAt: new Date(response.updatedAt),
  }),
} as const

const partyTransforms = {
  fromResponse: (response: ContractPartyResponse): ContractParty => ({
    id: response.id,
    role: response.role,
    user: {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: response.role,
      avatar: response.user.avatar,
      createdAt: new Date(), // These would come from a separate user API
      updatedAt: new Date(),
    },
    joinedAt: new Date(response.joinedAt),
    isActive: response.isActive,
  }),
} as const

const eventTransforms = {
  fromResponse: (response: NegotiationEventResponse): NegotiationEvent => ({
    id: response.id,
    sectionId: response.sectionId,
    type: response.type as any,
    data: response.data,
    performedBy: response.performedBy,
    message: response.message,
    createdAt: new Date(response.createdAt),
    updatedAt: new Date(response.updatedAt),
  }),
} as const
