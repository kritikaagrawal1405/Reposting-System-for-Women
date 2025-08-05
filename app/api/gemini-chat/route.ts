import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
<<<<<<< HEAD
    const { message, chatMode, supportType, language, conversationHistory } = await request.json()

    // Enhanced context based on support type and user mode
    const getSystemPrompt = () => {
      const basePrompt = `You are a professional AI assistant for WorkGuardian, a workplace incident management platform. You provide compassionate, expert-level support for workplace harassment, discrimination, and safety concerns.`

      const modeContext =
        chatMode === "verified"
          ? "The user has a verified account with full access to platform features. You can reference their case history and provide personalized guidance."
          : "The user is in anonymous mode for privacy. Provide general support while respecting their anonymity."

      const supportContext = {
        general: "Provide general workplace guidance and support. Focus on immediate safety and next steps.",
        legal:
          "Focus on legal aspects of workplace incidents. Provide information about rights, procedures, and when to seek legal counsel. Always recommend consulting with a qualified attorney for specific legal advice.",
        crisis:
          "This is a crisis situation. Prioritize immediate safety, de-escalation, and connecting with emergency resources. Be calm, supportive, and directive.",
        counseling:
          "Provide emotional support and counseling guidance. Focus on validation, coping strategies, and mental health resources.",
      }

      return `${basePrompt}\n\n${modeContext}\n\n${supportContext[supportType as keyof typeof supportContext]}\n\nAlways be empathetic, professional, and focused on the user's safety and well-being. If the situation requires immediate intervention, recommend emergency services.`
    }

    // Simulate AI response based on context
    const generateResponse = (userMessage: string) => {
      const lowerMessage = userMessage.toLowerCase()

      // Crisis detection
      if (
        lowerMessage.includes("emergency") ||
        lowerMessage.includes("danger") ||
        lowerMessage.includes("threat") ||
        lowerMessage.includes("hurt")
      ) {
        return "I'm very concerned about your safety. If you're in immediate danger, please call emergency services (100) right away. If you're safe to continue, I'm here to help you create a safety plan and connect you with appropriate resources. Can you tell me more about your current situation?"
      }

      // Legal consultation
      if (supportType === "legal") {
        return "I understand you're seeking legal guidance regarding a workplace incident. Based on Indian labor laws and the PoSH Act 2013, you have specific rights and protections. I can help you understand the complaint process, documentation requirements, and your legal options. However, for specific legal advice, I recommend consulting with a qualified employment attorney. What specific legal questions do you have?"
      }

      // Crisis support
      if (supportType === "crisis") {
        return "I'm here to support you through this crisis. Your safety and well-being are the top priority. Let's work together to assess your immediate situation and create a plan to keep you safe. Can you tell me about your current environment and any immediate concerns you have?"
      }

      // Counseling support
      if (supportType === "counseling") {
        return "Thank you for reaching out. It takes courage to seek support, and I want you to know that your feelings and experiences are valid. I'm here to listen and provide guidance. Many people who experience workplace incidents feel overwhelmed, confused, or isolated - these are normal responses to abnormal situations. How are you feeling right now, and what kind of support would be most helpful?"
      }

      // General workplace guidance
      if (lowerMessage.includes("harassment") || lowerMessage.includes("discrimination")) {
        return "I'm sorry you're experiencing workplace harassment or discrimination. This is a serious matter, and you deserve a safe work environment. Under the Prevention of Sexual Harassment (PoSH) Act 2013 and other labor laws, you have rights and protections. I can help you understand your options, including filing a complaint with your Internal Complaints Committee (ICC), documenting incidents, and accessing support resources. What specific situation are you dealing with?"
      }

      // Default supportive response
      return "I'm here to help and support you. Whether you're dealing with workplace harassment, discrimination, safety concerns, or need emotional support, I'm equipped to provide guidance and connect you with appropriate resources. Please feel free to share what's on your mind - everything you tell me is confidential and I'm here to listen without judgment."
    }

    const response = generateResponse(message)

    return NextResponse.json({
      response,
      supportType,
      chatMode,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in Gemini chat API:", error)
    return NextResponse.json(
      {
        error:
          "I apologize, but I'm experiencing technical difficulties. If this is an emergency, please contact emergency services immediately at 100.",
        response:
          "I'm sorry, I'm having trouble responding right now. Please try again, or if this is urgent, contact emergency services or call the women's helpline at 181.",
      },
      { status: 500 },
    )
  }
}
=======
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
>>>>>>> d96e8db515a7187fd72d8f0394b36dfc54714301
