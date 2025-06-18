"use client"

import type React from "react"
import { useState } from "react"

type View = "landing" | "intake" | "negotiation"

const App = () => {
  const [currentView, setCurrentView] = useState<View>("landing")

  return (
    <div>
      {currentView === "landing" && <LandingPage setCurrentView={setCurrentView} />}
      {currentView === "intake" && <IntakeForm setCurrentView={setCurrentView} />}
      {currentView === "negotiation" && <NegotiationRoom setCurrentView={setCurrentView} />}
    </div>
  )
}

const LandingPage = ({ setCurrentView }: { setCurrentView: (view: View) => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agreemint</h1>
          <p className="text-xl text-gray-600 mb-6">AI-assisted contract negotiation platform</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              🤝 AI-mediated negotiation
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">⚖️ Personal AI lawyers</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">✍️ Sign in one session</span>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setCurrentView("intake")}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <h3 className="text-xl font-semibold">Smart Intake Form</h3>
            </div>
            <p className="text-gray-600 mb-4">AI-powered contract creation that detects the right template.</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>• AI template detection</li>
              <li>• Smart project analysis</li>
              <li>• Automated invitation system</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Try Intake Form →
            </button>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setCurrentView("negotiation")}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💬</span>
              <h3 className="text-xl font-semibold">Negotiation Room</h3>
            </div>
            <p className="text-gray-600 mb-4">Real-time AI-assisted negotiation with mobile-responsive design.</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>• Desktop & mobile views</li>
              <li>• AI mediator & lawyers</li>
              <li>• Section-by-section flow</li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              Enter Negotiation Room →
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white/50 backdrop-blur rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <span className="text-2xl">👥</span>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "📝", title: "Describe Project", desc: "AI analyzes needs & selects template." },
              { icon: "🤝", title: "Enter Room", desc: "Both parties join AI-assisted room." },
              { icon: "💬", title: "Negotiate", desc: "AI guides, lawyers protect interests." },
              { icon: "✍️", title: "Sign", desc: "Digital signatures complete contract." },
            ].map((step) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">{step.icon}</span>
                </div>
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to experience the future of contract negotiation?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setCurrentView("intake")}
            >
              Start Your First Contract
            </button>
            <button
              className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setCurrentView("negotiation")}
            >
              See Negotiation Room
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const IntakeForm = ({ setCurrentView }: { setCurrentView: (view: View) => void }) => {
  const [projectDescription, setProjectDescription] = useState("")
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDescriptionChange = (value: string) => {
    setProjectDescription(value)
    setShowAnalysis(value.length > 20)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button onClick={() => setCurrentView("landing")} className="mb-4 text-blue-600 hover:text-blue-800">
          ← Back to Demo
        </button>
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">🎉 Negotiation Room Created!</h2>
            <p className="text-green-700 mb-4">
              Your AI-assisted contract negotiation room is ready. Both parties will receive invitations.
            </p>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-medium text-green-900 mb-2">Next Steps:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Email invitations sent to both parties</li>
                <li>• Room available for 30 days</li>
                <li>• AI mediator and personal lawyers ready</li>
                <li>• Most negotiations complete in 20-30 minutes</li>
              </ul>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Create Another Contract
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={() => setCurrentView("landing")} className="mb-4 text-blue-600 hover:text-blue-800">
        ← Back to Demo
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your First Contract</h1>
          <p className="text-lg text-gray-600">
            Describe your project and we'll set up your AI-assisted negotiation room
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              ✓ Your first contract is free
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">✓ No lawyers needed</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              ✓ Fair terms for everyone
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Project Details
          </h2>
          <p className="text-gray-600 mb-6">
            Tell us about your project and we'll prepare the perfect negotiation room
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium mb-2">Describe your project</label>
              <textarea
                value={projectDescription}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="I need a logo designed for my startup restaurant. Looking for something modern and clean that works well on both digital and print materials..."
                className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Be specific about what you need - our AI will use this to prepare the negotiation
              </p>
            </div>

            {showAnalysis && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">⚡</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">AI Analysis</p>
                    <p className="text-sm text-blue-800">
                      This appears to be individual freelancer work - perfect for our Freelancer Services Agreement.
                    </p>
                    <div className="mt-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs border border-blue-300">
                        Freelancer Services Agreement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-base font-medium mb-4">What's your role in this project?</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="role" value="client" className="text-blue-600" required />
                  <div className="flex-1">
                    <div className="font-medium">I'm hiring</div>
                    <div className="text-sm text-gray-500">I need services delivered</div>
                  </div>
                </label>
                <label className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="role" value="freelancer" className="text-blue-600" required />
                  <div className="flex-1">
                    <div className="font-medium">I'm providing services</div>
                    <div className="text-sm text-gray-500">I'm the freelancer/agency</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Your name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Your email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span className="text-xl">👥</span>
                Invite the other party
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Their email</label>
                  <input
                    type="email"
                    placeholder="sarah@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Their name (optional)</label>
                  <input
                    type="text"
                    placeholder="Sarah Johnson"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">Personal message (optional)</label>
                <textarea
                  placeholder="Hi Sarah! I'd love to work with you on this project. Let's negotiate the terms together in our AI-assisted room..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">This will be included in the invitation email</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Creating your negotiation room...
                  </>
                ) : (
                  <>Create Negotiation Room →</>
                )}
              </button>
              <p className="text-sm text-gray-500 text-center mt-2">
                Both parties will receive an invitation to join the negotiation room
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const NegotiationRoom = ({ setCurrentView }: { setCurrentView: (view: View) => void }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai_mediator",
      content:
        "Welcome to your negotiation room! I'm your AI Mediator, and I'll help guide you through creating fair terms for both parties. John and Sarah, let's start with the project scope.",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "ai_lawyer_user",
      content:
        "Hi John! I'm your personal AI lawyer. I'll help you understand each term and ensure your interests are protected throughout this negotiation.",
      timestamp: new Date(),
    },
    {
      id: "3",
      sender: "other_party",
      content: "Hi John! Excited to work on this project with you. The logo concept sounds great!",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: "ai_mediator",
        content: "That's a great point! Let me help both parties understand the implications of this term...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getSenderInfo = (sender: string) => {
    switch (sender) {
      case "user":
        return { name: "John Smith", color: "bg-blue-100", textColor: "text-blue-800" }
      case "other_party":
        return { name: "Sarah Johnson", color: "bg-green-100", textColor: "text-green-800" }
      case "ai_mediator":
        return { name: "AI Mediator", color: "bg-purple-100", textColor: "text-purple-800" }
      case "ai_lawyer_user":
        return { name: "Your AI Lawyer", color: "bg-blue-100", textColor: "text-blue-800" }
      default:
        return { name: "Unknown", color: "bg-gray-100", textColor: "text-gray-800" }
    }
  }

  if (viewMode === "mobile") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button onClick={() => setCurrentView("landing")} className="mb-4 text-blue-600 hover:text-blue-800">
          ← Back to Demo
        </button>

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setViewMode("desktop")}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            🖥️ Desktop
          </button>
          <button onClick={() => setViewMode("mobile")} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            📱 Mobile
          </button>
        </div>

        <div className="max-w-sm mx-auto border rounded-lg overflow-hidden bg-white">
          <div className="h-[600px] flex flex-col">
            {/* Mobile Header */}
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">What We Are Creating</span>
                  <span className="text-sm text-gray-500 ml-2">1 of 12</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const senderInfo = getSenderInfo(message.sender)
                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${senderInfo.color}`}>
                      <span className="text-xs font-medium">{senderInfo.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium ${senderInfo.textColor}`}>{senderInfo.name}</span>
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

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button onClick={() => setCurrentView("landing")} className="mb-4 text-blue-600 hover:text-blue-800">
        ← Back to Demo
      </button>

      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setViewMode("desktop")} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
          🖥️ Desktop
        </button>
        <button
          onClick={() => setViewMode("mobile")}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
        >
          📱 Mobile
        </button>
      </div>

      <div className="max-w-7xl mx-auto border rounded-lg overflow-hidden bg-white">
        <div className="h-[700px] flex">
          {/* Left Panel - Sections */}
          <div className="w-80 bg-white border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Contract Sections</h2>
            </div>
            <div className="p-4 space-y-2">
              {[
                "What We Are Creating",
                "Our Project Timeline",
                "Investment & Returns",
                "Communication Standards",
                "Intellectual Property",
              ].map((section, index) => (
                <div
                  key={section}
                  className={`p-3 rounded-lg cursor-pointer ${index === 0 ? "bg-blue-100" : "hover:bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{section}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        index === 0 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index === 0 ? "discussing" : "pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Panel - Chat */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white border-b p-4">
              <h1 className="font-semibold">Negotiation Room</h1>
              <p className="text-sm text-gray-500">Section 1: What We Are Creating</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const senderInfo = getSenderInfo(message.sender)
                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${senderInfo.color}`}>
                      <span className="text-sm font-medium">{senderInfo.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-medium ${senderInfo.textColor}`}>{senderInfo.name}</span>
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

            <form onSubmit={handleSendMessage} className="bg-white border-t p-4">
              <div className="flex gap-3">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Discuss this section with the other party..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Right Panel - Participants */}
          <div className="w-80 bg-white border-l">
            <div className="p-4 border-b">
              <h2 className="font-semibold flex items-center gap-2">
                <span className="text-xl">👥</span>
                Participants
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">J</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-500">Client</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">You</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">S</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Freelancer</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Online" />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">AI Assistants</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">✨</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">AI Mediator</p>
                      <p className="text-xs text-gray-500">Guides negotiation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">🛡️</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Your AI Lawyer</p>
                      <p className="text-xs text-gray-500">Protects your interests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
