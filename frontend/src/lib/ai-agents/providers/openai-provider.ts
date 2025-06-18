import OpenAI from "openai"
import type { AIAgent, ChatMessage, StreamingResponse } from "../types"

export class OpenAIProvider {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // Only for development
    })
  }

  async sendMessage(
    agent: AIAgent,
    message: string,
    context: ChatMessage[] = [],
    onStream?: (response: StreamingResponse) => void,
  ): Promise<ChatMessage> {
    const messages = this.formatMessages(agent, message, context)

    if (onStream) {
      return this.streamMessage(agent, messages, onStream)
    } else {
      return this.completeMessage(agent, messages)
    }
  }

  private async streamMessage(
    agent: AIAgent,
    messages: any[],
    onStream: (response: StreamingResponse) => void,
  ): Promise<ChatMessage> {
    const stream = await this.client.chat.completions.create({
      model: agent.model,
      messages,
      temperature: agent.temperature || 0.7,
      max_tokens: agent.maxTokens || 2000,
      stream: true,
    })

    let fullContent = ""
    let usage = undefined

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta
      if (delta?.content) {
        fullContent += delta.content
        onStream({
          content: fullContent,
          isComplete: false,
        })
      }

      if (chunk.usage) {
        usage = chunk.usage
      }
    }

    onStream({
      content: fullContent,
      isComplete: true,
      usage: usage
        ? {
            promptTokens: usage.prompt_tokens,
            completionTokens: usage.completion_tokens,
          }
        : undefined,
    })

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: fullContent,
      timestamp: new Date(),
      agentId: agent.id,
    }
  }

  private async completeMessage(agent: AIAgent, messages: any[]): Promise<ChatMessage> {
    const response = await this.client.chat.completions.create({
      model: agent.model,
      messages,
      temperature: agent.temperature || 0.7,
      max_tokens: agent.maxTokens || 2000,
    })

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response.choices[0].message.content || "",
      timestamp: new Date(),
      agentId: agent.id,
    }
  }

  private formatMessages(agent: AIAgent, message: string, context: ChatMessage[]) {
    const messages: any[] = []

    if (agent.systemPrompt) {
      messages.push({ role: "system", content: agent.systemPrompt })
    }

    // Add context messages
    context.forEach((msg) => {
      if (msg.role !== "system") {
        messages.push({
          role: msg.role,
          content: msg.content,
        })
      }
    })

    // Add current message
    messages.push({ role: "user", content: message })

    return messages
  }
}
