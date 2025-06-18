import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import type { ContractStatus, ContractType } from "../types"

interface ContractFilters {
  search: string
  statuses: ContractStatus[]
  types: ContractType[]
  sortBy: "title" | "createdAt" | "updatedAt" | "status"
  sortOrder: "asc" | "desc"
}

interface ContractUIState {
  // List state
  filters: ContractFilters

  // Modal state
  activeModal: "create" | "edit" | "delete" | null
  activeContractId: string | null

  // View state
  selectedSectionId: string | null
  isPreviewMode: boolean

  // Panel state
  leftPanelCollapsed: boolean
}

interface ContractUIActions {
  // Filter actions
  setSearch: (search: string) => void
  setStatusFilter: (statuses: ContractStatus[]) => void
  setTypeFilter: (types: ContractType[]) => void
  setSorting: (sortBy: string, order: "asc" | "desc") => void
  resetFilters: () => void

  // Modal actions
  openCreateModal: () => void
  openEditModal: (contractId: string) => void
  openDeleteModal: (contractId: string) => void
  closeModal: () => void

  // View actions
  selectSection: (sectionId: string | null) => void
  togglePreviewMode: () => void

  // Panel actions
  toggleLeftPanel: () => void
  setLeftPanelCollapsed: (collapsed: boolean) => void
}

const initialFilters: ContractFilters = {
  search: "",
  statuses: [],
  types: [],
  sortBy: "updatedAt",
  sortOrder: "desc",
}

export const useContractUIStore = create<ContractUIState & ContractUIActions>()(
  subscribeWithSelector((set, get) => ({
    // State
    filters: initialFilters,
    activeModal: null,
    activeContractId: null,
    selectedSectionId: null,
    isPreviewMode: false,
    leftPanelCollapsed: false,

    // Filter actions
    setSearch: (search) => set((state) => ({ filters: { ...state.filters, search } })),

    setStatusFilter: (statuses) => set((state) => ({ filters: { ...state.filters, statuses } })),

    setTypeFilter: (types) => set((state) => ({ filters: { ...state.filters, types } })),

    setSorting: (sortBy, sortOrder) =>
      set((state) => ({
        filters: { ...state.filters, sortBy, sortOrder },
      })),

    resetFilters: () => set({ filters: initialFilters }),

    // Modal actions
    openCreateModal: () => set({ activeModal: "create", activeContractId: null }),
    openEditModal: (contractId) => set({ activeModal: "edit", activeContractId: contractId }),
    openDeleteModal: (contractId) => set({ activeModal: "delete", activeContractId: contractId }),
    closeModal: () => set({ activeModal: null, activeContractId: null }),

    // View actions
    selectSection: (selectedSectionId) => set({ selectedSectionId }),
    togglePreviewMode: () => set((state) => ({ isPreviewMode: !state.isPreviewMode })),

    // Panel actions
    toggleLeftPanel: () => set((state) => ({ leftPanelCollapsed: !state.leftPanelCollapsed })),
    setLeftPanelCollapsed: (collapsed) => set({ leftPanelCollapsed: collapsed }),
  })),
)

// Selector hooks for better performance
export const useContractFilters = () => useContractUIStore((state) => state.filters)
export const useContractModal = () =>
  useContractUIStore((state) => ({
    activeModal: state.activeModal,
    activeContractId: state.activeContractId,
  }))
export const useContractView = () =>
  useContractUIStore((state) => ({
    selectedSectionId: state.selectedSectionId,
    isPreviewMode: state.isPreviewMode,
  }))
export const useContractPanels = () =>
  useContractUIStore((state) => ({
    leftPanelCollapsed: state.leftPanelCollapsed,
  }))
