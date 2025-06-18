"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import type { ChatMessage, ChatSession } from "../../types/api"
import { chatApi } from "../../services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface ChatInterfaceProps {
  session?: ChatSession
  onNewSession?: (session: ChatSession) => void
}

export function ChatInterface({ session, onNewSession }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(session?.messages || [])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const sendMessageMutation = useMutation({
    mutationFn: chatApi.sendMessage,
    onSuccess: (response) => {
      setMessages((prev) => [...prev, response.message])
      if (!session && onNewSession) {
        // Handle new session creation
        queryClient.invalidateQueries({ queryKey: ["chat-sessions"] })
      }
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    sendMessageMutation.mutate({
      message: message,
      sessionId: session?.id,
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <Card
                className={`max-w-[80%] p-3 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </Card>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {sendMessageMutation.isPending && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground animate-pulse" />
              </div>
              <Card className="bg-muted p-3">
                <p className="text-sm text-muted-foreground">Thinking...</p>
              </Card>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={sendMessageMutation.isPending}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim() || sendMessageMutation.isPending} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
