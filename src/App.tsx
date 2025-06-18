"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, MessageSquare, Users, ArrowRight } from "lucide-react"

type ViewMode = "landing" | "intake" | "negotiation"

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("landing")

  if (currentView === "intake") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Button variant="outline" onClick={() => setCurrentView("landing")} className="mb-4">
          ← Back to Demo
        </Button>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Smart Intake Form</CardTitle>
              <CardDescription>AI-powered contract creation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This would be the smart intake form where users describe their project and AI detects the right contract
                template.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ✨ AI Analysis: This appears to be individual freelancer work - perfect for our Freelancer Services
                    Agreement.
                  </p>
                </div>
                <Button className="w-full">Create Negotiation Room</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === "negotiation") {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Button variant="outline" onClick={() => setCurrentView("landing")} className="mb-4">
          ← Back to Demo
        </Button>
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Negotiation Room</CardTitle>
              <CardDescription>AI-assisted contract negotiation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">AI</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <p className="text-sm">Welcome! Let's start with the project scope.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">U</span>
                      </div>
                      <div className="bg-blue-600 text-white rounded-lg p-3 shadow-sm">
                        <p className="text-sm">I need a logo designed for my restaurant.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Participants</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-sm">John (Client)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-sm">Sarah (Designer)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agreemint</h1>
          <p className="text-xl text-gray-600 mb-6">AI-assisted contract negotiation platform</p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              🤝 AI-mediated negotiation
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              ⚖️ Personal AI lawyers
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              ✍️ Sign in one session
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView("intake")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Smart Intake Form
              </CardTitle>
              <CardDescription>AI-powered contract creation that detects the right template.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside mb-4">
                <li>AI template detection</li>
                <li>Smart project analysis</li>
                <li>Automated invitation system</li>
              </ul>
              <Button className="w-full">
                Try Intake Form <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setCurrentView("negotiation")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Negotiation Room
              </CardTitle>
              <CardDescription>Real-time AI-assisted negotiation with mobile-responsive design.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside mb-4">
                <li>Desktop & mobile views</li>
                <li>AI mediator & lawyers</li>
                <li>Section-by-section flow</li>
              </ul>
              <Button className="w-full">
                Enter Negotiation Room <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to experience the future of contract negotiation?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setCurrentView("intake")}>
              Start Your First Contract
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentView("negotiation")}>
              See Negotiation Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
