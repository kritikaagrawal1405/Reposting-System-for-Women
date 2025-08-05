"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, FileText, ImageIcon, AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

interface Evidence {
  id: string
  type: "document" | "image" | "audio" | "video" | "testimony"
  title: string
  description: string
  date: string
  status: "complete" | "incomplete" | "needs-review"
  file?: File
  metadata?: any
}

export default function EvidenceManagement() {
  const [evidence, setEvidence] = useState<Evidence[]>([
    {
      id: "1",
      type: "document",
      title: "Email Thread - Inappropriate Comments",
      description: "Email exchange with supervisor containing inappropriate remarks",
      date: "2024-01-15",
      status: "complete",
    },
    {
      id: "2",
      type: "testimony",
      title: "Witness Statement - John Doe",
      description: "Colleague witnessed incident in break room",
      date: "2024-01-16",
      status: "incomplete",
    },
  ])

  const [completenessScore, setCompletenessScore] = useState(65)
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      type: "missing",
      priority: "high",
      message: "Consider adding location details for Incident #2 to strengthen your case",
    },
    {
      type: "improvement",
      priority: "medium",
      message: "Witness statement from John Doe needs contact information",
    },
    {
      type: "legal",
      priority: "low",
      message: "Timeline shows good chronological documentation",
    },
  ])

  const [deadManSwitch, setDeadManSwitch] = useState({
    enabled: false,
    inactiveDays: 30,
    recipientEmail: "",
    message: "",
  })

  const addEvidence = () => {
    const newEvidence: Evidence = {
      id: Date.now().toString(),
      type: "document",
      title: "New Evidence",
      description: "",
      date: new Date().toISOString().split("T")[0],
      status: "incomplete",
    }
    setEvidence([...evidence, newEvidence])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "incomplete":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "needs-review":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800"
      case "incomplete":
        return "bg-orange-100 text-orange-800"
      case "needs-review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <h1 className="text-3xl font-bold text-gray-900">Evidence Management</h1>
            <p className="text-gray-600">AI-powered evidence collection and analysis</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="evidence" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="evidence">Evidence Collection</TabsTrigger>
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="escalation">Auto-Escalation</TabsTrigger>
              </TabsList>

              <TabsContent value="evidence" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Evidence Repository</CardTitle>
                        <CardDescription>Secure storage for all case-related materials</CardDescription>
                      </div>
                      <Button onClick={addEvidence}>
                        <Upload className="h-4 w-4 mr-2" />
                        Add Evidence
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {evidence.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="mt-1">
                                {item.type === "document" && <FileText className="h-5 w-5 text-blue-600" />}
                                {item.type === "image" && <ImageIcon className="h-5 w-5 text-green-600" />}
                                {item.type === "testimony" && <FileText className="h-5 w-5 text-purple-600" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                <p className="text-xs text-gray-500 mt-2">Date: {item.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(item.status)}
                              <Badge className={getStatusColor(item.status)}>{item.status.replace("-", " ")}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Case Analysis</CardTitle>
                    <CardDescription>Intelligent recommendations to strengthen your case</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Case Completeness Score</Label>
                        <span className="text-2xl font-bold text-blue-600">{completenessScore}%</span>
                      </div>
                      <Progress value={completenessScore} className="h-2" />
                      <p className="text-sm text-gray-600 mt-2">Based on PoSH guidelines and legal best practices</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">AI Recommendations</h4>
                      <div className="space-y-3">
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <div className="flex items-center justify-between mb-1">
                              <Badge
                                variant={
                                  suggestion.priority === "high"
                                    ? "destructive"
                                    : suggestion.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {suggestion.priority} priority
                              </Badge>
                              <Badge variant="outline">{suggestion.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-700">{suggestion.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="escalation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dead Man's Switch</CardTitle>
                    <CardDescription>Automatic escalation if your account becomes inactive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enable-switch"
                        checked={deadManSwitch.enabled}
                        onChange={(e) => setDeadManSwitch({ ...deadManSwitch, enabled: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="enable-switch">Enable automatic escalation</Label>
                    </div>

                    {deadManSwitch.enabled && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <Label htmlFor="inactive-days">Trigger after inactive days</Label>
                          <Input
                            id="inactive-days"
                            type="number"
                            value={deadManSwitch.inactiveDays}
                            onChange={(e) =>
                              setDeadManSwitch({ ...deadManSwitch, inactiveDays: Number.parseInt(e.target.value) })
                            }
                            className="w-24"
                          />
                        </div>

                        <div>
                          <Label htmlFor="recipient-email">Recipient Email</Label>
                          <Input
                            id="recipient-email"
                            type="email"
                            placeholder="lawyer@example.com"
                            value={deadManSwitch.recipientEmail}
                            onChange={(e) => setDeadManSwitch({ ...deadManSwitch, recipientEmail: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label htmlFor="escalation-message">Escalation Message</Label>
                          <Textarea
                            id="escalation-message"
                            placeholder="This is an automated message. Please find attached my PoSH complaint documentation..."
                            value={deadManSwitch.message}
                            onChange={(e) => setDeadManSwitch({ ...deadManSwitch, message: e.target.value })}
                          />
                        </div>

                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                          <p className="text-sm text-yellow-800">
                            This will automatically send your prepared case files if you don't log in for{" "}
                            {deadManSwitch.inactiveDays} days.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">End-to-end encryption active</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Secure backup enabled</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">Last activity: 2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Case Summary
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload Files
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Case Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Evidence</span>
                    <span className="font-medium">{evidence.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Complete Items</span>
                    <span className="font-medium">{evidence.filter((e) => e.status === "complete").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Days Documented</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
