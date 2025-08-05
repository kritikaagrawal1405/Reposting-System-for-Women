"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Lock,
  Shield,
  Eye,
  Download,
  Share,
  Trash2,
  Clock,
  FileText,
  Mic,
  Camera,
  Upload,
  Key,
  Users,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface EvidenceItem {
  id: string
  name: string
  type: "document" | "audio" | "image" | "video" | "text"
  size: string
  uploadDate: string
  encrypted: boolean
  accessLevel: "private" | "shared" | "public"
  sharedWith: string[]
  expiryDate?: string
  tags: string[]
}

interface AccessRequest {
  id: string
  requester: string
  organization: string
  purpose: string
  requestDate: string
  status: "pending" | "approved" | "denied"
  expiryDate?: string
}

export default function EvidenceVault() {
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([
    {
      id: "1",
      name: "Incident Report - March 15",
      type: "document",
      size: "2.3 MB",
      uploadDate: "2024-03-15",
      encrypted: true,
      accessLevel: "private",
      sharedWith: [],
      tags: ["harassment", "workplace", "formal"],
    },
    {
      id: "2",
      name: "Audio Recording - Inappropriate Comments",
      type: "audio",
      size: "5.1 MB",
      uploadDate: "2024-03-14",
      encrypted: true,
      accessLevel: "shared",
      sharedWith: ["legal-aid@ngo.org"],
      expiryDate: "2024-04-14",
      tags: ["verbal", "evidence", "audio"],
    },
    {
      id: "3",
      name: "Screenshot - Inappropriate Messages",
      type: "image",
      size: "1.8 MB",
      uploadDate: "2024-03-13",
      encrypted: true,
      accessLevel: "private",
      sharedWith: [],
      tags: ["digital", "messages", "screenshot"],
    },
  ])

  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([
    {
      id: "1",
      requester: "Legal Aid Society",
      organization: "Women's Rights NGO",
      purpose: "Legal consultation and case preparation",
      requestDate: "2024-03-16",
      status: "pending",
    },
  ])

  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [shareEmail, setShareEmail] = useState("")
  const [shareExpiry, setShareExpiry] = useState("")

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      case "image":
        return <Camera className="h-4 w-4" />
      case "video":
        return <Camera className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "private":
        return "bg-red-100 text-red-800"
      case "shared":
        return "bg-yellow-100 text-yellow-800"
      case "public":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const shareEvidence = () => {
    if (!shareEmail || selectedItems.length === 0) return

    setEvidenceItems((items) =>
      items.map((item) =>
        selectedItems.includes(item.id)
          ? {
              ...item,
              accessLevel: "shared" as const,
              sharedWith: [...item.sharedWith, shareEmail],
              expiryDate: shareExpiry || undefined,
            }
          : item,
      ),
    )

    setSelectedItems([])
    setShareEmail("")
    setShareExpiry("")
  }

  const approveAccessRequest = (requestId: string) => {
    setAccessRequests((requests) =>
      requests.map((request) =>
        request.id === requestId ? { ...request, status: "approved" as const, expiryDate: "2024-04-30" } : request,
      ),
    )
  }

  const denyAccessRequest = (requestId: string) => {
    setAccessRequests((requests) =>
      requests.map((request) => (request.id === requestId ? { ...request, status: "denied" as const } : request)),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
            <h1 className="text-3xl font-bold text-gray-900">Evidence Vault</h1>
            <p className="text-gray-600">Secure, encrypted storage for your evidence</p>
          </div>
        </div>

        {/* Security Status */}
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-900">Vault Security Status</h3>
                  <p className="text-sm text-green-700">All evidence encrypted with AES-256 encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  <Lock className="h-3 w-3 mr-1" />
                  Encrypted
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">
                  <Key className="h-3 w-3 mr-1" />
                  Access Controlled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Evidence List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Evidence Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Evidence</CardTitle>
                    <CardDescription>Securely stored and encrypted evidence files</CardDescription>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evidenceItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, item.id])
                              } else {
                                setSelectedItems(selectedItems.filter((id) => id !== item.id))
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="mt-1">{getTypeIcon(item.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <span>{item.size}</span>
                              <span>Uploaded: {new Date(item.uploadDate).toLocaleDateString()}</span>
                              {item.expiryDate && (
                                <span className="text-orange-600">
                                  Expires: {new Date(item.expiryDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            {item.sharedWith.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">Shared with:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {item.sharedWith.map((email) => (
                                    <Badge key={email} variant="secondary" className="text-xs">
                                      {email}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getAccessLevelColor(item.accessLevel)}>{item.accessLevel}</Badge>
                          {item.encrypted && (
                            <Badge variant="secondary">
                              <Lock className="h-3 w-3 mr-1" />
                              Encrypted
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share Evidence */}
            {selectedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Share className="h-5 w-5 text-blue-600 mr-2" />
                    Share Selected Evidence
                  </CardTitle>
                  <CardDescription>Grant controlled access to {selectedItems.length} selected item(s)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="share-email">Recipient Email</Label>
                    <Input
                      id="share-email"
                      type="email"
                      placeholder="legal-aid@ngo.org"
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="share-expiry">Access Expiry (Optional)</Label>
                    <Input
                      id="share-expiry"
                      type="date"
                      value={shareExpiry}
                      onChange={(e) => setShareExpiry(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={shareEvidence} className="bg-blue-600 hover:bg-blue-700">
                      <Share className="h-4 w-4 mr-2" />
                      Grant Access
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedItems([])}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Access Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-orange-600 mr-2" />
                  Access Requests
                </CardTitle>
                <CardDescription>Organizations requesting access to your evidence</CardDescription>
              </CardHeader>
              <CardContent>
                {accessRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No access requests</p>
                ) : (
                  <div className="space-y-4">
                    {accessRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{request.requester}</h4>
                            <p className="text-sm text-gray-600">{request.organization}</p>
                            <p className="text-sm text-gray-700 mt-1">{request.purpose}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              Requested: {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {request.status}
                            </Badge>
                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => approveAccessRequest(request.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => denyAccessRequest(request.id)}
                                  className="border-red-300 text-red-700"
                                >
                                  Deny
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vault Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vault Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Items</span>
                    <span className="font-medium">{evidenceItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Encrypted Items</span>
                    <span className="font-medium">{evidenceItems.filter((i) => i.encrypted).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shared Items</span>
                    <span className="font-medium">
                      {evidenceItems.filter((i) => i.accessLevel === "shared").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="font-medium">9.2 MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Key className="h-4 w-4 mr-2" />
                  Change Master Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Access Logs
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Evidence
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Share className="h-4 w-4 mr-2" />
                  Create Share Link
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Auto-Share
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Actions */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">Emergency Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Share All
                </Button>
                <Button variant="outline" className="w-full border-red-300 text-red-700 bg-transparent" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Emergency Delete All
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
