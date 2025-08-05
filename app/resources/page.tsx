"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Mail, ExternalLink, FileText, Users, Shield, Heart } from "lucide-react"
import Link from "next/link"

export default function SupportResources() {
  const emergencyContacts = [
    {
      name: "National Sexual Harassment Helpline",
      phone: "1-800-656-HOPE",
      email: "help@rainn.org",
      available: "24/7",
      type: "emergency",
    },
    {
      name: "Employee Assistance Program",
      phone: "1-800-327-4692",
      email: "eap@company.com",
      available: "Mon-Fri 8AM-8PM",
      type: "counseling",
    },
    {
      name: "Legal Aid Society",
      phone: "1-800-274-8922",
      email: "intake@legalaid.org",
      available: "Mon-Fri 9AM-5PM",
      type: "legal",
    },
  ]

  const legalResources = [
    {
      title: "PoSH Act 2013 - Complete Guide",
      description: "Comprehensive guide to the Prevention of Sexual Harassment Act",
      url: "#",
      type: "legal-guide",
    },
    {
      title: "Filing a Formal Complaint",
      description: "Step-by-step process for filing complaints with ICC/LCC",
      url: "#",
      type: "process-guide",
    },
    {
      title: "Know Your Rights",
      description: "Understanding your rights under workplace harassment laws",
      url: "#",
      type: "rights-info",
    },
    {
      title: "Evidence Collection Best Practices",
      description: "Legal guidelines for documenting harassment incidents",
      url: "#",
      type: "evidence-guide",
    },
  ]

  const counselingServices = [
    {
      name: "Trauma-Informed Counseling",
      provider: "SafeSpace Counseling Center",
      contact: "counseling@safespace.org",
      specialization: "Workplace harassment trauma",
      cost: "Sliding scale fees available",
    },
    {
      name: "Support Groups",
      provider: "Survivors Network",
      contact: "groups@survivors.org",
      specialization: "Peer support for harassment survivors",
      cost: "Free",
    },
    {
      name: "Crisis Intervention",
      provider: "Crisis Response Team",
      contact: "1-800-CRISIS-1",
      specialization: "Immediate crisis support",
      cost: "Free",
    },
  ]

  const poshCommittees = [
    {
      name: "Internal Complaints Committee (ICC)",
      chairperson: "Dr. Sarah Johnson",
      email: "icc@company.com",
      members: 4,
      externalMember: "Ms. Priya Sharma (NGO Representative)",
    },
    {
      name: "Local Complaints Committee (LCC)",
      chairperson: "District Collector Office",
      email: "lcc@district.gov.in",
      members: 5,
      jurisdiction: "For organizations with <10 employees",
    },
  ]

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
            <h1 className="text-3xl font-bold text-gray-900">Support Resources</h1>
            <p className="text-gray-600">Legal contacts, counseling services, and PoSH committee information</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <Card className="border-red-200">
            <CardHeader>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-red-600 mr-2" />
                <CardTitle className="text-red-800">Emergency Contacts</CardTitle>
              </div>
              <CardDescription>Immediate help and crisis support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <Badge variant={contact.type === "emergency" ? "destructive" : "secondary"}>{contact.type}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      <p className="text-gray-600 ml-6">Available: {contact.available}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legal Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <CardTitle>Legal Resources</CardTitle>
              </div>
              <CardDescription>Legal guides and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {legalResources.map((resource, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Counseling Services */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-pink-600 mr-2" />
                <CardTitle>Counseling Services</CardTitle>
              </div>
              <CardDescription>Mental health and emotional support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counselingServices.map((service, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{service.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Provider:</span> {service.provider}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>
                        <a href={`mailto:${service.contact}`} className="text-blue-600 hover:underline ml-1">
                          {service.contact}
                        </a>
                      </p>
                      <p>
                        <span className="font-medium">Specialization:</span> {service.specialization}
                      </p>
                      <p>
                        <span className="font-medium">Cost:</span> {service.cost}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PoSH Committees */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-green-600 mr-2" />
                <CardTitle>PoSH Committees</CardTitle>
              </div>
              <CardDescription>Internal and Local Complaints Committees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poshCommittees.map((committee, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{committee.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Chairperson:</span> {committee.chairperson}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>
                        <a href={`mailto:${committee.email}`} className="text-blue-600 hover:underline ml-1">
                          {committee.email}
                        </a>
                      </p>
                      <p>
                        <span className="font-medium">Members:</span> {committee.members}
                      </p>
                      {committee.externalMember && (
                        <p>
                          <span className="font-medium">External Member:</span> {committee.externalMember}
                        </p>
                      )}
                      {committee.jurisdiction && (
                        <p>
                          <span className="font-medium">Jurisdiction:</span> {committee.jurisdiction}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                <CardTitle className="text-lg">Safety Planning</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Create a personalized safety plan for workplace situations</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Create Safety Plan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-purple-600 mr-2" />
                <CardTitle className="text-lg">Know Your Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Comprehensive guide to your rights under PoSH Act 2013</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Rights Guide
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-teal-600 mr-2" />
                <CardTitle className="text-lg">Community Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Connect with others who have similar experiences</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Join Community
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Important Disclaimer</h3>
                <p className="text-sm text-blue-800">
                  This platform provides information and tools to assist with PoSH compliance and documentation. It is
                  not a substitute for professional legal advice. Always consult with qualified legal counsel for
                  specific legal matters. In case of immediate danger, contact emergency services immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
