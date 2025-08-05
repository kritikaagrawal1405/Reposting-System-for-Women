"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wand2, Save, Download, AlertCircle, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function NarrativeAssistant() {
  const [rawEntry, setRawEntry] = useState("")
  const [incidentType, setIncidentType] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [witnesses, setWitnesses] = useState("")
  const [perpetratorRole, setPerpetratorRole] = useState("")
  const [impactOnWork, setImpactOnWork] = useState("")
  const [formalNarrative, setFormalNarrative] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedEntries, setSavedEntries] = useState<any[]>([])

  const generateFormalNarrative = async () => {
    if (!rawEntry.trim()) return

    setIsGenerating(true)

    // Simulate AI processing with women-focused narrative transformation
    setTimeout(() => {
      const formal = `FORMAL COMPLAINT UNDER THE PREVENTION OF SEXUAL HARASSMENT (PoSH) ACT, 2013

COMPLAINANT DETAILS:
Name: [To be filled by complainant]
Designation: [To be filled by complainant]
Department: [To be filled by complainant]

RESPONDENT DETAILS:
Role/Position: ${perpetratorRole}
Relationship to Complainant: [To be specified]

INCIDENT DETAILS:
Date of Incident: ${date}
Location: ${location}
Nature of Harassment: ${incidentType}
Witnesses Present: ${witnesses || "None identified at the time of incident"}

DETAILED STATEMENT:

I, the undersigned, hereby file this formal complaint under the Prevention of Sexual Harassment (PoSH) Act, 2013, regarding the incident(s) of sexual harassment that I have experienced in the workplace.

ACCOUNT OF THE INCIDENT:

${rawEntry
  .replace(/I felt uncomfortable/g, "The complainant experienced distress and discomfort")
  .replace(/I felt scared/g, "The complainant felt threatened and unsafe")
  .replace(/I was shocked/g, "The complainant was taken aback by the inappropriate conduct")
  .replace(/he made me feel/g, "the respondent's actions caused the complainant to feel")
  .replace(/I told him/g, "The complainant clearly communicated to the respondent")
  .replace(/I didn't know what to do/g, "The complainant was placed in a difficult position")
  .replace(/I was embarrassed/g, "The complainant felt humiliated")
  .replace(/he said/gi, "the respondent stated")
  .replace(/she said/gi, "the respondent stated")
  .replace(/really upset/g, "deeply distressed")
  .replace(/angry/g, "concerned about the violation of professional boundaries")
  .replace(/weird/g, "inappropriate and unprofessional")
  .replace(/creepy/g, "predatory and unwelcome")}

The respondent's conduct constitutes sexual harassment as defined under Section 2(n) of the PoSH Act, 2013, which includes unwelcome acts or behavior (whether directly or by implication) such as:
- Physical contact and advances
- Demand or request for sexual favors
- Making sexually colored remarks
- Showing pornography
- Any other unwelcome physical, verbal or non-verbal conduct of sexual nature

IMPACT ON WORK AND WELL-BEING:

${impactOnWork || "The incident has significantly impacted the complainant's ability to work effectively and has created a hostile work environment. The complainant has experienced stress, anxiety, and discomfort in the workplace as a direct result of this harassment."}

This behavior has violated my dignity as a woman and has created an intimidating, hostile, and offensive work environment, which is detrimental to my professional growth and mental well-being.

RELIEF SOUGHT:

1. Immediate investigation of the complaint as per PoSH Act guidelines
2. Appropriate disciplinary action against the respondent
3. Measures to ensure a safe and harassment-free work environment
4. Compensation for mental trauma and career impact, if applicable
5. Transfer of the respondent or complainant, if necessary for safety

DECLARATION:

I hereby declare that the above statement is true to the best of my knowledge and belief. I understand that filing a false complaint is punishable under the PoSH Act, and I affirm that this complaint is made in good faith.

I request the Internal Complaints Committee (ICC) to take immediate cognizance of this matter and conduct a fair and time-bound inquiry as mandated under the PoSH Act, 2013.

Respectfully submitted,

[Complainant's Signature]
[Complainant's Name]
Date: ${new Date().toLocaleDateString()}

Note: This complaint is filed within the prescribed time limit of three months from the date of incident as per Section 9 of the PoSH Act, 2013.`

      setFormalNarrative(formal)
      setIsGenerating(false)
    }, 3000)
  }

  const saveEntry = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      incidentType,
      location,
      incidentDate: date,
      rawEntry,
      formalNarrative,
      perpetratorRole,
      impactOnWork,
      status: "draft",
    }
    setSavedEntries([...savedEntries, entry])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Safety
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Voice, Your Power</h1>
            <p className="text-gray-600">Transform your experience into a formal complaint that demands action</p>
          </div>
        </div>

        {/* Support Message */}
        <Card className="mb-8 bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <Heart className="h-5 w-5 text-purple-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">You Are Not Alone</h3>
                <p className="text-sm text-purple-800">
                  Your experience matters. Your voice deserves to be heard. This tool will help you transform your
                  personal account into a powerful, legally sound complaint. Take your time, and remember - you are
                  brave for taking this step.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-purple-600 mr-2" />
                  Tell Us What Happened
                </CardTitle>
                <CardDescription>Your information is completely confidential and secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="incident-type">Type of Harassment</Label>
                  <Select value={incidentType} onValueChange={setIncidentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of harassment you experienced" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unwelcome-physical-contact">Unwelcome Physical Contact/Touching</SelectItem>
                      <SelectItem value="sexual-advances">Unwanted Sexual Advances</SelectItem>
                      <SelectItem value="sexual-comments">Sexually Suggestive Comments/Jokes</SelectItem>
                      <SelectItem value="quid-pro-quo">Quid Pro Quo (Sexual Favors for Job Benefits)</SelectItem>
                      <SelectItem value="visual-harassment">Showing Inappropriate Images/Content</SelectItem>
                      <SelectItem value="stalking-following">Stalking or Following</SelectItem>
                      <SelectItem value="gender-based-discrimination">Gender-Based Discrimination</SelectItem>
                      <SelectItem value="hostile-environment">Creating Hostile Work Environment</SelectItem>
                      <SelectItem value="online-harassment">Online/Digital Harassment</SelectItem>
                      <SelectItem value="other">Other Form of Sexual Harassment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">When Did This Happen?</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="location">Where Did This Occur?</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Office cabin, Meeting room, Cafeteria"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="perpetrator-role">Perpetrator's Position</Label>
                  <Select value={perpetratorRole} onValueChange={setPerpetratorRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="What is their role in relation to you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct-supervisor">Direct Supervisor/Manager</SelectItem>
                      <SelectItem value="senior-colleague">Senior Colleague</SelectItem>
                      <SelectItem value="peer-colleague">Peer/Same Level Colleague</SelectItem>
                      <SelectItem value="subordinate">Subordinate/Junior Colleague</SelectItem>
                      <SelectItem value="client-customer">Client/Customer</SelectItem>
                      <SelectItem value="vendor-contractor">Vendor/Contractor</SelectItem>
                      <SelectItem value="hr-personnel">HR Personnel</SelectItem>
                      <SelectItem value="other-department">Person from Other Department</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="witnesses">Were There Any Witnesses?</Label>
                  <Input
                    id="witnesses"
                    placeholder="Names of colleagues who saw or heard what happened (optional)"
                    value={witnesses}
                    onChange={(e) => setWitnesses(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="impact">How Has This Affected Your Work?</Label>
                  <Textarea
                    id="impact"
                    placeholder="Describe how this incident has impacted your work performance, mental health, or workplace comfort..."
                    value={impactOnWork}
                    onChange={(e) => setImpactOnWork(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  Your Story, Your Words
                </CardTitle>
                <CardDescription>
                  Write exactly what happened in your own words. Don't worry about formal language - just be honest and
                  detailed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start with: 'On [date], I was working when...' 

Describe what happened step by step:
- What was said or done?
- How did it make you feel?
- What was your response?
- Did anyone else see or hear?
- Has this person done this before?

Remember: Your feelings are valid. Your experience matters. Write as much detail as you can remember."
                  value={rawEntry}
                  onChange={(e) => setRawEntry(e.target.value)}
                  className="min-h-[250px]"
                />
                <div className="flex items-center mt-4 p-4 bg-purple-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <div className="text-sm text-purple-800">
                    <p className="font-medium mb-1">This is your safe space</p>
                    <p>
                      Write naturally - use your own words and emotions. Our AI will transform this into formal legal
                      language while preserving your truth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={generateFormalNarrative}
              disabled={!rawEntry.trim() || isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 h-12"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Your Formal Complaint...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Transform My Story Into a Legal Complaint
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Your Formal PoSH Complaint
                </CardTitle>
                <CardDescription>Professional, legally sound document ready for submission</CardDescription>
              </CardHeader>
              <CardContent>
                {formalNarrative ? (
                  <div className="space-y-4">
                    <Textarea
                      value={formalNarrative}
                      onChange={(e) => setFormalNarrative(e.target.value)}
                      className="min-h-[500px] font-mono text-sm"
                    />
                    <div className="flex gap-2">
                      <Button onClick={saveEntry} variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save Securely
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    <Wand2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-2">Your Formal Complaint Will Appear Here</h3>
                    <p className="text-sm">
                      Fill in your story above, and our AI will create a powerful, legally compliant document that
                      validates your experience and demands action.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations for Women */}
            {formalNarrative && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="h-5 w-5 text-pink-600 mr-2" />
                    Empowerment Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Badge variant="default" className="mr-2 mt-0.5 bg-green-100 text-green-800">
                        Strength
                      </Badge>
                      <p className="text-sm">
                        Your account shows clear documentation of unwelcome behavior and its impact
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5 border-purple-200 text-purple-800">
                        Legal Power
                      </Badge>
                      <p className="text-sm">
                        Your complaint references specific PoSH Act provisions that protect women's rights
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5 border-blue-200 text-blue-800">
                        Next Step
                      </Badge>
                      <p className="text-sm">
                        Consider documenting any previous incidents or patterns of behavior for a stronger case
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5 border-pink-200 text-pink-800">
                        Support
                      </Badge>
                      <p className="text-sm">
                        Remember: You have the right to a harassment-free workplace. Your courage helps other women too.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Women's Rights Information */}
            <Card className="bg-pink-50 border-pink-200">
              <CardHeader>
                <CardTitle className="text-lg text-pink-800">Know Your Rights as a Woman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-pink-700">
                  <p>
                    • <strong>Right to Dignity:</strong> Every woman has the right to work with dignity
                  </p>
                  <p>
                    • <strong>Right to Complain:</strong> You can file complaints without fear of retaliation
                  </p>
                  <p>
                    • <strong>Right to Privacy:</strong> Your complaint will be handled confidentially
                  </p>
                  <p>
                    • <strong>Right to Fair Inquiry:</strong> You deserve a time-bound, impartial investigation
                  </p>
                  <p>
                    • <strong>Right to Interim Relief:</strong> You can request transfer or leave during inquiry
                  </p>
                  <p>
                    • <strong>Right to Compensation:</strong> You may be entitled to compensation for trauma
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
