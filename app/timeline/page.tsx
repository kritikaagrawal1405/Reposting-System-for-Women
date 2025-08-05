"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Calendar, MapPin, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface TimelineEvent {
  id: string
  date: string
  time: string
  title: string
  description: string
  location: string
  witnesses: string[]
  severity: "low" | "medium" | "high"
  evidence: string[]
}

export default function TimelineBuilder() {
  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: "1",
      date: "2024-01-10",
      time: "14:30",
      title: "Inappropriate Comment in Meeting",
      description: "During team meeting, supervisor made inappropriate comment about appearance",
      location: "Conference Room B",
      witnesses: ["John Doe", "Jane Smith"],
      severity: "medium",
      evidence: ["meeting-notes.pdf"],
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "09:15",
      title: "Unwanted Physical Contact",
      description: "Supervisor placed hand on shoulder despite previous objections",
      location: "Office Cubicle Area",
      witnesses: ["Mike Johnson"],
      severity: "high",
      evidence: ["witness-statement.pdf", "email-complaint.pdf"],
    },
  ])

  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({
    date: "",
    time: "",
    title: "",
    description: "",
    location: "",
    witnesses: [],
    severity: "medium",
    evidence: [],
  })

  const [showNewEventForm, setShowNewEventForm] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState({
    gaps: [
      {
        date: "2024-01-12",
        suggestion: "Consider documenting any follow-up conversations or reactions from this period",
      },
      { date: "2024-01-17", suggestion: "Timeline shows escalation pattern - document any policy violations reported" },
    ],
    patterns: [
      "Incidents show escalating severity over time",
      "All incidents involve the same supervisor",
      "Witnesses present in most incidents - strong corroboration",
    ],
  })

  const addEvent = () => {
    if (!newEvent.date || !newEvent.title) return

    const event: TimelineEvent = {
      id: Date.now().toString(),
      date: newEvent.date,
      time: newEvent.time || "00:00",
      title: newEvent.title,
      description: newEvent.description || "",
      location: newEvent.location || "",
      witnesses: newEvent.witnesses || [],
      severity: newEvent.severity || "medium",
      evidence: newEvent.evidence || [],
    }

    setEvents([...events, event].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setNewEvent({})
    setShowNewEventForm(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Timeline Builder</h1>
            <p className="text-gray-600">Chronological documentation with AI-powered gap analysis</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Incident Timeline</CardTitle>
                    <CardDescription>Chronological sequence of events</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewEventForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                  <div className="space-y-8">
                    {events.map((event, index) => (
                      <div key={event.id} className="relative flex items-start">
                        {/* Timeline Dot */}
                        <div
                          className={`absolute left-6 w-4 h-4 rounded-full border-2 ${
                            event.severity === "high"
                              ? "bg-red-500 border-red-600"
                              : event.severity === "medium"
                                ? "bg-yellow-500 border-yellow-600"
                                : "bg-green-500 border-green-600"
                          }`}
                        ></div>

                        {/* Event Content */}
                        <div className="ml-16 flex-1">
                          <Card className="border-l-4 border-l-blue-500">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                  <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {event.date} at {event.time}
                                  </div>
                                </div>
                                <Badge className={getSeverityColor(event.severity)}>{event.severity} severity</Badge>
                              </div>

                              <p className="text-gray-700 mb-3">{event.description}</p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                {event.location && (
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                    <span>{event.location}</span>
                                  </div>
                                )}

                                {event.witnesses.length > 0 && (
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                                    <span>{event.witnesses.join(", ")}</span>
                                  </div>
                                )}
                              </div>

                              {event.evidence.length > 0 && (
                                <div className="mt-3">
                                  <div className="flex flex-wrap gap-1">
                                    {event.evidence.map((evidence) => (
                                      <Badge key={evidence} variant="outline" className="text-xs">
                                        {evidence}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New Event Form */}
            {showNewEventForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Event</CardTitle>
                  <CardDescription>Document a new incident in your timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-date">Date</Label>
                      <Input
                        id="event-date"
                        type="date"
                        value={newEvent.date || ""}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-time">Time</Label>
                      <Input
                        id="event-time"
                        type="time"
                        value={newEvent.time || ""}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="event-title">Title</Label>
                    <Input
                      id="event-title"
                      placeholder="Brief description of the incident"
                      value={newEvent.title || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Detailed description of what happened"
                      value={newEvent.description || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="event-location">Location</Label>
                    <Input
                      id="event-location"
                      placeholder="Where did this occur?"
                      value={newEvent.location || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={addEvent}>Add Event</Button>
                    <Button variant="outline" onClick={() => setShowNewEventForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Timeline Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" />
                      Potential Gaps
                    </h4>
                    <div className="space-y-2">
                      {aiAnalysis.gaps.map((gap, index) => (
                        <div key={index} className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm font-medium text-orange-800">{gap.date}</p>
                          <p className="text-xs text-orange-700 mt-1">{gap.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Pattern Analysis</h4>
                    <div className="space-y-2">
                      {aiAnalysis.patterns.map((pattern, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">{pattern}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Events</span>
                    <span className="font-medium">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Date Range</span>
                    <span className="font-medium">
                      {events.length > 0
                        ? `${Math.ceil((new Date(events[events.length - 1].date).getTime() - new Date(events[0].date).getTime()) / (1000 * 60 * 60 * 24))} days`
                        : "0 days"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">High Severity</span>
                    <span className="font-medium text-red-600">
                      {events.filter((e) => e.severity === "high").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Witnesses</span>
                    <span className="font-medium">{new Set(events.flatMap((e) => e.witnesses)).size}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Export as PDF Report
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Generate Legal Summary
                </Button>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Share with Legal Counsel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
