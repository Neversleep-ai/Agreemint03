import type { AIAgent, ChatMessage, StreamingResponse } from "./types"
import { OpenAIProvider } from "./providers/openai-provider"
import { AnthropicProvider } from "./providers/anthropic-provider"
import { BackendProvider } from "./providers/backend-provider"

export class AIAgentManager {
  private agents: Map<string, AIAgent> = new Map()
  private providers = {
    openai: new OpenAIProvider(),
    anthropic: new AnthropicProvider(),
    backend: new BackendProvider(),
  }

  registerAgent(agent: AIAgent) {
    this.agents.set(agent.id, agent)
  }

  getAgent(id: string): AIAgent | undefined {
    return this.agents.get(id)
  }

  async sendMessage(
    agentId: string,
    message: string,
    context: ChatMessage[] = [],
    onStream?: (response: StreamingResponse) => void,
  ): Promise<ChatMessage> {
    const agent = this.getAgent(agentId)
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`)
    }

    const provider = this.providers[agent.provider]
    if (!provider) {
      throw new Error(`Provider ${agent.provider} not available`)
    }

    return provider.sendMessage(agent, message, context, onStream)
  }

  async executeToolCall(agentId: string, toolCall: any): Promise<any> {
    const agent = this.getAgent(agentId)
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`)
    }

    const tool = agent.tools?.find((t) => t.name === toolCall.name)
    if (!tool) {
      throw new Error(`Tool ${toolCall.name} not found`)
    }

    return tool.handler(toolCall.parameters)
  }
}

export const agentManager = new AIAgentManager()
