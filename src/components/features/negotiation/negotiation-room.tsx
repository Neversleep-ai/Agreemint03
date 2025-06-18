"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContractStore, useUIStore } from "@/store"
import { socketService } from "@/services/realtime/socket-service"
import { ThreePanelLayout } from "@/components/layout/three-panel-layout"
import { NavigationPanel } from "./navigation-panel"
import { ContractSectionPanel } from "./contract-section-panel"
import { PartyCommunicationPanel } from "./party-communication-panel"
import { contractApi } from "@/services/contract-api" // Import contractApi

export function NegotiationRoom() {
  const { contractId } = useParams<{ contractId: string }>()
  const { currentContract, setContract } = useContractStore()
  const { leftPanelCollapsed } = useUIStore()

  const updateSection = (sectionId: string, sectionData: any) => {
    // Implementation for updating section
    console.log("Section updated:", sectionId, sectionData)
  } // Declare updateSection function

  useEffect(() => {
    if (contractId) {
      // Initialize contract and socket connection
      initializeNegotiationRoom(contractId)
    }

    return () => {
      socketService.disconnect()
    }
  }, [contractId])

  const initializeNegotiationRoom = async (contractId: string) => {
    try {
      // Load contract data
      const contract = await contractApi.getContract(contractId)
      setContract(contract)

      // Connect to real-time updates
      socketService.connect(contractId, "current-user-id")

      // Setup real-time listeners
      socketService.onSectionUpdate((section) => {
        updateSection(section.id, section)
      })
    } catch (error) {
      console.error("Failed to initialize negotiation room:", error)
    }
  }

  if (!currentContract) {
    return <div>Loading negotiation room...</div>
  }

  return (
    <ThreePanelLayout collapsed={leftPanelCollapsed}>
      <NavigationPanel />
      <ContractSectionPanel />
      <PartyCommunicationPanel />
    </ThreePanelLayout>
  )
}
