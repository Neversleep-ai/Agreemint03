"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Mail, Users } from "lucide-react"

interface SessionSchedulerProps {
  contractData: {
    projectDescription: string
    userName: string
    otherPartyName?: string
    otherPartyEmail: string
  }
  onSchedule: (scheduleData: ScheduleData) => void
  onCancel: () => void
}

interface ScheduleData {
  proposedDate: string
  proposedTime: string
  timezone: string
  message: string
  reminderEnabled: boolean
}

export function SessionScheduler({ contractData, onSchedule, onCancel }: SessionSchedulerProps) {
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    proposedDate: "",
    proposedTime: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    message: "",
    reminderEnabled: true,
  })

  const handleSchedule = () => {
    onSchedule(scheduleData)
  }

  const suggestedTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Schedule Negotiation Session
          </CardTitle>
          <CardDescription>
            Coordinate a time that works for both you and {contractData.otherPartyName || "the other party"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Overview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">Session Details</h3>
                <p className="text-sm text-blue-800 mt-1">
                  You and {contractData.otherPartyName || "the other party"} will negotiate contract terms for: "
                  {contractData.projectDescription.substring(0, 100)}..."
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="border-blue-300 text-blue-700">
                    Estimated duration: 20-30 minutes
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Proposed Date</Label>
            <Input
              id="date"
              type="date"
              value={scheduleData.proposedDate}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, proposedDate: e.target.value }))}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">Proposed Time</Label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {suggestedTimes.map((time) => (
                <Button
                  key={time}
                  variant={scheduleData.proposedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScheduleData((prev) => ({ ...prev, proposedTime: time }))}
                >
                  {time}
                </Button>
              ))}
            </div>
            <Input
              id="time"
              type="time"
              value={scheduleData.proposedTime}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, proposedTime: e.target.value }))}
            />
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label>Timezone</Label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{scheduleData.timezone}</span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message to {contractData.otherPartyName || "other party"} (optional)</Label>
            <Textarea
              id="message"
              placeholder="Hi! I'd like to schedule our contract negotiation session. Does this time work for you?"
              value={scheduleData.message}
              onChange={(e) => setScheduleData((prev) => ({ ...prev, message: e.target.value }))}
              rows={3}
            />
          </div>

          {/* What Happens Next */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              What happens next:
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• {contractData.otherPartyName || "The other party"} will receive an email invitation</p>
              <p>• They can accept, decline, or propose a different time</p>
              <p>• Both parties will receive calendar invites once confirmed</p>
              <p>• You'll get reminder notifications before the session</p>
              <p>• The negotiation room will be available 30 days from creation</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSchedule}
              className="flex-1"
              disabled={!scheduleData.proposedDate || !scheduleData.proposedTime}
            >
              Send Schedule Request
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
