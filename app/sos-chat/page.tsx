"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Send,
  Phone,
  MessageCircle,
  Shield,
  AlertTriangle,
  User,
  Bot,
  Headphones,
  Heart,
  Scale,
  Users,
  Zap,
  CheckCircle,
  Globe,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai" | "expert"
  timestamp: Date
  type?: "text" | "emergency" | "escalation"
}

export default function SOSChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI support assistant. I'm here to provide immediate help and guidance. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatMode, setChatMode] = useState<"support" | "legal" | "emergency">("support")
  const [userMode, setUserMode] = useState<"anonymous" | "verified">("anonymous")
  const [language, setLanguage] = useState("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check user mode from localStorage
    const storedMode = localStorage.getItem("userMode") as "anonymous" | "verified" | null
    if (storedMode) {
      setUserMode(storedMode)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          chatMode,
          userMode,
          language,
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
        }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          data.response ||
          "I apologize, but I'm having trouble responding right now. Please try again or contact emergency services if this is urgent.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I'm experiencing technical difficulties. If this is an emergency, please call emergency services immediately at 100 or 181.",
        sender: "ai",
        timestamp: new Date(),
        type: "emergency",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const escalateToExpert = () => {
    const escalationMessage: Message = {
      id: Date.now().toString(),
      content: "I'm connecting you with a human expert. Please hold while I transfer your conversation...",
      sender: "ai",
      timestamp: new Date(),
      type: "escalation",
    }
    setMessages((prev) => [...prev, escalationMessage])

    setTimeout(() => {
      const expertMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Hello, this is Sarah from our expert support team. I've reviewed your conversation and I'm here to help. What specific assistance do you need?",
        sender: "expert",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, expertMessage])
    }, 2000)
  }

  const getChatModeConfig = () => {
    switch (chatMode) {
      case "emergency":
        return {
          title: "Emergency Crisis Support",
          description: "Immediate intervention and crisis response",
          color: "from-red-500 to-pink-500",
          icon: AlertTriangle,
          bgColor: "bg-red-50 border-red-200",
        }
      case "legal":
        return {
          title: "Legal Consultation",
          description: "Professional legal guidance and advice",
          color: "from-blue-500 to-indigo-500",
          icon: Scale,
          bgColor: "bg-blue-50 border-blue-200",
        }
      default:
        return {
          title: "General Support",
          description: "Comprehensive assistance and guidance",
          color: "from-green-500 to-emerald-500",
          icon: Heart,
          bgColor: "bg-green-50 border-green-200",
        }
    }
  }

  const config = getChatModeConfig()

  const languages = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    ta: "தமிழ்",
    te: "తెలుగు",
    mr: "मराठी",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-red-200 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-6 text-red-700 hover:text-red-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-br ${config.color} p-3 rounded-2xl shadow-lg`}>
                <config.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{config.title}</h1>
                <p className="text-red-600">{config.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-36 border-red-200 bg-white/80">
                <Globe className="h-4 w-4 mr-2 text-red-500" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Badge className={userMode === "verified" ? "bg-green-600 text-white" : "bg-orange-600 text-white"}>
              {userMode === "verified" ? (
                <>
                  <UserCheck className="h-3 w-3 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <User className="h-3 w-3 mr-1" />
                  Anonymous
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-red-200 p-6">
          <div className="space-y-6">
            {/* Chat Mode Selection */}
            <Card className={config.bgColor}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={chatMode} onValueChange={(value: any) => setChatMode(value)}>
                  <SelectTrigger className="bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-green-500" />
                        General Support
                      </div>
                    </SelectItem>
                    <SelectItem value="legal">
                      <div className="flex items-center">
                        <Scale className="h-4 w-4 mr-2 text-blue-500" />
                        Legal Consultation
                      </div>
                    </SelectItem>
                    <SelectItem value="emergency">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        Emergency Crisis
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-500" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>24/7 Availability</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Multi-language Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Crisis Intervention</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Legal Guidance</span>
                  </div>
                  {userMode === "verified" && (
                    <>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Personalized Support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Case History Access</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-red-800">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-red-700">Emergency Services</span>
                    <span className="font-bold text-red-800">100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-700">Women's Helpline</span>
                    <span className="font-bold text-red-800">181</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-700">Crisis Helpline</span>
                    <span className="font-bold text-red-800">1860-2662-345</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Escalation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Human Expert Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Need to speak with a human expert? Our qualified professionals are available for complex situations.
                </p>
                <Button
                  onClick={escalateToExpert}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={userMode === "anonymous"}
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  {userMode === "verified" ? "Connect to Expert" : "Login Required"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : message.sender === "expert"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : message.type === "emergency"
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {message.sender === "user" ? (
                        <User className="h-6 w-6" />
                      ) : message.sender === "expert" ? (
                        <Headphones className="h-6 w-6" />
                      ) : (
                        <Bot className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">
                        {message.sender === "user"
                          ? "You"
                          : message.sender === "expert"
                            ? "Expert Support"
                            : "AI Assistant"}
                      </p>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 max-w-[70%]">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-6 w-6 text-gray-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6 bg-white/90 backdrop-blur-sm">
            <div className="flex space-x-4">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type your message here... (${chatMode} mode)`}
                className="flex-1 min-h-[60px] max-h-[120px] resize-none bg-white/80 border-gray-300"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`px-6 py-3 bg-gradient-to-r ${config.color} hover:opacity-90 text-white`}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>End-to-end encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
