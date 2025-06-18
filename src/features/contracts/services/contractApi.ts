import { apiClient } from "@shared/services/api/apiClient"
import type {
  ContractResponse,
  ContractListParams,
  CreateContractRequest,
  UpdateContractRequest,
  ContractSectionResponse,
} from "../types"
import type { PaginatedResponse } from "@shared/types"

// Pure API layer - no business logic, no transformations
export const contractApi = {
  // Contract CRUD
  getMany: (params: ContractListParams = {}) =>
    apiClient.get<PaginatedResponse<ContractResponse>>("/contracts", { params }),

  getById: (id: string) => apiClient.get<ContractResponse>(`/contracts/${id}`),

  create: (data: CreateContractRequest) => apiClient.post<ContractResponse>("/contracts", data),

  update: (id: string, data: UpdateContractRequest) => apiClient.patch<ContractResponse>(`/contracts/${id}`, data),

  delete: (id: string) => apiClient.delete<void>(`/contracts/${id}`),

  // Section operations
  updateSection: (contractId: string, sectionId: string, data: any) =>
    apiClient.patch<ContractSectionResponse>(`/contracts/${contractId}/sections/${sectionId}`, data),

  completeSection: (contractId: string, sectionId: string) =>
    apiClient.post<void>(`/contracts/${contractId}/sections/${sectionId}/complete`),

  // AI operations
  wipeAIMemory: (contractId: string, sectionId: string) =>
    apiClient.post<void>(`/contracts/${contractId}/sections/${sectionId}/wipe-memory`),

  initializeFreshContext: (contractId: string, sectionId: string) =>
    apiClient.post<void>(`/contracts/${contractId}/sections/${sectionId}/init-context`),

  // Negotiation operations
  sendNegotiationAction: (contractId: string, action: any) =>
    apiClient.post<void>(`/contracts/${contractId}/negotiate`, action),

  getNegotiationHistory: (contractId: string) => apiClient.get<any[]>(`/contracts/${contractId}/history`),
} as const
