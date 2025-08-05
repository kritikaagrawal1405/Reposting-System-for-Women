"use client"

import type React from "react"

import { useState } from "react"
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
import Link from "next/link"

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [language, setLanguage] = useState("en")
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Organization Information
    organizationName: "",
    organizationType: "",
    department: "",
    position: "",
    employeeId: "",
    workLocation: "",

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
      </div>
    </div>
  )
}
