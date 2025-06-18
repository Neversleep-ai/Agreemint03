"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, Clock, Shield, ArrowRight, Sparkles } from "lucide-react"

interface RoomPreviewProps {
  contractData: {
    projectDescription: string
    detectedTemplate: "freelancer" | "agency"
    userName: string
    userEmail: string
    otherPartyEmail: string
    otherPartyName?: string
    userRole: "client" | "freelancer"
  }
  onEnterRoom: () => void
  onScheduleSession: () => void
}

export function RoomPreview({ contractData, onEnterRoom, onScheduleSession }: RoomPreviewProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const mockNegotiationPreview = [
    {
      speaker: "AI Mediator",
      message: "Welcome to your negotiation room! I'll help guide you through creating fair terms for both parties.",
      type: "mediator",
    },
    {
      speaker: "Your AI Lawyer",
      message: "I'm here to help you understand each term and ensure your interests are protected.",
      type: "assistant",
    },
    {
      speaker: "AI Mediator",
      message:
        "Let's start with the project scope. Based on your description, I've prepared some initial terms to discuss...",
      type: "mediator",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Negotiation Room is Ready!</h1>
        <p className="text-lg text-gray-600">
          Here's what you and {contractData.otherPartyName || "the other party"} will experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Negotiation Preview
            </CardTitle>
            <CardDescription>See how your AI-assisted negotiation will work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNegotiationPreview.map((msg, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === "mediator" ? "bg-purple-100" : "bg-blue-100"
                    }`}
                  >
                    {msg.type === "mediator" ? (
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Shield className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{msg.speaker}</p>
                    <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 italic">...and the conversation continues...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room Details */}
        <div className="space-y-6">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(contractData.userName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contractData.userName}</p>
                    <p className="text-sm text-gray-500">
                      {contractData.userRole === "client" ? "Hiring" : "Service Provider"}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    You
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {contractData.otherPartyName ? getInitials(contractData.otherPartyName) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contractData.otherPartyName || "Other Party"}</p>
                    <p className="text-sm text-gray-500">
                      {contractData.userRole === "client" ? "Service Provider" : "Hiring"}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    Invited
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Type */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {contractData.detectedTemplate === "freelancer"
                      ? "Freelancer Services Agreement"
                      : "Agency Services Agreement"}
                  </p>
                  <p className="text-sm text-gray-500">AI-selected based on your project description</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                    1
                  </div>
                  <p>Both parties enter the negotiation room</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                    2
                  </div>
                  <p>AI Mediator guides you through each contract section</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                    3
                  </div>
                  <p>Your personal AI lawyers help you understand terms</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                    4
                  </div>
                  <p>Agree on terms and sign digitally - all in one session!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Here's how this works:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <p className="text-sm">You'll both enter a negotiation room</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <p className="text-sm">AI suggests fair terms based on your project</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <p className="text-sm">Discuss and adjust terms in real-time</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚖️</span>
              <p className="text-sm">Your personal AI lawyer explains everything</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <p className="text-sm">Sign when you're both happy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Button size="lg" onClick={onEnterRoom} className="flex-1 sm:flex-none">
          <ArrowRight className="w-4 h-4 mr-2" />
          Start Negotiating Now
        </Button>
        <Button size="lg" variant="outline" onClick={onScheduleSession} className="flex-1 sm:flex-none">
          <Clock className="w-4 h-4 mr-2" />
          Schedule for Later
        </Button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          💡 <strong>Tip:</strong> Most negotiations complete in 20-30 minutes
        </p>
      </div>
    </div>
  )
}
