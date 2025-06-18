import { create } from "zustand"
import { devtools, subscribeWithSelector } from "zustand/middleware"
import type { Contract, ContractSection } from "@/types"

interface ContractState {
  // State
  currentContract: Contract | null
  sections: ContractSection[]
  currentSectionIndex: number

  // Actions
  setContract: (contract: Contract) => void
  updateSection: (sectionId: string, updates: Partial<ContractSection>) => void
  moveToNextSection: () => void
  completeSection: (sectionId: string) => void

  // Computed
  currentSection: ContractSection | null
  completedSections: ContractSection[]
  progressPercentage: number
}

export const useContractStore = create<ContractState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      currentContract: null,
      sections: [],
      currentSectionIndex: 0,

      // Actions
      setContract: (contract) => set({ currentContract: contract, sections: contract.sections }),

      updateSection: (sectionId, updates) =>
        set((state) => ({
          sections: state.sections.map((section) => (section.id === sectionId ? { ...section, ...updates } : section)),
        })),

      moveToNextSection: () =>
        set((state) => ({
          currentSectionIndex: Math.min(state.currentSectionIndex + 1, state.sections.length - 1),
        })),

      completeSection: (sectionId) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId ? { ...section, status: "agreed", aiMemoryWiped: true } : section,
          ),
        })),

      // Computed getters
      get currentSection() {
        const state = get()
        return state.sections[state.currentSectionIndex] || null
      },

      get completedSections() {
        return get().sections.filter((section) => section.status === "agreed")
      },

      get progressPercentage() {
        const state = get()
        return Math.round((state.completedSections.length / state.sections.length) * 100)
      },
    })),
    { name: "contract-store" },
  ),
)
