"use client"

import type React from "react"

import { useState } from "react"
<<<<<<< HEAD
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Shield, CheckCircle, User, Building, Globe, Compass } from "lucide-react"
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  User,
  Building,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react"
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
import Link from "next/link"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [language, setLanguage] = useState("en")
<<<<<<< HEAD

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
=======
  const [formData, setFormData] = useState({
    // Personal Information
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
<<<<<<< HEAD
    password: "",
    confirmPassword: "",

    // Step 2: Organization Details
    organization: "",
=======
    dateOfBirth: "",
    gender: "",

    // Organization Information
    organizationName: "",
    organizationType: "",
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
    department: "",
    position: "",
    employeeId: "",
    workLocation: "",

<<<<<<< HEAD
    // Step 3: Security & Preferences
    twoFactorEnabled: false,
    biometricEnabled: false,
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
    },

    // Step 4: Verification & Consent
    termsAccepted: false,
    privacyAccepted: false,
    dataProcessingConsent: false,
    emergencyContact: "",
    emergencyPhone: "",
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password })
    setPasswordStrength(calculatePasswordStrength(password))
  }
=======
    // Security Setup
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
    twoFactorMethod: "",

    // Verification & Consent
    emailVerification: false,
    smsVerification: false,
    termsAccepted: false,
    privacyAccepted: false,
    marketingConsent: false,
  })

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Organization Details", icon: Building },
    { id: 3, title: "Security Setup", icon: Shield },
    { id: 4, title: "Verification", icon: CheckCircle },
  ]

  const languages = {
    en: "English",
    hi: "हिंदी",
    bn: "বাংলা",
    ta: "தமிழ்",
    te: "తెలుగు",
    mr: "मराठी",
  }

  const organizationTypes = [
    "Private Company",
    "Government Organization",
    "Non-Profit Organization",
    "Educational Institution",
    "Healthcare Organization",
    "Legal Firm",
    "Consulting Firm",
    "Other",
  ]

  const securityQuestions = [
    "What was the name of your first pet?",
    "What is your mother's maiden name?",
    "What city were you born in?",
    "What was the name of your first school?",
    "What is your favorite book?",
  ]
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate signup process
    console.log("Signup data:", formData)

    // Store user mode and redirect
    localStorage.setItem("userMode", "verified")
    localStorage.setItem("userEmail", formData.email)

    // Redirect to home page
    window.location.href = "/"
  }

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

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Very Weak"
    if (passwordStrength < 50) return "Weak"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
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
        <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-xl shadow-2xl border border-blue-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Create Your Account</CardTitle>
            <CardDescription>Join WorkGuardian for comprehensive workplace protection</CardDescription>

            {/* Progress Indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep} of 4</span>
                <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <Progress value={(currentStep / 4) * 100} className="h-2" />
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

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

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
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
                      </Button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Password Strength</span>
                          <span
                            className={
                              passwordStrength >= 75
                                ? "text-green-600"
                                : passwordStrength >= 50
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Organization Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <Building className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold">Organization Details</h3>
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Role</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employeeId">Employee ID (Optional)</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="workLocation">Work Location</Label>
                      <Input
                        id="workLocation"
                        value={formData.workLocation}
                        onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Security & Preferences */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold">Security & Preferences</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="twoFactor"
                        checked={formData.twoFactorEnabled}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, twoFactorEnabled: checked as boolean })
                        }
                      />
                      <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="biometric"
                        checked={formData.biometricEnabled}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, biometricEnabled: checked as boolean })
                        }
                      />
                      <Label htmlFor="biometric">Enable Biometric Login</Label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Notification Preferences</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailNotif"
                          checked={formData.notificationPreferences.email}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              notificationPreferences: {
                                ...formData.notificationPreferences,
                                email: checked as boolean,
                              },
                            })
                          }
                        />
                        <Label htmlFor="emailNotif">Email Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smsNotif"
                          checked={formData.notificationPreferences.sms}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              notificationPreferences: {
                                ...formData.notificationPreferences,
                                sms: checked as boolean,
                              },
                            })
                          }
                        />
                        <Label htmlFor="smsNotif">SMS Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pushNotif"
                          checked={formData.notificationPreferences.push}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              notificationPreferences: {
                                ...formData.notificationPreferences,
                                push: checked as boolean,
                              },
                            })
                          }
                        />
                        <Label htmlFor="pushNotif">Push Notifications</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Verification & Consent */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold">Verification & Consent</h3>
                  </div>

                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacyAccepted}
                        onCheckedChange={(checked) => setFormData({ ...formData, privacyAccepted: checked as boolean })}
                        required
                      />
                      <Label htmlFor="privacy" className="text-sm">
                        I consent to the processing of my personal data for workplace incident management
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="dataProcessing"
                        checked={formData.dataProcessingConsent}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, dataProcessingConsent: checked as boolean })
                        }
                        required
                      />
                      <Label htmlFor="dataProcessing" className="text-sm">
                        I understand that my data will be encrypted and stored securely according to industry standards
                      </Label>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Security Guarantee</span>
                    </div>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Your data is encrypted with AES-256 encryption</li>
                      <li>• We never share your information without consent</li>
                      <li>• You can delete your account and data at any time</li>
                      <li>• All communications are logged for audit purposes</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}

                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    disabled={!formData.termsAccepted || !formData.privacyAccepted || !formData.dataProcessingConsent}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create Account
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store user mode as verified
    localStorage.setItem("userMode", "verified")
    localStorage.setItem("userEmail", formData.email)
    // Redirect to home
    window.location.href = "/"
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-green-200 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-6 text-green-700 hover:text-green-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                <p className="text-green-600">Join WorkGuardian Platform</p>
              </div>
            </div>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 border-green-200 bg-white/80">
              <Globe className="h-4 w-4 mr-2 text-green-500" />
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
        <div className="w-full max-w-2xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-1 mx-4 ${currentStep > step.id ? "bg-green-500" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">{steps[currentStep - 1].title}</h2>
              <p className="text-gray-600">
                Step {currentStep} of {steps.length}
              </p>
            </div>
          </div>

          {/* Main Form Card */}
          <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border border-green-200">
            <CardHeader>
              <CardTitle className="text-center text-gray-800">
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Organization information"}
                {currentStep === 3 && "Secure your account"}
                {currentStep === 4 && "Verify and complete"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {currentStep === 1 && "We need some basic information to get started"}
                {currentStep === 2 && "Help us understand your workplace context"}
                {currentStep === 3 && "Set up strong security for your account"}
                {currentStep === 4 && "Review and confirm your registration"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="bg-white/80 border-green-200"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="bg-white/80 border-green-200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/80 border-green-200"
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/80 border-green-200"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="bg-white/80 border-green-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => setFormData({ ...formData, gender: value })}
                        >
                          <SelectTrigger className="bg-white/80 border-green-200">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Organization Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        className="bg-white/80 border-green-200"
                        placeholder="Your Company Name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="organizationType">Organization Type *</Label>
                      <Select
                        value={formData.organizationType}
                        onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                      >
                        <SelectTrigger className="bg-white/80 border-green-200">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="bg-white/80 border-green-200"
                          placeholder="HR, IT, Finance, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position/Role</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                          className="bg-white/80 border-green-200"
                          placeholder="Manager, Executive, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input
                          id="employeeId"
                          value={formData.employeeId}
                          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                          className="bg-white/80 border-green-200"
                          placeholder="EMP001234"
                        />
                      </div>
                      <div>
                        <Label htmlFor="workLocation">Work Location</Label>
                        <Input
                          id="workLocation"
                          value={formData.workLocation}
                          onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                          className="bg-white/80 border-green-200"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Security Setup */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="bg-white/80 border-green-200 pr-10"
                          placeholder="Create a strong password"
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
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Password Strength</span>
                            <span
                              className={`font-medium ${
                                passwordStrength >= 75
                                  ? "text-green-600"
                                  : passwordStrength >= 50
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {passwordStrength >= 75 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
                            </span>
                          </div>
                          <Progress value={passwordStrength} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="bg-white/80 border-green-200 pr-10"
                          placeholder="Confirm your password"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="securityQuestion">Security Question</Label>
                      <Select
                        value={formData.securityQuestion}
                        onValueChange={(value) => setFormData({ ...formData, securityQuestion: value })}
                      >
                        <SelectTrigger className="bg-white/80 border-green-200">
                          <SelectValue placeholder="Choose a security question" />
                        </SelectTrigger>
                        <SelectContent>
                          {securityQuestions.map((question) => (
                            <SelectItem key={question} value={question}>
                              {question}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.securityQuestion && (
                      <div>
                        <Label htmlFor="securityAnswer">Security Answer</Label>
                        <Input
                          id="securityAnswer"
                          value={formData.securityAnswer}
                          onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
                          className="bg-white/80 border-green-200"
                          placeholder="Your answer"
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="twoFactorMethod">Two-Factor Authentication</Label>
                      <Select
                        value={formData.twoFactorMethod}
                        onValueChange={(value) => setFormData({ ...formData, twoFactorMethod: value })}
                      >
                        <SelectTrigger className="bg-white/80 border-green-200">
                          <SelectValue placeholder="Choose 2FA method (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms">SMS Text Message</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="app">Authenticator App</SelectItem>
                          <SelectItem value="none">Skip for now</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 4: Verification & Consent */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-bold text-gray-800 mb-4">Account Summary</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <span className="ml-2 font-medium">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <span className="ml-2 font-medium">{formData.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Organization:</span>
                          <span className="ml-2 font-medium">{formData.organizationName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Position:</span>
                          <span className="ml-2 font-medium">{formData.position}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-800">Verification Options</h3>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailVerification"
                          checked={formData.emailVerification}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, emailVerification: checked as boolean })
                          }
                        />
                        <Label htmlFor="emailVerification" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                          Verify email address
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smsVerification"
                          checked={formData.smsVerification}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, smsVerification: checked as boolean })
                          }
                        />
                        <Label htmlFor="smsVerification" className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-green-600" />
                          Verify phone number
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-800">Terms & Consent</h3>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="termsAccepted"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                          required
                        />
                        <Label htmlFor="termsAccepted" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </Link>
                          *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacyAccepted"
                          checked={formData.privacyAccepted}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, privacyAccepted: checked as boolean })
                          }
                          required
                        />
                        <Label htmlFor="privacyAccepted" className="text-sm">
                          I consent to the processing of my personal data as described in the Privacy Policy *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="marketingConsent"
                          checked={formData.marketingConsent}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, marketingConsent: checked as boolean })
                          }
                        />
                        <Label htmlFor="marketingConsent" className="text-sm">
                          I would like to receive updates and marketing communications (optional)
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white ml-auto"
                      disabled={
                        (currentStep === 1 &&
                          (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)) ||
                        (currentStep === 2 && (!formData.organizationName || !formData.organizationType)) ||
                        (currentStep === 3 &&
                          (!formData.password ||
                            !formData.confirmPassword ||
                            formData.password !== formData.confirmPassword))
                      }
                    >
                      Next Step
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white ml-auto"
                      disabled={!formData.termsAccepted || !formData.privacyAccepted}
                    >
                      Create Account
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Already have account */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
      </div>
    </div>
  )
}
