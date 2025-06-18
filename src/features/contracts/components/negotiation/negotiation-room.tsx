"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MessageSquare,
  Users,
  Send,
  Menu,
  X,
  Sparkles,
  Shield,
  FileText,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NegotiationMessage {
  id: string
  sender: "user" | "other_party" | "ai_mediator" | "ai_lawyer_user" | "ai_lawyer_other"
  content: string
  timestamp: Date
  sectionId?: string
}

interface ContractSection {
  id: string
  title: string
  status: "pending" | "discussing" | "agreed" | "conflicted"
  order: number
}

interface NegotiationRoomProps {
  roomId: string
  currentUser: {
    id: string
    name: string
    role: "client" | "freelancer"
  }
  otherParty: {
    id: string
    name: string
    role: "client" | "freelancer"
  }
  contractSections: ContractSection[]
}

export function NegotiationRoom({ roomId, currentUser, otherParty, contractSections }: NegotiationRoomProps) {
  const [messages, setMessages] = useState<NegotiationMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileView, setMobileView] = useState<"chat" | "contract">("chat")
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Initialize with welcome messages
  useEffect(() => {
    const welcomeMessages: NegotiationMessage[] = [
      {
        id: "1",
        sender: "ai_mediator",
        content: `Welcome to your negotiation room! I'm your AI Mediator, and I'll help guide you through creating fair terms for both parties. ${currentUser.name} and ${otherParty.name}, let's start with the project scope.`,
        timestamp: new Date(),
      },
      {
        id: "2",
        sender: "ai_lawyer_user",
        content: `Hi ${currentUser.name}! I'm your personal AI lawyer. I'll help you understand each term and ensure your interests are protected throughout this negotiation.`,
        timestamp: new Date(),
      },
    ]
    setMessages(welcomeMessages)
  }, [currentUser.name, otherParty.name])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: NegotiationMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      sectionId: contractSections[currentSectionIndex]?.id,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate AI responses
    setTimeout(() => {
      const aiResponse: NegotiationMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai_mediator",
        content: "That's a great point! Let me help both parties understand the implications of this term...",
        timestamp: new Date(),
        sectionId: contractSections[currentSectionIndex]?.id,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getSenderInfo = (sender: NegotiationMessage["sender"]) => {
    switch (sender) {
      case "user":
        return { name: currentUser.name, color: "bg-blue-100", textColor: "text-blue-800", icon: null }
      case "other_party":
        return { name: otherParty.name, color: "bg-green-100", textColor: "text-green-800", icon: null }
      case "ai_mediator":
        return {
          name: "AI Mediator",
          color: "bg-purple-100",
          textColor: "text-purple-800",
          icon: <Sparkles className="w-3 h-3" />,
        }
      case "ai_lawyer_user":
        return {
          name: "Your AI Lawyer",
          color: "bg-blue-100",
          textColor: "text-blue-800",
          icon: <Shield className="w-3 h-3" />,
        }
      case "ai_lawyer_other":
        return {
          name: `${otherParty.name}'s AI Lawyer`,
          color: "bg-green-100",
          textColor: "text-green-800",
          icon: <Shield className="w-3 h-3" />,
        }
      default:
        return { name: "Unknown", color: "bg-gray-100", textColor: "text-gray-800", icon: null }
    }
  }

  const currentSection = contractSections[currentSectionIndex]

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{currentSection?.title || "Loading..."}</Badge>
              <span className="text-sm text-gray-500">
                {currentSectionIndex + 1} of {contractSections.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileView(mobileView === "chat" ? "contract" : "chat")}
              >
                {mobileView === "chat" ? <FileText className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="bg-white border-b">
          <div className="flex">
            <Button
              variant={mobileView === "chat" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setMobileView("chat")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              variant={mobileView === "contract" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setMobileView("contract")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Contract
            </Button>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-hidden">
          {mobileView === "chat" ? (
            <div className="h-full flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const senderInfo = getSenderInfo(message.sender)
                    return (
                      <div key={message.id} className="flex items-start gap-3">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", senderInfo.color)}>
                          {senderInfo.icon || <span className="text-xs font-medium">{senderInfo.name.charAt(0)}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-xs font-medium", senderInfo.textColor)}>{senderInfo.name}</span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 break-words">{message.content}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Mobile Message Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full p-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{currentSection?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Contract section content and options will be displayed here for mobile users.
                  </p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                      disabled={currentSectionIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentSectionIndex(Math.min(contractSections.length - 1, currentSectionIndex + 1))
                      }
                      disabled={currentSectionIndex === contractSections.length - 1}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Desktop Layout
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Panel - Navigation */}
      <div
        className={cn("bg-white border-r transition-all duration-300", leftPanelOpen ? "w-80" : "w-0 overflow-hidden")}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Contract Sections</h2>
            <Button variant="ghost" size="sm" onClick={() => setLeftPanelOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-2">
            {contractSections.map((section, index) => (
              <div
                key={section.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors",
                  index === currentSectionIndex ? "bg-blue-100 border-blue-200" : "hover:bg-gray-50",
                )}
                onClick={() => setCurrentSectionIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{section.title}</span>
                  <Badge variant={section.status === "agreed" ? "default" : "secondary"} className="text-xs">
                    {section.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Center Panel - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!leftPanelOpen && (
                <Button variant="ghost" size="sm" onClick={() => setLeftPanelOpen(true)}>
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <div>
                <h1 className="font-semibold">Negotiation Room</h1>
                <p className="text-sm text-gray-500">
                  Section {currentSectionIndex + 1}: {currentSection?.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Desktop Mode</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => {
              const senderInfo = getSenderInfo(message.sender)
              return (
                <div key={message.id} className="flex items-start gap-3">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", senderInfo.color)}>
                    {senderInfo.icon || <span className="text-sm font-medium">{senderInfo.name.charAt(0)}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-sm font-medium", senderInfo.textColor)}>{senderInfo.name}</span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm border">
                      <p className="text-sm text-gray-900">{message.content}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Chat Input */}
        <div className="bg-white border-t p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Discuss this section with the other party..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Participants */}
      <div className="w-80 bg-white border-l">
        <div className="p-4 border-b">
          <h2 className="font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Participants
          </h2>
        </div>
        <div className="p-4 space-y-4">
          {/* Current User */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-gray-500 capitalize">{currentUser.role}</p>
            </div>
            <Badge variant="secondary">You</Badge>
          </div>

          <Separator />

          {/* Other Party */}
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{otherParty.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{otherParty.name}</p>
              <p className="text-sm text-gray-500 capitalize">{otherParty.role}</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full" title="Online" />
          </div>

          <Separator />

          {/* AI Assistants */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">AI Assistants</h3>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">AI Mediator</p>
                <p className="text-xs text-gray-500">Guides negotiation</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Your AI Lawyer</p>
                <p className="text-xs text-gray-500">Protects your interests</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{otherParty.name}'s AI Lawyer</p>
                <p className="text-xs text-gray-500">Protects their interests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
