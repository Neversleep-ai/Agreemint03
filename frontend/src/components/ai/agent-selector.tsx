"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Cloud, Server } from "lucide-react"
import type { AIAgent } from "../../lib/ai-agents/types"

interface AgentSelectorProps {
  agents: AIAgent[]
  selectedAgent?: AIAgent
  onAgentSelect: (agent: AIAgent) => void
}

export function AgentSelector({ agents, selectedAgent, onAgentSelect }: AgentSelectorProps) {
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "openai":
        return <Zap className="w-4 h-4" />
      case "anthropic":
        return <Bot className="w-4 h-4" />
      case "backend":
        return <Server className="w-4 h-4" />
      default:
        return <Cloud className="w-4 h-4" />
    }
  }

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "openai":
        return "bg-green-100 text-green-800"
      case "anthropic":
        return "bg-blue-100 text-blue-800"
      case "backend":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <Select
        value={selectedAgent?.id}
        onValueChange={(value) => {
          const agent = agents.find((a) => a.id === value)
          if (agent) onAgentSelect(agent)
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an AI agent" />
        </SelectTrigger>
        <SelectContent>
          {agents.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              <div className="flex items-center gap-2">
                {getProviderIcon(agent.provider)}
                <span>{agent.name}</span>
                <Badge variant="secondary" className={getProviderColor(agent.provider)}>
                  {agent.provider}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedAgent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getProviderIcon(selectedAgent.provider)}
              {selectedAgent.name}
              <Badge className={getProviderColor(selectedAgent.provider)}>{selectedAgent.provider}</Badge>
            </CardTitle>
            <CardDescription>{selectedAgent.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Model:</strong> {selectedAgent.model}
              </div>
              {selectedAgent.temperature && (
                <div>
                  <strong>Temperature:</strong> {selectedAgent.temperature}
                </div>
              )}
              {selectedAgent.tools && selectedAgent.tools.length > 0 && (
                <div>
                  <strong>Tools:</strong> {selectedAgent.tools.map((t) => t.name).join(", ")}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
