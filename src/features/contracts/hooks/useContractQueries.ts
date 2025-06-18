import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { contractApi } from "../services/contractApi"
import { contractTransforms } from "../services/contractTransforms"
import type { ContractListParams, CreateContractRequest, UpdateContractRequest } from "../types"

// Query hooks - pure data fetching
export function useContracts(params: ContractListParams = {}) {
  return useQuery({
    queryKey: ["contracts", params],
    queryFn: () => contractApi.getMany(params),
    select: (response) => ({
      ...response,
      content: response.content.map(contractTransforms.fromResponse),
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useContract(id: string) {
  return useQuery({
    queryKey: ["contract", id],
    queryFn: () => contractApi.getById(id),
    select: contractTransforms.fromResponse,
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Mutation hooks - separate concerns
export function useCreateContract() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateContractRequest) => contractApi.create(data),
    onSuccess: (response) => {
      const contract = contractTransforms.fromResponse(response)

      // Update caches
      queryClient.setQueryData(["contract", contract.id], contract)
      queryClient.invalidateQueries({ queryKey: ["contracts"] })
    },
  })
}

export function useUpdateContract() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContractRequest }) => contractApi.update(id, data),
    onSuccess: (response) => {
      const contract = contractTransforms.fromResponse(response)
      queryClient.setQueryData(["contract", contract.id], contract)
      queryClient.invalidateQueries({ queryKey: ["contracts"] })
    },
  })
}

export function useDeleteContract() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: contractApi.delete,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["contract", deletedId] })
      queryClient.invalidateQueries({ queryKey: ["contracts"] })
    },
  })
}

export function useUpdateContractSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      contractId,
      sectionId,
      data,
    }: {
      contractId: string
      sectionId: string
      data: any
    }) => contractApi.updateSection(contractId, sectionId, data),
    onSuccess: (_, { contractId }) => {
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] })
    },
  })
}

export function useCompleteContractSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      contractId,
      sectionId,
    }: {
      contractId: string
      sectionId: string
    }) => contractApi.completeSection(contractId, sectionId),
    onSuccess: async (_, { contractId, sectionId }) => {
      // Wipe AI memory after completion
      await contractApi.wipeAIMemory(contractId, sectionId)
      queryClient.invalidateQueries({ queryKey: ["contract", contractId] })
    },
  })
}
