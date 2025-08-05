"use client"

import type React from "react"

import { useState } from "react"
<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
import {
  ArrowLeft,
  Mail,
  Phone,
<<<<<<< HEAD
  Building,
=======
  BadgeIcon as IdCard,
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  Eye,
  EyeOff,
  Shield,
  Fingerprint,
<<<<<<< HEAD
  Smartphone,
  Globe,
  CheckCircle,
  AlertTriangle,
  Compass,
=======
  Globe,
  Lock,
  User,
  Building,
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
<<<<<<< HEAD
  const [loginMethod, setLoginMethod] = useState("email")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [biometricAvailable, setBiometricAvailable] = useState(true)
  const [language, setLanguage] = useState("en")

=======
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState("email")
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    employeeId: "",
    password: "",
<<<<<<< HEAD
    twoFactorCode: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate login process
    console.log("Login attempt:", { method: loginMethod, ...formData })

    // Store user mode and redirect
    localStorage.setItem("userMode", "verified")
    localStorage.setItem("userEmail", formData.email || `user@company.com`)

    // Redirect to home page
    window.location.href = "/"
  }

  const handleBiometricLogin = () => {
    // Simulate biometric authentication
    localStorage.setItem("userMode", "verified")
    localStorage.setItem("userEmail", "biometric@company.com")
=======
    rememberMe: false,
    twoFactor: false,
  })
  const [language, setLanguage] = useState("en")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user mode as verified
    localStorage.setItem("userMode", "verified")
    localStorage.setItem("userEmail", formData.email || formData.phone || formData.employeeId)
    // Redirect to home
    window.location.href = "/"
  }

  const handleAnonymousAccess = () => {
    localStorage.setItem("userMode", "anonymous")
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
    window.location.href = "/"
  }

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
=======
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
<<<<<<< HEAD
      <div className="flex items-center justify-between p-6">
        <Link href="/">
          <Button variant="ghost" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-xl shadow-lg">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              WorkGuardian
            </h1>
          </div>
        </div>

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

      <div className="flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl border border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your WorkGuardian account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="employee" className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  Employee
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4 mt-6">
                <TabsContent value="email" className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="employee" className="space-y-4">
                  <div>
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      type="text"
                      placeholder="EMP001234"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      required
                    />
                  </div>
                </TabsContent>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
=======
      <div className="bg-white/90 backdrop-blur-xl border-b border-blue-200 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-6 text-blue-700 hover:text-blue-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">WorkGuardian Login</h1>
                <p className="text-blue-600">Secure Access Portal</p>
              </div>
            </div>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 border-blue-200 bg-white/80">
              <Globe className="h-4 w-4 mr-2 text-blue-500" />
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

      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-8">
        <div className="w-full max-w-md">
          {/* Anonymous Access Banner */}
          <Card className="mb-8 bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <User className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-orange-800 mb-2">Need Anonymous Access?</h3>
                <p className="text-orange-700 text-sm mb-4">
                  Access basic features without creating an account. Limited functionality for privacy protection.
                </p>
                <Button
                  onClick={handleAnonymousAccess}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full bg-transparent"
                >
                  Continue Anonymously
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Login Card */}
          <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800">Sign In to Your Account</CardTitle>
              <CardDescription className="text-gray-600">Choose your preferred authentication method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="email" className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </TabsTrigger>
                  <TabsTrigger value="employee" className="flex items-center">
                    <IdCard className="h-4 w-4 mr-2" />
                    Employee ID
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleLogin} className="space-y-6">
                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/80 border-blue-200"
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/80 border-blue-200"
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="employee" className="space-y-4">
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        type="text"
                        placeholder="EMP001234"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                        className="bg-white/80 border-blue-200"
                        required
                      />
                    </div>
                  </TabsContent>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="bg-white/80 border-blue-200 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                      </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="twoFactor"
                      checked={formData.twoFactor}
                      onCheckedChange={(checked) => setFormData({ ...formData, twoFactor: checked as boolean })}
                    />
                    <Label htmlFor="twoFactor" className="text-sm text-gray-600 flex items-center">
                      <Shield className="h-4 w-4 mr-1 text-green-600" />
                      Enable Two-Factor Authentication
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl text-lg font-semibold"
                  >
                    Sign In Securely
                    <Lock className="h-5 w-5 ml-2" />
                  </Button>
                </form>

                {/* Alternative Login Methods */}
                <div className="mt-8 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="bg-white/80 border-blue-200">
                      <Fingerprint className="h-4 w-4 mr-2" />
                      Biometric
                    </Button>
                    <Button variant="outline" className="bg-white/80 border-blue-200">
                      <Building className="h-4 w-4 mr-2" />
                      SSO
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
                    </Button>
                  </div>
                </div>

<<<<<<< HEAD
                {twoFactorEnabled && (
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication Code</Label>
                    <Input
                      id="twoFactor"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={formData.twoFactorCode}
                      onChange={(e) => setFormData({ ...formData, twoFactorCode: e.target.value })}
                      maxLength={6}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Sign In Securely
                </Button>
              </form>
            </Tabs>

            {/* Alternative Login Methods */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              {biometricAvailable && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleBiometricLogin}
                >
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Biometric Login
                </Button>
              )}

              <Button type="button" variant="outline" className="w-full bg-transparent">
                <Smartphone className="h-4 w-4 mr-2" />
                SMS Verification
              </Button>
            </div>

            {/* Security Features */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Secure Login</span>
              </div>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• End-to-end encryption</li>
                <li>• Multi-factor authentication</li>
                <li>• Session monitoring</li>
                <li>• Audit trail logging</li>
              </ul>
            </div>

            {/* Anonymous Access */}
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-orange-800">Anonymous Access</span>
              </div>
              <p className="text-xs text-orange-700 mb-3">
                Continue without an account with limited features for privacy protection.
              </p>
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                >
                  Continue Anonymously
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
=======
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Enterprise Security</h3>
                  <p className="text-sm text-green-800">
                    Your data is protected with bank-grade encryption, multi-factor authentication, and compliance with
                    international security standards including ISO 27001 and SOC 2.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
      </div>
    </div>
  )
}
