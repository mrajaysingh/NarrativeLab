
import { GoogleGenAI, Type } from "@google/genai";
import { DiscoveryAnswers, OutputFormat, RefinementTone, StoryResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are an elite Narrative Strategist, Brand Story Architect, and Human Psychology–driven Copy Expert.
Your job is NOT to write generic content. Your job is to extract truth, structure it into a compelling narrative, and transform it into a high-impact personal or brand story that creates trust, authority, and emotional resonance.

Narrative Framework:
• Origin Context – Where it started
• Conflict – The real struggle or limitation
• Insight – What changed mentally or strategically
• Action – What they did differently
• Outcome – Measurable or observable results
• Identity – Who they are now
• Invitation – Why this matters to the audience

Writing Style:
• Write like a human telling a real experience
• Use short to medium sentences
• Mix logic + emotion
• Avoid marketing clichés, buzzwords, and exaggerated claims.
• No emojis or hashtags unless requested.
• Clarity over hype. Specificity over vagueness.

Return your response in JSON format matching the schema provided.`;

export const generateNarrative = async (
  answers: DiscoveryAnswers,
  format: OutputFormat,
  tone?: RefinementTone
): Promise<StoryResult> => {
  const prompt = `
    Context:
    - Audience: ${answers.audience}
    - Goal: ${answers.goal}
    - Character: ${answers.character}
    - Stage: ${answers.stage}
    - Struggle: ${answers.struggle}
    - Turning Point: ${answers.turningPoint}
    - Strengths: ${answers.strengths}
    - Desired Outcome: ${answers.outcome}
    - Format Requested: ${format}
    ${tone ? `- Requested Tone Refinement: ${tone}` : ""}

    Generate the story based on the Elite Narrative Strategist personas and framework.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.STRING, description: "The generated story narrative content." },
          insights: {
            type: Type.OBJECT,
            properties: {
              positioning: { type: Type.STRING },
              hooks: { type: Type.ARRAY, items: { type: Type.STRING } },
              themes: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestion: { type: Type.STRING }
            },
            required: ["positioning", "hooks", "themes", "suggestion"]
          }
        },
        required: ["content", "insights"]
      }
    }
  });

  const result = JSON.parse(response.text || "{}");
  return result;
};
