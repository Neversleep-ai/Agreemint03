import type { AIAgent, ChatMessage, StreamingResponse } from "../types"
import { chatApi } from "../../services/api"

export class BackendProvider {
  async sendMessage(
    agent: AIAgent,
    message: string,
    context: ChatMessage[] = [],
    onStream?: (response: StreamingResponse) => void,
  ): Promise<ChatMessage> {
    if (onStream) {
      return this.streamFromBackend(agent, message, context, onStream)
    } else {
      const response = await chatApi.sendMessage({
        message,
        agentId: agent.id,
        context: context.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      })
      return response.message
    }
  }

  private async streamFromBackend(
    agent: AIAgent,
    message: string,
    context: ChatMessage[],
    onStream: (response: StreamingResponse) => void,
  ): Promise<ChatMessage> {
    // Implementation for Server-Sent Events or WebSocket streaming
    const eventSource = new EventSource("/api/chat/stream", {
      // Add request body for POST-like behavior
    })

    return new Promise((resolve, reject) => {
      let fullContent = ""

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === "content") {
          fullContent += data.content
          onStream({
            content: fullContent,
            isComplete: false,
          })
        } else if (data.type === "complete") {
          onStream({
            content: fullContent,
            isComplete: true,
            usage: data.usage,
          })

          eventSource.close()
          resolve({
            id: data.messageId,
            role: "assistant",
            content: fullContent,
            timestamp: new Date(),
            agentId: agent.id,
          })
        } else if (data.type === "error") {
          eventSource.close()
          reject(new Error(data.error))
        }
      }

      eventSource.onerror = () => {
        eventSource.close()
        reject(new Error("Stream connection failed"))
      }
    })
  }
}
