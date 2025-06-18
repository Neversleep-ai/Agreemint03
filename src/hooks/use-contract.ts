import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { contractApi } from "@/services/api"
import { useContractStore } from "@/store"
import type { ContractSection } from "@/types"

export function useContract(contractId?: string) {
  const queryClient = useQueryClient()
  const { setContract, updateSection } = useContractStore()

  // Fetch contract
  const contractQuery = useQuery({
    queryKey: ["contract", contractId],
    queryFn: () => contractApi.getContract(contractId!),
    enabled: !!contractId,
    onSuccess: (contract) => {
      setContract(contract)
    },
  })

  // Update section mutation
  const updateSectionMutation = useMutation({
    mutationFn: ({ sectionId, updates }: { sectionId: string; updates: Partial<ContractSection> }) =>
      contractApi.updateSection(contractId!, sectionId, updates),
    onSuccess: (updatedSection) => {
      updateSection(updatedSection.id, updatedSection)
      queryClient.invalidateQueries(["contract", contractId])
    },
  })

  // Complete section mutation
  const completeSectionMutation = useMutation({
    mutationFn: (sectionId: string) => contractApi.completeSection(contractId!, sectionId),
    onSuccess: (_, sectionId) => {
      updateSection(sectionId, { status: "agreed", aiMemoryWiped: true })
      // Wipe AI memory after completion
      contractApi.wipeAIMemory(contractId!, sectionId)
    },
  })

  return {
    contract: contractQuery.data,
    isLoading: contractQuery.isLoading,
    error: contractQuery.error,
    updateSection: updateSectionMutation.mutate,
    completeSection: completeSectionMutation.mutate,
    isUpdating: updateSectionMutation.isPending || completeSectionMutation.isPending,
  }
}
