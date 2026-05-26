import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize the Gemini SDK
// Do not expose GEMINI_API_KEY to the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const startupPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Catchy Startup Name" },
    tagline: { type: Type.STRING, description: "Short punchy tagline" },
    businessSummary: { type: Type.STRING, description: "A 2-3 paragraph summary of the business, value proposition, and how it works." },
    features: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of core features" 
    },
    swot: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
        threats: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    marketingStrategy: { type: Type.STRING, description: "Detailed explanation of the go-to-market strategy." },
    mvpRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING, description: "E.g., Month 1: Foundation" },
          tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    },
    techStack: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Technology Name" },
          reason: { type: Type.STRING, description: "Why it was chosen" }
        }
      }
    }
  },
  required: ["name", "tagline", "businessSummary", "features", "swot", "marketingStrategy", "mvpRoadmap", "techStack"]
};

export async function generateStartupPlan(params: {
  idea: string;
  industry: string;
  budget: string;
  audience: string;
}) {
  const prompt = `A founder has come to you with the following startup concept:
    
Idea: ${params.idea}
Industry: ${params.industry}
Budget: ${params.budget}
Target Audience: ${params.audience}

Generate a comprehensive business plan. Make sure it is highly practical, actionable, and visually appealing.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert startup consultant and VC analyst working at top-tier firm. You help founders shape their ideas into viable, investable business models. You provide honest, highly analytical insights.",
        responseMimeType: 'application/json',
        responseSchema: startupPlanSchema,
        temperature: 0.7,
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
