"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertTriangle, Clock, Mail, Shield, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface EscalationRule {
  id: string
  name: string
  trigger: "inactivity" | "emergency" | "scheduled"
  condition: string
  recipients: string[]
  message: string
  attachments: string[]
  enabled: boolean
}

export default function EscalationSettings() {
  const [rules, setRules] = useState<EscalationRule[]>([
    {
      id: "1",
      name: "Emergency Escalation",
      trigger: "emergency",
      condition: "Manual trigger",
      recipients: ["lawyer@example.com", "hr@company.com"],
      message: "URGENT: This is an emergency escalation of my PoSH complaint case.",
      attachments: ["case-summary", "evidence-package"],
      enabled: true,
    },
    {
      id: "2",
      name: "Inactivity Protection",
      trigger: "inactivity",
      condition: "30 days inactive",
      recipients: ["trusted-contact@example.com"],
      message:
        "This is an automated message. I have been inactive for 30 days. Please find my case documentation attached.",
      attachments: ["full-case-file"],
      enabled: false,
    },
  ])

  const [newRule, setNewRule] = useState<Partial<EscalationRule>>({
    name: "",
    trigger: "inactivity",
    condition: "",
    recipients: [],
    message: "",
    attachments: [],
    enabled: true,
  })

  const [showNewRuleForm, setShowNewRuleForm] = useState(false)

  const addRecipient = (ruleId: string, email: string) => {
    setRules(rules.map((rule) => (rule.id === ruleId ? { ...rule, recipients: [...rule.recipients, email] } : rule)))
  }

  const removeRecipient = (ruleId: string, email: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, recipients: rule.recipients.filter((r) => r !== email) } : rule,
      ),
    )
  }

  const toggleRule = (ruleId: string) => {
    setRules(rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
  }

  const createNewRule = () => {
    if (!newRule.name || !newRule.condition) return

    const rule: EscalationRule = {
      id: Date.now().toString(),
      name: newRule.name,
      trigger: newRule.trigger || "inactivity",
      condition: newRule.condition,
      recipients: newRule.recipients || [],
      message: newRule.message || "",
      attachments: newRule.attachments || [],
      enabled: newRule.enabled || true,
    }

    setRules([...rules, rule])
    setNewRule({})
    setShowNewRuleForm(false)
  }

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "inactivity":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-green-600" />
      default:
        return <Mail className="h-4 w-4 text-gray-600" />
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
            <h1 className="text-3xl font-bold text-gray-900">Escalation Settings</h1>
            <p className="text-gray-600">Configure automatic escalation rules and emergency contacts</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Existing Rules */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Escalation Rules</CardTitle>
                    <CardDescription>Manage your automatic escalation triggers</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewRuleForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <div key={rule.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          {getTriggerIcon(rule.trigger)}
                          <div>
                            <h4 className="font-medium text-gray-900">{rule.name}</h4>
                            <p className="text-sm text-gray-600">{rule.condition}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                          <Button variant="ghost" size="sm" onClick={() => deleteRule(rule.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-gray-500">RECIPIENTS</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rule.recipients.map((email) => (
                              <Badge key={email} variant="secondary" className="text-xs">
                                {email}
                                <button
                                  onClick={() => removeRecipient(rule.id, email)}
                                  className="ml-1 text-gray-500 hover:text-red-600"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500">MESSAGE PREVIEW</Label>
                          <p className="text-sm text-gray-700 mt-1 p-2 bg-gray-50 rounded">
                            {rule.message.substring(0, 100)}...
                          </p>
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500">ATTACHMENTS</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rule.attachments.map((attachment) => (
                              <Badge key={attachment} variant="outline" className="text-xs">
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* New Rule Form */}
            {showNewRuleForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Escalation Rule</CardTitle>
                  <CardDescription>Set up a new automatic escalation trigger</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input
                        id="rule-name"
                        placeholder="e.g., Weekly Check-in"
                        value={newRule.name || ""}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="trigger-type">Trigger Type</Label>
                      <Select
                        value={newRule.trigger}
                        onValueChange={(value) => setNewRule({ ...newRule, trigger: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select trigger" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inactivity">Inactivity</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Input
                      id="condition"
                      placeholder="e.g., 7 days inactive, Every Monday, Manual trigger"
                      value={newRule.condition || ""}
                      onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Escalation Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Message to be sent when this rule triggers..."
                      value={newRule.message || ""}
                      onChange={(e) => setNewRule({ ...newRule, message: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={createNewRule}>Create Rule</Button>
                    <Button variant="outline" onClick={() => setShowNewRuleForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      All escalation rules are encrypted and stored securely. Recipients will only receive information
                      you explicitly authorize.
                    </p>
                    <p className="text-xs text-gray-500">Last security audit: 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                      <span className="font-medium text-red-800">Emergency Hotline</span>
                    </div>
                    <p className="text-sm text-red-700">1-800-HELP-NOW</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Mail className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Legal Aid</span>
                    </div>
                    <p className="text-sm text-blue-700">legal-aid@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rule Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Rules</span>
                    <span className="font-medium">{rules.filter((r) => r.enabled).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Recipients</span>
                    <span className="font-medium">{new Set(rules.flatMap((r) => r.recipients)).size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Triggered</span>
                    <span className="font-medium">Never</span>
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
