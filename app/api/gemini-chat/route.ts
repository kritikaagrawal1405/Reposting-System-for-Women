import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, chatMode, userMode, language, conversationHistory } = await request.json()

    // In a real implementation, you would use the actual Gemini API
    // For now, we'll simulate intelligent responses based on the context

    const contextualResponse = generateContextualResponse(message, chatMode, userMode, language, conversationHistory)

    return NextResponse.json({ response: contextualResponse })
  } catch (error) {
    console.error("Error in Gemini chat API:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

function generateContextualResponse(
  message: string,
  chatMode: string,
  userMode: string,
  language: string,
  conversationHistory: any[],
): string {
  const isEmergency =
    chatMode === "emergency" ||
    message.toLowerCase().includes("emergency") ||
    message.toLowerCase().includes("urgent") ||
    message.toLowerCase().includes("help") ||
    message.toLowerCase().includes("crisis")

  const isLegal =
    chatMode === "legal" ||
    message.toLowerCase().includes("legal") ||
    message.toLowerCase().includes("lawyer") ||
    message.toLowerCase().includes("court") ||
    message.toLowerCase().includes("posh")

  // Emergency responses
  if (isEmergency) {
    const emergencyResponses = [
      "I understand this is urgent. If you're in immediate physical danger, please call emergency services at 100 right away. I'm here to help you through this situation. Can you tell me more about what's happening?",
      "Your safety is the top priority. If this is a life-threatening emergency, please contact emergency services immediately at 100. For women's crisis support, you can also call 181. I'm here to provide guidance - what specific help do you need right now?",
      "I'm here to help you through this crisis. If you need immediate emergency assistance, please call 100. For specialized women's support, call 181. Can you share what's happening so I can provide the most appropriate guidance?",
    ]
    return emergencyResponses[Math.floor(Math.random() * emergencyResponses.length)]
  }

  // Legal consultation responses
  if (isLegal) {
    const legalResponses = [
      "I can provide general guidance on workplace harassment laws and the PoSH Act 2013. However, for specific legal advice, I recommend consulting with a qualified lawyer. What aspect of the legal process would you like to understand better?",
      "Under the Prevention of Sexual Harassment (PoSH) Act 2013, you have specific rights and protections. I can explain the complaint process, your rights, and available remedies. What specific legal information do you need?",
      "Legal matters require careful consideration. I can help you understand the PoSH Act provisions, complaint procedures, and your rights. For personalized legal advice, consulting with a lawyer is recommended. What would you like to know about the legal framework?",
    ]
    return legalResponses[Math.floor(Math.random() * legalResponses.length)]
  }

  // Enhanced responses for verified users
  if (userMode === "verified") {
    const verifiedResponses = [
      "As a verified user, I can provide more personalized support. I can help you with case documentation, connect you with our expert network, and guide you through our platform's advanced features. What specific assistance do you need today?",
      "I have access to your account and can provide tailored guidance based on your situation. Whether you need help with evidence management, timeline creation, or connecting with professionals, I'm here to assist. How can I help you today?",
      "With your verified account, I can offer comprehensive support including case analysis, expert referrals, and access to our full resource library. What would you like assistance with?",
    ]
    return verifiedResponses[Math.floor(Math.random() * verifiedResponses.length)]
  }

  // General support responses
  const generalResponses = [
    "I'm here to provide support and guidance. I can help you understand your options, provide information about workplace harassment, and guide you through available resources. What would you like to discuss?",
    "Thank you for reaching out. I can assist with information about workplace harassment, your rights, available support services, and how to document incidents. What specific help do you need?",
    "I understand you're looking for support. I can provide guidance on workplace harassment issues, explain your options, and help you access appropriate resources. How can I assist you today?",
    "I'm here to help you navigate this situation. I can provide information about your rights, support options, and help you understand the steps you can take. What would you like to know more about?",
  ]

  // Add language-specific responses if needed
  if (language !== "en") {
    return (
      "I understand you prefer " +
      language +
      ". While I can communicate in multiple languages, for the most accurate legal and crisis support, I recommend using our English interface or contacting local language-specific helplines. How can I assist you today?"
    )
  }

  return generalResponses[Math.floor(Math.random() * generalResponses.length)]
}
