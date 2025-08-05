"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
=======
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Send,
  Phone,
<<<<<<< HEAD
  AlertTriangle,
  Shield,
  MessageCircle,
  User,
  Bot,
  Headphones,
  Clock,
  Globe,
  UserCheck,
  Zap,
  Brain,
  Scale,
  Heart,
=======
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
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai" | "expert"
  timestamp: Date
  type?: "text" | "emergency" | "escalation"
}

<<<<<<< HEAD
export default function SOSChatPage() {
=======
export default function SOSChat() {
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
<<<<<<< HEAD
        "Hello! I'm your WorkGuardian AI assistant. I'm here to provide immediate support and guidance. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
=======
        "Hello! I'm your AI support assistant. I'm here to provide immediate help and guidance. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
<<<<<<< HEAD
  const [chatMode, setChatMode] = useState<"anonymous" | "verified">("anonymous")
  const [supportType, setSupportType] = useState("general")
  const [language, setLanguage] = useState("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

=======
  const [chatMode, setChatMode] = useState<"support" | "legal" | "emergency">("support")
  const [userMode, setUserMode] = useState<"anonymous" | "verified">("anonymous")
  const [language, setLanguage] = useState("en")
  const messagesEndRef = useRef<HTMLDivElement>(null)

>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  useEffect(() => {
    // Check user mode from localStorage
    const storedMode = localStorage.getItem("userMode") as "anonymous" | "verified" | null
    if (storedMode) {
<<<<<<< HEAD
      setChatMode(storedMode)
    }
  }, [])

=======
      setUserMode(storedMode)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
<<<<<<< HEAD
      type: "text",
=======
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
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
<<<<<<< HEAD
          supportType,
=======
          userMode,
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
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
<<<<<<< HEAD
        type: "text",
=======
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
<<<<<<< HEAD
          "I'm sorry, I'm experiencing technical difficulties. If this is an emergency, please call emergency services immediately.",
        sender: "ai",
        timestamp: new Date(),
        type: "text",
=======
          "I'm sorry, I'm experiencing technical difficulties. If this is an emergency, please call emergency services immediately at 100 or 181.",
        sender: "ai",
        timestamp: new Date(),
        type: "emergency",
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
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
<<<<<<< HEAD
      content:
        "I'm connecting you with a human expert who specializes in workplace incidents. Please hold while I transfer your conversation.",
=======
      content: "I'm connecting you with a human expert. Please hold while I transfer your conversation...",
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
      sender: "ai",
      timestamp: new Date(),
      type: "escalation",
    }
    setMessages((prev) => [...prev, escalationMessage])

<<<<<<< HEAD
    // Simulate expert connection
=======
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
    setTimeout(() => {
      const expertMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
<<<<<<< HEAD
          "Hello, I'm Sarah, a certified workplace counselor. I've reviewed your conversation and I'm here to provide specialized support. How can I help you today?",
        sender: "expert",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, expertMessage])
    }, 3000)
  }

=======
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

>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  const languages = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    ta: "தமிழ்",
    te: "తెలుగు",
    mr: "मराठी",
<<<<<<< HEAD
    gu: "ગુજરાતી",
    kn: "ಕನ್ನಡ",
    ml: "മലയാളം",
    pa: "ਪੰਜਾਬੀ",
  }

  const supportTypes = {
    general: { label: "General Support", icon: MessageCircle, color: "bg-blue-500" },
    legal: { label: "Legal Consultation", icon: Scale, color: "bg-purple-500" },
    crisis: { label: "Emergency Crisis", icon: AlertTriangle, color: "bg-red-500" },
    counseling: { label: "Emotional Support", icon: Heart, color: "bg-green-500" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white/90 backdrop-blur-xl shadow-lg border-b border-red-200">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SOS Support Chat</h1>
            <p className="text-gray-600">24/7 AI-powered crisis intervention and expert support</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <Globe className="h-4 w-4 mr-2" />
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

          <Badge variant={chatMode === "verified" ? "default" : "secondary"} className="px-3 py-1">
            {chatMode === "verified" ? (
              <>
                <UserCheck className="h-4 w-4 mr-1" />
                Verified Mode
              </>
            ) : (
              <>
                <User className="h-4 w-4 mr-1" />
                Anonymous Mode
              </>
            )}
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Support Type Selector */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-xl shadow-xl border border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg">Support Type</CardTitle>
                <CardDescription>Choose the type of assistance you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(supportTypes).map(([key, type]) => (
                  <Button
                    key={key}
                    variant={supportType === key ? "default" : "outline"}
                    className={`w-full justify-start ${supportType === key ? `${type.color} text-white` : ""}`}
                    onClick={() => setSupportType(key)}
                  >
                    <type.icon className="h-4 w-4 mr-2" />
                    {type.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-red-50 border-red-200 mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">Emergency Services</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-1" />
                    100
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">Women's Helpline</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-1" />
                    181
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">Crisis Counseling</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Phone className="h-4 w-4 mr-1" />
                    1860
                  </Button>
                </div>
=======
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
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
              </CardContent>
            </Card>

            {/* AI Capabilities */}
<<<<<<< HEAD
            <Card className="bg-blue-50 border-blue-200 mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
=======
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-purple-500" />
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>Instant crisis assessment</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>Safety planning guidance</span>
                  </div>
                  <div className="flex items-center">
                    <Scale className="h-4 w-4 mr-2" />
                    <span>Legal resource recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Emotional support techniques</span>
                  </div>
                  {chatMode === "verified" && (
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-2" />
                      <span>Personalized case tracking</span>
                    </div>
=======
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
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
                  )}
                </div>
              </CardContent>
            </Card>
<<<<<<< HEAD
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-white/90 backdrop-blur-xl shadow-xl border border-orange-200 h-[700px] flex flex-col">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-orange-600 mr-2" />
                      Live Support Chat
                    </CardTitle>
                    <CardDescription>
                      {chatMode === "verified"
                        ? "Enhanced AI support with personalized assistance"
                        : "Anonymous AI support - upgrade for full features"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm">Online</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={escalateToExpert}
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      <Headphones className="h-4 w-4 mr-1" />
                      Expert Help
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.sender === "user"
                          ? "bg-orange-500 text-white"
                          : message.sender === "expert"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.sender === "ai" && <Bot className="h-4 w-4 mr-2 text-blue-600" />}
                        {message.sender === "expert" && <Headphones className="h-4 w-4 mr-2 text-green-600" />}
                        {message.sender === "user" && <User className="h-4 w-4 mr-2" />}
                        <span className="text-xs opacity-70">
                          {message.sender === "ai"
                            ? "AI Assistant"
                            : message.sender === "expert"
                              ? "Human Expert"
                              : "You"}
                        </span>
                        <span className="text-xs opacity-50 ml-2">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.type === "escalation" && (
                        <div className="mt-2 flex items-center text-xs opacity-70">
                          <Clock className="h-3 w-3 mr-1" />
                          Connecting to expert...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-blue-600" />
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
              </CardContent>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... (Press Enter to send)"
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {chatMode === "anonymous"
                    ? "Anonymous mode - limited features. Sign in for personalized support."
                    : "Verified mode - full AI capabilities and expert escalation available."}
                </p>
              </div>
            </Card>
=======

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
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
          </div>
        </div>
      </div>
    </div>
  )
}
