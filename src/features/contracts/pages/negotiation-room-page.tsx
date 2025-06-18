"use client"

import { useParams } from "react-router-dom"
import { NegotiationRoom } from "../components/negotiation/negotiation-room"

// Mock data - in real app, this would come from API
const mockContractSections = [
  { id: "1", title: "What We Are Creating", status: "discussing" as const, order: 1 },
  { id: "2", title: "Our Project Timeline", status: "pending" as const, order: 2 },
  { id: "3", title: "Investment & Returns", status: "pending" as const, order: 3 },
  { id: "4", title: "Communication Standards", status: "pending" as const, order: 4 },
  { id: "5", title: "Intellectual Property", status: "pending" as const, order: 5 },
  { id: "6", title: "Confidentiality and Trust", status: "pending" as const, order: 6 },
  { id: "7", title: "Warranties and Liabilities", status: "pending" as const, order: 7 },
  { id: "8", title: "Digital Collaboration", status: "pending" as const, order: 8 },
  { id: "9", title: "Dispute Settlement", status: "pending" as const, order: 9 },
  { id: "10", title: "Termination", status: "pending" as const, order: 10 },
  { id: "11", title: "General Provisions", status: "pending" as const, order: 11 },
  { id: "12", title: "Mutual Understanding", status: "pending" as const, order: 12 },
]

export default function NegotiationRoomPage() {
  const { roomId } = useParams<{ roomId: string }>()

  if (!roomId) {
    return <div>Room not found</div>
  }

  return (
    <NegotiationRoom
      roomId={roomId}
      currentUser={{
        id: "user1",
        name: "John Smith",
        role: "client",
      }}
      otherParty={{
        id: "user2",
        name: "Sarah Johnson",
        role: "freelancer",
      }}
      contractSections={mockContractSections}
    />
  )
}
