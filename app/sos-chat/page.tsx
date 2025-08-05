"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Heart,
  AlertTriangle,
  Phone,
  Users,
  FileText,
  Shield,
  Bot,
  User,
  Globe,
  Mic,
  MicOff,
} from "lucide-react"
import Link from "next/link"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: string
  language: string
  category?: "emotional" | "legal" | "emergency" | "resource"
}

export default function SOSChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello, I'm here to support you. You're in a safe space. How are you feeling right now? I can help with emotional support, legal guidance, or connect you with resources.",
      timestamp: new Date().toISOString(),
      language: "en",
      category: "emotional",
    },
  ])

  const [currentMessage, setCurrentMessage] = useState("")
  const [language, setLanguage] = useState("en")
  const [isListening, setIsListening] = useState(false)
  const [chatMode, setChatMode] = useState<"support" | "legal" | "emergency">("support")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const languages = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    ta: "தமிழ்",
    te: "తెలుగు",
    mr: "मराठी",
    gu: "ગુજરાતી",
    kn: "ಕನ್ನಡ",
    ml: "മലയാളം",
    pa: "ਪੰਜਾਬੀ",
  }

  const supportResponses = {
    en: {
      emotional: [
        "I understand this is difficult. Your feelings are completely valid. Would you like to talk about what happened?",
        "You're being incredibly brave by reaching out. Take your time - there's no pressure here.",
        "It's normal to feel overwhelmed. You're not alone in this. What kind of support would help you most right now?",
      ],
      legal: [
        "I can help you understand your legal rights. Under the PoSH Act 2013, you have the right to file a complaint within 3 months of the incident.",
        "You have the right to a fair investigation, interim relief, and protection from retaliation. Would you like me to explain the complaint process?",
        "Legal aid is available. I can connect you with women's rights lawyers who specialize in workplace harassment cases.",
      ],
      resources: [
        "I can connect you with local NGOs, counseling services, and legal aid organizations. What type of support are you looking for?",
        "There are confidential helplines available 24/7. Would you like me to share some contact information?",
        "Support groups with other survivors can be very helpful. I can help you find safe, moderated groups in your area.",
      ],
    },
    hi: {
      emotional: [
        "मैं समझ सकता हूं कि यह कितना कठिन है। आपकी भावनाएं पूरी तरह से वैध हैं। क्या आप बताना चाहेंगी कि क्या हुआ था?",
        "आप बहुत साहसी हैं कि आपने मदद मांगी है। अपना समय लें - यहां कोई दबाव नहीं है।",
        "परेशान महसूस करना सामान्य है। आप इसमें अकेली नहीं हैं। अभी आपको किस तरह की सहायता की सबसे ज्यादा जरूरत है?",
      ],
      legal: [
        "मैं आपको आपके कानूनी अधिकारों को समझने में मदद कर सकता हूं। PoSH अधिनियम 2013 के तहत, आपको घटना के 3 महीने के भीतर शिकायत दर्ज करने का अधिकार है।",
        "आपको निष्पक्ष जांच, अंतरिम राहत और प्रतिशोध से सुरक्षा का अधिकार है। क्या आप चाहेंगी कि मैं शिकायत की प्रक्रिया समझाऊं?",
        "कानूनी सहायता उपलब्ध है। मैं आपको महिला अधिकार वकीलों से जोड़ सकता हूं जो कार्यक्षेत्र उत्पीड़न के मामलों में विशेषज्ञ हैं।",
      ],
      resources: [
        "मैं आपको स्थानीय NGOs, परामर्श सेवाओं और कानूनी सहायता संगठनों से जोड़ सकता हूं। आप किस प्रकार की सहायता की तलाश में हैं?",
        "24/7 गोपनीय हेल्पलाइन उपलब्ध हैं। क्या आप चाहेंगी कि मैं कुछ संपर्क जानकारी साझा करूं?",
        "अन्य बचे लोगों के साथ सहायता समूह बहुत सहायक हो सकते हैं। मैं आपको आपके क्षेत्र में सुरक्षित, नियंत्रित समूह खोजने में मदद कर सकता हूं।",
      ],
    },
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toISOString(),
      language,
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const responses = supportResponses[language as keyof typeof supportResponses] || supportResponses.en
      const categoryResponses =
        responses[chatMode === "support" ? "emotional" : chatMode === "legal" ? "legal" : "resources"]
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: randomResponse,
        timestamp: new Date().toISOString(),
        language,
        category: chatMode === "support" ? "emotional" : chatMode === "legal" ? "legal" : "resource",
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setCurrentMessage("")
  }

  const startVoiceInput = () => {
    setIsListening(true)
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false)
      setCurrentMessage("I need help with a workplace harassment situation")
    }, 3000)
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "emotional":
        return "bg-pink-100 text-pink-800"
      case "legal":
        return "bg-blue-100 text-blue-800"
      case "emergency":
        return "bg-red-100 text-red-800"
      case "resource":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SOS Support Chat</h1>
              <p className="text-gray-600">24/7 empathetic AI support in your language</p>
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
          </div>
        </div>

        {/* Chat Mode Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={chatMode === "support" ? "default" : "outline"}
                onClick={() => setChatMode("support")}
                className="flex items-center"
              >
                <Heart className="h-4 w-4 mr-2" />
                Emotional Support
              </Button>
              <Button
                variant={chatMode === "legal" ? "default" : "outline"}
                onClick={() => setChatMode("legal")}
                className="flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Legal Guidance
              </Button>
              <Button
                variant={chatMode === "emergency" ? "default" : "outline"}
                onClick={() => setChatMode("emergency")}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Help
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 text-pink-600 mr-2" />
                  Safe Chat Space
                </CardTitle>
                <CardDescription>This conversation is private and secure. You can speak freely.</CardDescription>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "bot" && <Bot className="h-4 w-4 mt-0.5 text-pink-600" />}
                        {message.type === "user" && <User className="h-4 w-4 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                            {message.category && (
                              <Badge className={getCategoryColor(message.category)}>{message.category}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type your message here... You're safe."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startVoiceInput}
                    className={isListening ? "bg-red-50 border-red-200" : ""}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={sendMessage} className="bg-pink-600 hover:bg-pink-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {isListening && (
                  <p className="text-sm text-red-600 mt-2 flex items-center">
                    <Mic className="h-4 w-4 mr-1" />
                    Listening... Speak now
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Helpline
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Find Local NGO
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Legal Resources
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Counseling Services
                </Button>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">Crisis Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-red-900">National Helpline</p>
                  <p className="text-red-700">1800-123-4567 (24/7)</p>
                </div>
                <div>
                  <p className="font-medium text-red-900">Women's Helpline</p>
                  <p className="text-red-700">181 (24/7)</p>
                </div>
                <div>
                  <p className="font-medium text-red-900">Police Emergency</p>
                  <p className="text-red-700">100</p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-700">
                <ul className="space-y-1">
                  <li>• This chat is encrypted</li>
                  <li>• No personal data is stored</li>
                  <li>• You can delete this conversation anytime</li>
                  <li>• We never share your information</li>
                </ul>
              </CardContent>
            </Card>

            {/* Support Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">You're Not Alone</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <div className="space-y-2">
                  <p>• 1000+ women helped this month</p>
                  <p>• 24/7 support available</p>
                  <p>• 15+ languages supported</p>
                  <p>• 95% find our support helpful</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
