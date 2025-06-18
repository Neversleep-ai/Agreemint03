import { apiClient } from "./base-api"
import type { Contract, ContractSection } from "@/types"

export const contractApi = {
  // Contract lifecycle
  createContract: async (data: CreateContractRequest): Promise<Contract> => {
    const response = await apiClient.post("/contracts", data)
    return response.data
  },

  getContract: async (contractId: string): Promise<Contract> => {
    const response = await apiClient.get(`/contracts/${contractId}`)
    return response.data
  },

  updateSection: async (
    contractId: string,
    sectionId: string,
    updates: Partial<ContractSection>,
  ): Promise<ContractSection> => {
    const response = await apiClient.patch(`/contracts/${contractId}/sections/${sectionId}`, updates)
    return response.data
  },

  // Section management
  completeSection: async (contractId: string, sectionId: string): Promise<void> => {
    await apiClient.post(`/contracts/${contractId}/sections/${sectionId}/complete`)
  },

  wipeAIMemory: async (contractId: string, sectionId: string): Promise<void> => {
    await apiClient.post(`/contracts/${contractId}/sections/${sectionId}/wipe-memory`)
  },

  // Contract finalization
  finalizeContract: async (contractId: string): Promise<Contract> => {
    const response = await apiClient.post(`/contracts/${contractId}/finalize`)
    return response.data
  },
}

interface CreateContractRequest {
  title: string
  type: "freelancer" | "agency"
  inviteeEmail: string
  initiatorRole: "freelancer" | "agency" | "client"
}
