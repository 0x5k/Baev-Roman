import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY is not defined in the environment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

export const geminiService = {
  async chat(model: string, systemInstruction: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: history.map(h => ({ role: h.role, parts: h.parts })),
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
        },
      });

      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  async streamChat(model: string, systemInstruction: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], onChunk: (text: string) => void) {
    try {
      const response = await ai.models.generateContentStream({
        model: model,
        contents: history.map(h => ({ role: h.role, parts: h.parts })),
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      for await (const chunk of response) {
        if (chunk.text) {
          onChunk(chunk.text);
        }
      }
    } catch (error) {
      console.error("Gemini Streaming API Error:", error);
      throw error;
    }
  }
};
