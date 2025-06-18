"use client"

import { useState, useCallback } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { agentManager } from "../lib/ai-agents/agent-manager"
import type { ChatMessage, StreamingResponse } from "../lib/ai-agents/types"

export function useAIAgent(agentId: string) {
  const [streamingContent, setStreamingContent] = useState<string>("")
  const [isStreaming, setIsStreaming] = useState(false)

  const { data: agent } = useQuery({
    queryKey: ["agent", agentId],
    queryFn: () => agentManager.getAgent(agentId),
    enabled: !!agentId,
  })

  const sendMessageMutation = useMutation({
    mutationFn: async ({
      message,
      context,
      streaming = true,
    }: {
      message: string
      context?: ChatMessage[]
      streaming?: boolean
    }) => {
      if (!streaming) {
        return agentManager.sendMessage(agentId, message, context)
      }

      setIsStreaming(true)
      setStreamingContent("")

      const handleStream = (response: StreamingResponse) => {
        setStreamingContent(response.content)
        if (response.isComplete) {
          setIsStreaming(false)
        }
      }

      return agentManager.sendMessage(agentId, message, context, handleStream)
    },
  })

  const sendMessage = useCallback(
    (message: string, context?: ChatMessage[], streaming = true) => {
      return sendMessageMutation.mutateAsync({ message, context, streaming })
    },
    [sendMessageMutation],
  )

  return {
    agent,
    sendMessage,
    isLoading: sendMessageMutation.isPending,
    error: sendMessageMutation.error,
    streamingContent,
    isStreaming,
  }
}
