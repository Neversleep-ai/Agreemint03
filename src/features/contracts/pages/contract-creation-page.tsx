"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SmartIntakeForm } from "../components/contract-creation/smart-intake-form"
import { RoomPreview } from "../components/contract-creation/room-preview"
import { SessionScheduler } from "../components/negotiation/session-scheduler"

type ContractCreationStep = "intake" | "preview" | "schedule"

interface ContractData {
  projectDescription: string
  detectedTemplate: "freelancer" | "agency"
  userName: string
  userEmail: string
  otherPartyEmail: string
  otherPartyName?: string
  userRole: "client" | "freelancer"
  personalMessage?: string
}

export default function ContractCreationPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<ContractCreationStep>("intake")
  const [contractData, setContractData] = useState<ContractData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleIntakeSubmit = async (data: ContractData) => {
    setIsLoading(true)

    // Simulate API call to create negotiation room
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setContractData(data)
    setCurrentStep("preview")
    setIsLoading(false)
  }

  const handleEnterRoom = () => {
    // Generate a mock room ID and navigate to negotiation room
    const roomId = `room_${Date.now()}`
    console.log("Entering negotiation room with data:", contractData)
    navigate(`/negotiate/${roomId}`)
  }

  const handleScheduleSession = () => {
    setCurrentStep("schedule")
  }

  const handleScheduleComplete = (scheduleData: any) => {
    console.log("Session scheduled:", scheduleData)
    // In real app: save schedule and send invitations
    alert("Session scheduled! Both parties will receive email invitations.")
    navigate("/contracts")
  }

  const handleScheduleCancel = () => {
    setCurrentStep("preview")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === "intake" && <SmartIntakeForm onSubmit={handleIntakeSubmit} isLoading={isLoading} />}

      {currentStep === "preview" && contractData && (
        <RoomPreview
          contractData={contractData}
          onEnterRoom={handleEnterRoom}
          onScheduleSession={handleScheduleSession}
        />
      )}

      {currentStep === "schedule" && contractData && (
        <SessionScheduler
          contractData={contractData}
          onSchedule={handleScheduleComplete}
          onCancel={handleScheduleCancel}
        />
      )}
    </div>
  )
}
