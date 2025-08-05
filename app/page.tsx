"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  FileText,
  Lock,
  Users,
  Globe,
  Star,
  CheckCircle,
  Phone,
  Headphones,
  BookOpen,
  Compass,
  Lightbulb,
  Briefcase,
  Award,
  TrendingUp,
  Clock,
  User,
  UserCheck,
  LogOut,
  Database,
  BarChart3,
  MessageCircle,
  Network,
  Zap,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [language, setLanguage] = useState("en")
  const [userMode, setUserMode] = useState<"anonymous" | "verified">("anonymous")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Check user mode from localStorage
    const storedMode = localStorage.getItem("userMode") as "anonymous" | "verified" | null
    const storedEmail = localStorage.getItem("userEmail") || ""

    if (storedMode) {
      setUserMode(storedMode)
      setUserEmail(storedEmail)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("userMode")
    localStorage.removeItem("userEmail")
    setUserMode("anonymous")
    setUserEmail("")
  }

  const toggleUserMode = () => {
    if (userMode === "anonymous") {
      // Redirect to login for verification
      window.location.href = "/login"
    } else {
      // Switch to anonymous mode
      localStorage.setItem("userMode", "anonymous")
      setUserMode("anonymous")
    }
  }

  const languages = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    ta: "தமিழ்",
    te: "తెলুগু",
    mr: "मराठी",
    gu: "ગુજરાતી",
    kn: "ಕನ್ನಡ",
    ml: "മലയാളം",
    pa: "ਪੰਜਾਬੀ",
  }

  const mainFeatures = [
    {
      title: "Case Builder",
      description: "Professional incident documentation and case management system",
      icon: FileText,
      href: "/incident-logger",
      color: "from-indigo-400 to-blue-500",
      bgColor: "border-indigo-200",
      available: true,
    },
    {
      title: "Timeline Manager",
      description: "Chronological incident tracking and timeline visualization",
      icon: Clock,
      href: userMode === "verified" ? "/timeline" : "/login",
      color: "from-emerald-400 to-green-500",
      bgColor: "border-emerald-200",
      available: userMode === "verified",
    },
    {
      title: "Knowledge Base",
      description: "Comprehensive legal resources and procedural guidance",
      icon: BookOpen,
      href: "/resources",
      color: "from-blue-400 to-indigo-500",
      bgColor: "border-blue-200",
      available: true,
    },
    {
      title: "Smart Advisor",
      description: "AI-powered guidance and intelligent recommendations",
      icon: Lightbulb,
      href: "/ai-assistant",
      color: "from-green-400 to-emerald-500",
      bgColor: "border-green-200",
      available: true,
    },
    {
      title: "Secure Vault",
      description: "Enterprise-grade encrypted evidence storage",
      icon: Lock,
      href: userMode === "verified" ? "/evidence-vault" : "/login",
      color: "from-purple-400 to-pink-500",
      bgColor: "border-purple-200",
      available: userMode === "verified",
    },
    {
      title: "Analytics Suite",
      description: "Advanced reporting and trend analysis tools",
      icon: TrendingUp,
      href: userMode === "verified" ? "/analytics" : "/login",
      color: "from-yellow-400 to-orange-500",
      bgColor: "border-yellow-200",
      available: userMode === "verified",
    },
    {
      title: "Expert Support",
      description: "24/7 professional consultation and crisis intervention",
      icon: Headphones,
      href: "/sos-chat",
      color: "from-red-400 to-pink-500",
      bgColor: "border-red-200",
      available: true,
    },
    {
      title: "Expert Network",
      description: "Connect with verified legal and counseling professionals",
      icon: Users,
      href: userMode === "verified" ? "/support-network" : "/login",
      color: "from-teal-400 to-cyan-500",
      bgColor: "border-teal-200",
      available: userMode === "verified",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Floating Header */}
      <div className="fixed top-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200 z-50">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl shadow-lg">
              <Compass className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                WorkGuardian
              </h1>
              <p className="text-orange-600 text-sm font-medium">Professional Incident Navigator</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-36 border-orange-200 bg-white/80">
                <Globe className="h-4 w-4 mr-2 text-orange-500" />
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

            <Button
              variant={userMode === "verified" ? "default" : "outline"}
              onClick={toggleUserMode}
              className={`${
                userMode === "verified"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  : "border-orange-300 text-orange-700 hover:bg-orange-50"
              }`}
            >
              {userMode === "verified" ? (
                <>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Verified Mode
                </>
              ) : (
                <>
                  <User className="h-4 w-4 mr-2" />
                  Anonymous Mode
                </>
              )}
            </Button>

            {userMode === "verified" && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {userEmail.split("@")[0]}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}

            {userMode === "anonymous" && (
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-20 px-8">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-full mb-8 shadow-lg">
            <Award className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-orange-800 font-semibold">Trusted by 25,000+ Organizations</span>
          </div>

          <h1 className="text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">Navigate</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Workplace Justice
            </span>
          </h1>

          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Professional-grade incident management platform with intelligent guidance, comprehensive documentation
            tools, and expert-level legal support systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/incident-logger">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                Launch Navigator
                <Compass className="h-6 w-6 ml-3" />
              </Button>
            </Link>
            <Link href="/sos-chat">
              <Button
                variant="outline"
                className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-12 py-6 text-xl rounded-2xl bg-white/80 backdrop-blur-sm"
              >
                Expert Consultation
                <Briefcase className="h-6 w-6 ml-3" />
              </Button>
            </Link>
          </div>

          {/* User Mode Indicator */}
          <div className="flex justify-center mb-16">
            <div
              className={`px-6 py-3 rounded-full border-2 ${
                userMode === "verified"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-orange-50 border-orange-200 text-orange-800"
              }`}
            >
              {userMode === "verified" ? (
                <div className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  <span className="font-medium">Verified Account - Full Access</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-medium">Anonymous Mode - Limited Features</span>
                </div>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-12 text-lg text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center">
              <Lock className="h-6 w-6 text-green-500 mr-3" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-green-500 mr-3" />
              <span>Legal Compliance</span>
            </div>
            <div className="flex items-center">
              <Star className="h-6 w-6 text-green-500 mr-3" />
              <span>99.9% Uptime SLA</span>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Grid */}
        <div className="max-w-7xl mx-auto px-8 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Platform Overview</h2>
            <p className="text-xl text-gray-600">All tools and features at your fingertips</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card
                key={index}
                className={`bg-white/90 backdrop-blur-xl shadow-2xl ${feature.bgColor} hover:scale-105 transition-all duration-300 relative overflow-hidden`}
              >
                {!feature.available && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Login Required
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div
                    className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 min-h-[48px]">{feature.description}</CardDescription>
                  <Link href={feature.href}>
                    <Button
                      className={`w-full ${
                        feature.available
                          ? `bg-gradient-to-r ${feature.color} hover:opacity-90`
                          : "bg-gray-400 hover:bg-gray-500"
                      } text-white rounded-xl`}
                      disabled={!feature.available}
                    >
                      {feature.available ? (
                        <>
                          Launch Tool
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Sign In Required
                          <Lock className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Access Dashboard */}
        <div className="max-w-7xl mx-auto px-8 mb-20">
          <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold text-white mb-4">Professional Command Center</CardTitle>
              <CardDescription className="text-xl text-gray-300">
                Advanced tools for workplace incident management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-6">
                <Link href="/incident-logger">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto w-full">
                    <FileText className="h-10 w-10" />
                    <span className="text-sm font-medium">New Case</span>
                  </Button>
                </Link>
                <Link href={userMode === "verified" ? "/timeline" : "/login"}>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto w-full">
                    <Clock className="h-10 w-10" />
                    <span className="text-sm font-medium">Timeline</span>
                  </Button>
                </Link>
                <Link href={userMode === "verified" ? "/evidence-vault" : "/login"}>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto w-full">
                    <Database className="h-10 w-10" />
                    <span className="text-sm font-medium">Evidence</span>
                  </Button>
                </Link>
                <Link href={userMode === "verified" ? "/analytics" : "/login"}>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto w-full">
                    <BarChart3 className="h-10 w-10" />
                    <span className="text-sm font-medium">Analytics</span>
                  </Button>
                </Link>
                <Link href="/sos-chat">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto w-full">
                    <MessageCircle className="h-10 w-10" />
                    <span className="text-sm font-medium">SOS Chat</span>
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto w-full">
                    <BookOpen className="h-10 w-10" />
                    <span className="text-sm font-medium">Resources</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="max-w-7xl mx-auto px-8 mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200">
              <CardHeader>
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-blue-600 mr-3" />
                  <CardTitle className="text-blue-800">AI-Powered Intelligence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-4">
                  Advanced AI assistance for case analysis, evidence evaluation, and strategic recommendations.
                </p>
                <Link href="/ai-assistant">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Explore AI Features
                    <Play className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-green-600 mr-3" />
                  <CardTitle className="text-green-800">Enterprise Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Bank-grade encryption, compliance certifications, and secure evidence management.
                </p>
                <Link href={userMode === "verified" ? "/evidence-vault" : "/login"}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Security Features
                    <Shield className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
              <CardHeader>
                <div className="flex items-center">
                  <Network className="h-8 w-8 text-purple-600 mr-3" />
                  <CardTitle className="text-purple-800">Expert Network</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">
                  Connect with verified legal professionals, counselors, and workplace specialists.
                </p>
                <Link href={userMode === "verified" ? "/support-network" : "/login"}>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Find Experts
                    <Users className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Strip */}
        <div className="max-w-6xl mx-auto px-8 mt-16">
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-8 rounded-3xl shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Crisis Response Center</h3>
                <p className="text-red-100 text-lg">Immediate professional intervention available</p>
              </div>
              <div className="flex space-x-8">
                <div className="text-center text-white">
                  <Phone className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-bold text-xl">100</p>
                  <p className="text-red-100">Emergency</p>
                </div>
                <div className="text-center text-white">
                  <Phone className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-bold text-xl">181</p>
                  <p className="text-red-100">Women's Line</p>
                </div>
                <div className="text-center text-white">
                  <Headphones className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-bold text-xl">24/7</p>
                  <p className="text-red-100">Expert Chat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
                  <Compass className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">WorkGuardian</h3>
                  <p className="text-gray-400">Professional Navigator</p>
                </div>
              </div>
              <p className="text-gray-400">
                Enterprise-grade workplace incident management platform for professional organizations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/incident-logger" className="hover:text-white transition-colors">
                    Case Builder
                  </Link>
                </li>
                <li>
                  <Link href="/ai-assistant" className="hover:text-white transition-colors">
                    Smart Advisor
                  </Link>
                </li>
                <li>
                  <Link href="/evidence-vault" className="hover:text-white transition-colors">
                    Secure Vault
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white transition-colors">
                    Analytics Suite
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Expert Consultation: 1800-WORK-GUARD</li>
                <li>Crisis Line: 1800-CRISIS-NOW</li>
                <li>Legal Support: legal@workguardian.com</li>
                <li>Technical Help: support@workguardian.com</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Enterprise</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/enterprise" className="hover:text-white transition-colors">
                    Enterprise Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-white transition-colors">
                    Compliance Center
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-white transition-colors">
                    API Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security Overview
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WorkGuardian Enterprise. All rights reserved. Professional incident management platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
