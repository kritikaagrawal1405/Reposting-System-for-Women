"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  FileText,
  Lock,
  Users,
  Globe,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  Headphones,
  Download,
  Share,
  Settings,
  BookOpen,
  Compass,
  Lightbulb,
  Target,
  Briefcase,
  Award,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [language, setLanguage] = useState("en")
  const [userMode, setUserMode] = useState("guided")

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
              variant={userMode === "guided" ? "default" : "outline"}
              onClick={() => setUserMode(userMode === "guided" ? "expert" : "guided")}
              className={`${
                userMode === "guided"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  : "border-orange-300 text-orange-700 hover:bg-orange-50"
              }`}
            >
              {userMode === "guided" ? <Compass className="h-4 w-4 mr-2" /> : <Target className="h-4 w-4 mr-2" />}
              {userMode === "guided" ? "Guided Mode" : "Expert Mode"}
            </Button>
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

        {/* Circular Feature Layout */}
        <div className="relative max-w-7xl mx-auto px-8 mb-20">
          <div className="relative w-full h-[800px]">
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <Compass className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Control Hub</h3>
                <p className="text-orange-100">Central Command</p>
              </div>
            </div>

            {/* Orbiting Feature Cards */}
            {/* Top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-blue-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Knowledge Base</h3>
                  <p className="text-gray-600 mb-6">Comprehensive legal resources and procedural guidance</p>
                  <Link href="/resources">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                      Explore Resources
                      <BookOpen className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Top Right */}
            <div className="absolute top-16 right-16 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-green-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Advisor</h3>
                  <p className="text-gray-600 mb-6">AI-powered guidance and intelligent recommendations</p>
                  <Link href="/ai-assistant">
                    <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl">
                      Get Guidance
                      <Lightbulb className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-purple-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Secure Vault</h3>
                  <p className="text-gray-600 mb-6">Enterprise-grade encrypted evidence storage</p>
                  <Link href="/evidence-vault">
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl">
                      Access Vault
                      <Lock className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-16 right-16 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-yellow-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Analytics Suite</h3>
                  <p className="text-gray-600 mb-6">Advanced reporting and trend analysis tools</p>
                  <Link href="/analytics">
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl">
                      View Analytics
                      <TrendingUp className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-red-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-red-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Headphones className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Support</h3>
                  <p className="text-gray-600 mb-6">24/7 professional consultation and crisis intervention</p>
                  <Link href="/sos-chat">
                    <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl">
                      Connect Now
                      <Headphones className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-16 left-16 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-teal-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-teal-400 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Network</h3>
                  <p className="text-gray-600 mb-6">Connect with verified legal and counseling professionals</p>
                  <Link href="/support-network">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl">
                      Find Experts
                      <Users className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Left */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-indigo-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-indigo-400 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Case Builder</h3>
                  <p className="text-gray-600 mb-6">Professional incident documentation and case management</p>
                  <Link href="/incident-logger">
                    <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
                      Build Case
                      <FileText className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Top Left */}
            <div className="absolute top-16 left-16 w-80">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-emerald-200 hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-emerald-400 to-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Timeline Manager</h3>
                  <p className="text-gray-600 mb-6">Chronological incident tracking and timeline visualization</p>
                  <Link href="/timeline">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl">
                      Manage Timeline
                      <Clock className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-12 rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Professional Command Center</h2>
              <p className="text-xl text-gray-300">Advanced tools for workplace incident management</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto">
                <FileText className="h-10 w-10" />
                <span className="text-sm font-medium">New Case</span>
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto">
                <Download className="h-10 w-10" />
                <span className="text-sm font-medium">Export</span>
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto">
                <Share className="h-10 w-10" />
                <span className="text-sm font-medium">Collaborate</span>
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto">
                <Calendar className="h-10 w-10" />
                <span className="text-sm font-medium">Schedule</span>
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto">
                <MapPin className="h-10 w-10" />
                <span className="text-sm font-medium">Locations</span>
              </Button>
              <Button className="bg-gray-700 hover:bg-gray-600 text-white p-8 rounded-2xl flex-col space-y-3 h-auto">
                <Settings className="h-10 w-10" />
                <span className="text-sm font-medium">Configure</span>
              </Button>
            </div>
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
