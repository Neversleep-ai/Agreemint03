import { io, type Socket } from "socket.io-client"
import type { ContractSection, NegotiationEvent } from "@/types"

class SocketService {
  private socket: Socket | null = null
  private contractId: string | null = null

  connect(contractId: string, userId: string) {
    this.contractId = contractId
    this.socket = io(import.meta.env.VITE_SOCKET_URL || "ws://localhost:8080", {
      auth: {
        contractId,
        userId,
        token: localStorage.getItem("auth_token"),
      },
    })

    this.setupEventListeners()
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // Contract events
  onSectionUpdate(callback: (section: ContractSection) => void) {
    this.socket?.on("section:updated", callback)
  }

  onNegotiationEvent(callback: (event: NegotiationEvent) => void) {
    this.socket?.on("negotiation:event", callback)
  }

  // Emit events
  updateSection(sectionId: string, updates: Partial<ContractSection>) {
    this.socket?.emit("section:update", { sectionId, updates })
  }

  sendNegotiationAction(action: NegotiationAction) {
    this.socket?.emit("negotiation:action", action)
  }

  private setupEventListeners() {
    this.socket?.on("connect", () => {
      console.log("Connected to contract room:", this.contractId)
    })

    this.socket?.on("disconnect", () => {
      console.log("Disconnected from contract room")
    })

    this.socket?.on("error", (error) => {
      console.error("Socket error:", error)
    })
  }
}

export const socketService = new SocketService()

interface NegotiationAction {
  type: "accept" | "reject" | "counter"
  sectionId: string
  data?: any
}
