"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Loader2, Users, Zap, ArrowRight } from "lucide-react"

const contractIntakeSchema = z.object({
  projectDescription: z.string().min(10, "Please describe your project in more detail"),
  userRole: z.enum(["client", "freelancer"], {
    required_error: "Please select your role in this project",
  }),
  userEmail: z.string().email("Please enter a valid email address"),
  userName: z.string().min(2, "Please enter your name"),
  otherPartyEmail: z.string().email("Please enter the other party's email"),
  otherPartyName: z.string().optional(),
  personalMessage: z.string().optional(),
})

type ContractIntakeForm = z.infer<typeof contractIntakeSchema>

interface SmartIntakeFormProps {
  onSubmit: (data: ContractIntakeForm & { detectedTemplate: "freelancer" | "agency" }) => void
  isLoading?: boolean
}

export function SmartIntakeForm({ onSubmit, isLoading = false }: SmartIntakeFormProps) {
  const [detectedTemplate, setDetectedTemplate] = useState<"freelancer" | "agency" | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<string>("")

  const form = useForm<ContractIntakeForm>({
    resolver: zodResolver(contractIntakeSchema),
    defaultValues: {
      projectDescription: "",
      userRole: undefined,
      userEmail: "",
      userName: "",
      otherPartyEmail: "",
      otherPartyName: "",
      personalMessage: "",
    },
  })

  // Simulate AI template detection based on project description
  const analyzeProject = async (description: string) => {
    if (description.length < 10) return

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple keyword detection (in real app, this would be AI-powered)
    const freelancerKeywords = ["logo", "design", "website", "freelancer", "individual", "personal"]
    const agencyKeywords = ["agency", "team", "company", "marketing", "campaign", "brand strategy"]

    const hasFreelancerKeywords = freelancerKeywords.some((keyword) => description.toLowerCase().includes(keyword))
    const hasAgencyKeywords = agencyKeywords.some((keyword) => description.toLowerCase().includes(keyword))

    if (hasAgencyKeywords && !hasFreelancerKeywords) {
      setDetectedTemplate("agency")
      setAiAnalysis("This looks like an agency services project - multiple team members, strategic work.")
    } else {
      setDetectedTemplate("freelancer")
      setAiAnalysis("This appears to be individual freelancer work - perfect for our Freelancer Services Agreement.")
    }
  }

  const handleProjectDescriptionChange = (value: string) => {
    form.setValue("projectDescription", value)
    if (value.length > 20) {
      analyzeProject(value)
    } else {
      setDetectedTemplate(null)
      setAiAnalysis("")
    }
  }

  const handleSubmit = (data: ContractIntakeForm) => {
    onSubmit({
      ...data,
      detectedTemplate: detectedTemplate || "freelancer",
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your First Contract</h1>
        <p className="text-lg text-gray-600">
          Describe your project and we'll set up your AI-assisted negotiation room
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ✓ Your first contract is free
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            ✓ No lawyers needed
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            ✓ Fair terms for everyone
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Project Details
          </CardTitle>
          <CardDescription>Tell us about your project and we'll prepare the perfect negotiation room</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Project Description */}
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Describe your project</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I need a logo designed for my startup restaurant. Looking for something modern and clean that works well on both digital and print materials..."
                        className="min-h-[100px] resize-none"
                        {...field}
                        onChange={(e) => handleProjectDescriptionChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Be specific about what you need - our AI will use this to prepare the negotiation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AI Analysis Display */}
              {aiAnalysis && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">AI Analysis</p>
                      <p className="text-sm text-blue-800">{aiAnalysis}</p>
                      <div className="mt-2">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {detectedTemplate === "freelancer"
                            ? "Freelancer Services Agreement"
                            : "Agency Services Agreement"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* User Role */}
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">What's your role in this project?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                          <RadioGroupItem value="client" id="client" />
                          <label htmlFor="client" className="flex-1 cursor-pointer">
                            <div className="font-medium">I'm hiring</div>
                            <div className="text-sm text-gray-500">I need services delivered</div>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                          <RadioGroupItem value="freelancer" id="freelancer" />
                          <label htmlFor="freelancer" className="flex-1 cursor-pointer">
                            <div className="font-medium">I'm providing services</div>
                            <div className="text-sm text-gray-500">I'm the freelancer/agency</div>
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Other Party Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Invite the other party
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="otherPartyEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Their email</FormLabel>
                        <FormControl>
                          <Input placeholder="sarah@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="otherPartyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Their name (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Sarah Johnson" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="personalMessage"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Personal message (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Hi Sarah! I'd love to work with you on this project. Let's negotiate the terms together in our AI-assisted room..."
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>This will be included in the invitation email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating your negotiation room...
                    </>
                  ) : (
                    <>
                      Create Negotiation Room
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Both parties will receive an invitation to join the negotiation room
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
