import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK
// Do not expose GEMINI_API_KEY to the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStartupPlan(params: {
  idea: string;
  industry: string;
  budget: string;
  audience: string;
}) {
  const prompt = `
    You are an expert startup consultant and VC analyst. 
    A founder has come to you with the following startup concept:
    
    Idea: ${params.idea}
    Industry: ${params.industry}
    Budget: ${params.budget}
    Target Audience: ${params.audience}
    
    Generate a comprehensive business plan in exactly this JSON format:
    {
      "name": "Catchy Startup Name",
      "tagline": "Short punchy tagline",
      "businessSummary": "A 2-3 paragraph summary of the business, value proposition, and how it works.",
      "features": ["Core Feature 1", "Core Feature 2", ...],
      "swot": {
        "strengths": ["..."],
        "weaknesses": ["..."],
        "opportunities": ["..."],
        "threats": ["..."]
      },
      "marketingStrategy": "Detailed explanation of the go-to-market strategy.",
      "mvpRoadmap": [
        { "phase": "Month 1: Foundation", "tasks": ["...", "..."] }
      ],
      "techStack": [
        { "name": "Technology Name", "reason": "Why it was chosen" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (!response.text) {
      throw new Error("No response generated from AI.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate startup plan. Please check the AI service.");
  }
}
