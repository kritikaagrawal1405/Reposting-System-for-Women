"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Mic,
  Camera,
  Save,
  Lock,
  AlertTriangle,
  Shield,
  Upload,
  Trash2,
  Square,
  FileText,
  Target,
  Database,
  Layers,
  Activity,
  BarChart3,
  Timer,
  Fingerprint,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  Grid,
  List,
  Headphones,
} from "lucide-react"
import Link from "next/link"

interface CaseFile {
  id: string
  timestamp: string
  classification: string
  priority: "routine" | "elevated" | "urgent" | "critical"
  jurisdiction: string
  summary: string
  stakeholders: string[]
  attachments: {
    type: "text" | "audio" | "image" | "document"
    content: string
    secured: boolean
  }[]
  confidentiality: boolean
  deferredProcessing?: {
    enabled: boolean
    processDate: string
    rationale: string
  }
}

export default function IncidentLogger() {
  const [currentCase, setCurrentCase] = useState<Partial<CaseFile>>({
    classification: "",
    priority: "elevated",
    jurisdiction: "",
    summary: "",
    stakeholders: [],
    attachments: [],
    confidentiality: true,
    deferredProcessing: {
      enabled: false,
      processDate: "",
      rationale: "",
    },
  })

  const [isCapturing, setIsCapturing] = useState(false)
  const [captureTimer, setCaptureTimer] = useState(0)
  const [archivedCases, setArchivedCases] = useState<CaseFile[]>([])
  const [caseStrength, setCaseStrength] = useState(35)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPhase, setCurrentPhase] = useState(1)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const classificationTypes = [
    "Workplace Misconduct",
    "Professional Boundary Violation",
    "Organizational Policy Breach",
    "Interpersonal Conflict Escalation",
    "Authority Misuse",
    "Environmental Disruption",
    "Communication Violation",
    "Behavioral Infraction",
    "Procedural Non-Compliance",
    "Ethical Violation",
    "Unspecified Incident",
  ]

  const phases = [
    { id: 1, title: "Case Intake", icon: Briefcase, color: "text-orange-400" },
    { id: 2, title: "Evidence Assembly", icon: Database, color: "text-blue-400" },
    { id: 3, title: "Stakeholder Mapping", icon: Users, color: "text-green-400" },
    { id: 4, title: "Case Finalization", icon: Award, color: "text-purple-400" },
  ]

  const startCapture = () => {
    setIsCapturing(true)
    const timer = setInterval(() => {
      setCaptureTimer((prev) => prev + 1)
    }, 1000)

    setTimeout(() => {
      setIsCapturing(false)
      clearInterval(timer)
      const audioAttachment = {
        type: "audio" as const,
        content: `Audio capture - ${captureTimer}s session`,
        secured: true,
      }
      setCurrentCase((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), audioAttachment],
      }))
      setCaptureTimer(0)
      updateCaseStrength()
    }, 5000)
  }

  const captureVisual = () => {
    const visualAttachment = {
      type: "image" as const,
      content: `Visual documentation captured at ${new Date().toLocaleTimeString()}`,
      secured: true,
    }
    setCurrentCase((prev) => ({
      ...prev,
      attachments: [...(prev.attachments || []), visualAttachment],
    }))
    updateCaseStrength()
  }

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const documentAttachment = {
          type: "document" as const,
          content: `${file.name} (${(file.size / 1024).toFixed(1)}KB)`,
          secured: true,
        }
        setCurrentCase((prev) => ({
          ...prev,
          attachments: [...(prev.attachments || []), documentAttachment],
        }))
      })
      updateCaseStrength()
    }
  }

  const updateCaseStrength = () => {
    let strength = 35
    if (currentCase.classification) strength += 15
    if (currentCase.summary && currentCase.summary.length > 100) strength += 20
    if (currentCase.jurisdiction) strength += 10
    if (currentCase.attachments && currentCase.attachments.length > 0) strength += 15
    if (currentCase.stakeholders && currentCase.stakeholders.length > 0) strength += 5
    setCaseStrength(Math.min(strength, 100))
  }

  const archiveCase = () => {
    const caseFile: CaseFile = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      classification: currentCase.classification || "",
      priority: currentCase.priority || "elevated",
      jurisdiction: currentCase.jurisdiction || "",
      summary: currentCase.summary || "",
      stakeholders: currentCase.stakeholders || [],
      attachments: currentCase.attachments || [],
      confidentiality: currentCase.confidentiality || true,
      deferredProcessing: currentCase.deferredProcessing,
    }

    setArchivedCases([...archivedCases, caseFile])

    // Reset form
    setCurrentCase({
      classification: "",
      priority: "elevated",
      jurisdiction: "",
      summary: "",
      stakeholders: [],
      attachments: [],
      confidentiality: true,
      deferredProcessing: {
        enabled: false,
        processDate: "",
        rationale: "",
      },
    })
    setCaseStrength(35)
    setCurrentPhase(1)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 text-white"
      case "urgent":
        return "bg-orange-600 text-white"
      case "elevated":
        return "bg-yellow-600 text-black"
      case "routine":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Top Control Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-orange-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-6 text-orange-700 hover:text-orange-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Navigator Hub
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Professional Case Builder</h1>
              <p className="text-orange-600">Advanced incident documentation system</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Case Strength</p>
              <p className="text-2xl font-bold text-orange-600">{caseStrength}%</p>
            </div>
            <div className="w-32">
              <Progress value={caseStrength} className="h-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Navigation Panel */}
        <div className="w-96 bg-white/80 backdrop-blur-sm border-r border-orange-200 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-8">Case Development Process</h2>
          <div className="space-y-6">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={`flex items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  currentPhase === phase.id
                    ? "bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 shadow-lg"
                    : "bg-white/60 hover:bg-white/80 border border-orange-100"
                }`}
                onClick={() => setCurrentPhase(phase.id)}
              >
                <phase.icon className={`h-8 w-8 ${phase.color} mr-4`} />
                <div>
                  <h3 className="font-bold text-gray-800">{phase.title}</h3>
                  <p className="text-gray-600 text-sm">Phase {phase.id}</p>
                </div>
                {currentPhase === phase.id && <div className="ml-auto w-3 h-3 bg-orange-500 rounded-full"></div>}
              </div>
            ))}
          </div>

          {/* System Status */}
          <div className="mt-12 p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border border-green-200">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <span className="font-bold text-green-800">System Status: Operational</span>
            </div>
            <div className="space-y-3 text-sm text-green-700">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                <span>Enterprise encryption active</span>
              </div>
              <div className="flex items-center">
                <Fingerprint className="h-4 w-4 mr-2" />
                <span>Biometric verification enabled</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                <span>Real-time audit logging</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Active Cases</span>
              <span className="text-gray-800 font-bold">{archivedCases.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Attachments</span>
              <span className="text-gray-800 font-bold">{currentCase.attachments?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Security Level</span>
              <Badge className="bg-green-600 text-white">Enterprise</Badge>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 p-8">
          {/* Phase Content */}
          {currentPhase === 1 && (
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Briefcase className="h-10 w-10 text-orange-500 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Case Intake & Classification</h2>
                  <p className="text-gray-600 text-lg">Initialize new case file with preliminary assessment</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-orange-500" />
                      Incident Classification
                    </CardTitle>
                    <CardDescription className="text-gray-600">Primary categorization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={currentCase.classification}
                      onValueChange={(value) => {
                        setCurrentCase((prev) => ({ ...prev, classification: value }))
                        updateCaseStrength()
                      }}
                    >
                      <SelectTrigger className="bg-white/80 border-orange-200">
                        <SelectValue placeholder="Select classification type" />
                      </SelectTrigger>
                      <SelectContent>
                        {classificationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                      Priority Assessment
                    </CardTitle>
                    <CardDescription className="text-gray-600">Urgency classification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={currentCase.priority}
                      onValueChange={(value) => setCurrentCase((prev) => ({ ...prev, priority: value as any }))}
                    >
                      <SelectTrigger className="bg-white/80 border-orange-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine - Standard processing</SelectItem>
                        <SelectItem value="elevated">Elevated - Expedited review</SelectItem>
                        <SelectItem value="urgent">Urgent - Priority handling</SelectItem>
                        <SelectItem value="critical">Critical - Immediate action</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                    Jurisdictional Information
                  </CardTitle>
                  <CardDescription className="text-gray-600">Location and organizational context</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Department, location, organizational unit, or jurisdiction"
                    value={currentCase.jurisdiction}
                    onChange={(e) => {
                      setCurrentCase((prev) => ({ ...prev, jurisdiction: e.target.value }))
                      updateCaseStrength()
                    }}
                    className="bg-white/80 border-orange-200"
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  onClick={() => setCurrentPhase(2)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl"
                  disabled={!currentCase.classification}
                >
                  Proceed to Evidence Assembly
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {currentPhase === 2 && (
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Database className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Evidence Assembly & Documentation</h2>
                  <p className="text-gray-600 text-lg">Comprehensive incident narrative and supporting materials</p>
                </div>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    Comprehensive Case Summary
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Detailed narrative including timeline, context, and impact assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide comprehensive documentation including:
• Chronological sequence of events
• Organizational context and relationships
• Specific behaviors and communications
• Impact assessment and consequences
• Relevant policies or procedures
• Previous related incidents or patterns"
                    value={currentCase.summary}
                    onChange={(e) => {
                      setCurrentCase((prev) => ({ ...prev, summary: e.target.value }))
                      updateCaseStrength()
                    }}
                    className="min-h-[300px] bg-white/80 border-orange-200"
                  />
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-8">
                <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <CardHeader className="text-center">
                    <Mic className="h-16 w-16 text-cyan-500 mx-auto mb-4" />
                    <CardTitle className="text-gray-800">Audio Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      onClick={isCapturing ? () => setIsCapturing(false) : startCapture}
                      className={`w-full ${
                        isCapturing ? "bg-red-500 hover:bg-red-600" : "bg-cyan-500 hover:bg-cyan-600"
                      } text-white py-4 rounded-xl`}
                    >
                      {isCapturing ? (
                        <>
                          <Square className="h-5 w-5 mr-2" />
                          Stop Recording ({captureTimer}s)
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5 mr-2" />
                          Begin Audio Capture
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <CardHeader className="text-center">
                    <Camera className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <CardTitle className="text-gray-800">Visual Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      onClick={captureVisual}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Capture Visual Evidence
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <CardHeader className="text-center">
                    <Upload className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                    <CardTitle className="text-gray-800">Document Upload</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-xl"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Documents
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,document/*,.pdf,.doc,.docx"
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Attachments Display */}
              {currentCase.attachments && currentCase.attachments.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-500" />
                      Assembled Evidence
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {currentCase.attachments.length} items secured and encrypted
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentCase.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-center">
                            {attachment.type === "audio" && <Mic className="h-6 w-6 text-cyan-500 mr-4" />}
                            {attachment.type === "image" && <Camera className="h-6 w-6 text-green-500 mr-4" />}
                            {attachment.type === "document" && <Upload className="h-6 w-6 text-purple-500 mr-4" />}
                            <div>
                              <span className="text-gray-800 font-medium">{attachment.content}</span>
                              {attachment.secured && (
                                <Badge className="ml-3 bg-green-600 text-white">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Secured
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setCurrentCase((prev) => ({
                                ...prev,
                                attachments: prev.attachments?.filter((_, i) => i !== index),
                              }))
                              updateCaseStrength()
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button
                  onClick={() => setCurrentPhase(1)}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Return to Intake
                </Button>
                <Button
                  onClick={() => setCurrentPhase(3)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 rounded-xl"
                  disabled={!currentCase.summary || currentCase.summary.length < 100}
                >
                  Proceed to Stakeholder Mapping
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {currentPhase === 3 && (
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Users className="h-10 w-10 text-green-500 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Stakeholder Mapping & Verification</h2>
                  <p className="text-gray-600 text-lg">Identify relevant parties and verification sources</p>
                </div>
              </div>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-500" />
                    Stakeholder Registry
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    List all relevant parties including witnesses, supervisors, and other involved individuals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Names, roles, and contact information separated by commas"
                    onChange={(e) => {
                      const stakeholders = e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s)
                      setCurrentCase((prev) => ({ ...prev, stakeholders }))
                      updateCaseStrength()
                    }}
                    className="bg-white/80 border-orange-200"
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  onClick={() => setCurrentPhase(2)}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Return to Evidence
                </Button>
                <Button
                  onClick={() => setCurrentPhase(4)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl"
                >
                  Proceed to Finalization
                  <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {currentPhase === 4 && (
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Award className="h-10 w-10 text-purple-500 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">Case Finalization & Processing</h2>
                  <p className="text-gray-600 text-lg">Review, configure, and archive case file</p>
                </div>
              </div>

              {/* Confidentiality Settings */}
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-500" />
                    Confidentiality Configuration
                  </CardTitle>
                  <CardDescription className="text-gray-600">Access control and privacy settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-center">
                      <Shield className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <Label className="text-gray-800 font-bold text-lg">
                          {currentCase.confidentiality ? "Confidential Processing" : "Standard Processing"}
                        </Label>
                        <p className="text-gray-600">
                          {currentCase.confidentiality
                            ? "Enhanced privacy protection and restricted access"
                            : "Standard organizational processing protocols"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={currentCase.confidentiality}
                      onCheckedChange={(checked) => setCurrentCase((prev) => ({ ...prev, confidentiality: checked }))}
                      className="scale-125"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Deferred Processing */}
              <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                    Processing Schedule
                  </CardTitle>
                  <CardDescription className="text-gray-600">Configure processing timeline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={currentCase.deferredProcessing?.enabled}
                      onCheckedChange={(checked) =>
                        setCurrentCase((prev) => ({
                          ...prev,
                          deferredProcessing: {
                            ...prev.deferredProcessing!,
                            enabled: checked,
                          },
                        }))
                      }
                    />
                    <Label className="text-gray-800 font-medium text-lg">Schedule deferred processing</Label>
                  </div>

                  {currentCase.deferredProcessing?.enabled && (
                    <div className="space-y-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <div>
                        <Label className="text-gray-800 font-medium">Processing Date & Time</Label>
                        <Input
                          type="datetime-local"
                          value={currentCase.deferredProcessing.processDate}
                          onChange={(e) =>
                            setCurrentCase((prev) => ({
                              ...prev,
                              deferredProcessing: {
                                ...prev.deferredProcessing!,
                                processDate: e.target.value,
                              },
                            }))
                          }
                          className="mt-2 bg-white/80 border-purple-200"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-800 font-medium">Deferral Rationale</Label>
                        <Textarea
                          placeholder="Explain the business or strategic rationale for deferred processing"
                          value={currentCase.deferredProcessing.rationale}
                          onChange={(e) =>
                            setCurrentCase((prev) => ({
                              ...prev,
                              deferredProcessing: {
                                ...prev.deferredProcessing!,
                                rationale: e.target.value,
                              },
                            }))
                          }
                          className="mt-2 bg-white/80 border-purple-200"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Case Summary */}
              <Card className="bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
                    Case File Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Classification:</span>
                        <span className="text-gray-800 font-medium">
                          {currentCase.classification || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority Level:</span>
                        <Badge className={getPriorityColor(currentCase.priority || "elevated")}>
                          {currentCase.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Attachments:</span>
                        <span className="text-gray-800 font-medium">{currentCase.attachments?.length || 0}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stakeholders:</span>
                        <span className="text-gray-800 font-medium">{currentCase.stakeholders?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confidentiality:</span>
                        <span className="text-blue-600 font-medium">
                          {currentCase.confidentiality ? "Confidential" : "Standard"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Case Strength:</span>
                        <span className="text-green-600 font-medium">{caseStrength}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  onClick={() => setCurrentPhase(3)}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-xl"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Return to Stakeholders
                </Button>
                <Button
                  onClick={archiveCase}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-3 rounded-xl text-lg font-semibold"
                  disabled={caseStrength < 70}
                >
                  <Save className="h-5 w-5 mr-2" />
                  Archive Case File
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Panel */}
        <div className="w-96 bg-white/80 backdrop-blur-sm border-l border-orange-200 p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-8">Case Analytics</h2>

          {/* Strength Meter */}
          <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-orange-200 mb-8">
            <CardHeader>
              <CardTitle className="text-gray-800 text-lg">Case Development Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-3">{caseStrength}%</div>
                <Progress value={caseStrength} className="h-3 mb-4" />
                <p className="text-gray-600 text-sm">
                  {caseStrength >= 90
                    ? "Exceptional"
                    : caseStrength >= 70
                      ? "Strong"
                      : caseStrength >= 50
                        ? "Adequate"
                        : "Developing"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Metrics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-700 text-sm">Active Session</span>
              </div>
              <Timer className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center">
                <Layers className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700 text-sm">Data Integrity</span>
              </div>
              <span className="text-gray-800 font-bold">Verified</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-700 text-sm">System Health</span>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Recent Cases */}
          {archivedCases.length > 0 && (
            <div className="mt-12">
              <h3 className="text-gray-800 font-bold mb-6">Recent Case Files</h3>
              <div className="space-y-4">
                {archivedCases.slice(-3).map((caseFile) => (
                  <div
                    key={caseFile.id}
                    className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-800 text-sm font-medium">{caseFile.classification}</span>
                      <Badge className={getPriorityColor(caseFile.priority)} size="sm">
                        {caseFile.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-xs">{new Date(caseFile.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Actions */}
          <div className="mt-12">
            <h3 className="text-red-600 font-bold mb-6">Priority Actions</h3>
            <div className="space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-3 rounded-xl">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Expedite Processing
              </Button>
              <Link href="/sos-chat">
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 text-sm py-3 rounded-xl bg-transparent"
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Expert Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
