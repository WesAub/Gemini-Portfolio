
import { GoogleGenAI } from "@google/genai";

// Safe access for browser environments
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env?.API_KEY) || "";
  } catch {
    return "";
  }
};

export const generateProjectDescription = async (title: string, category: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing in browser context.");
    return "API key not found. Please add a description manually or check server configuration.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a sophisticated, minimalist, 2-sentence description for a professional design portfolio project. 
      Title: "${title}". 
      Category: "${category}". 
      Tone: Objective, Swiss-style, Elegant.`,
    });
    
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating description with AI.";
  }
};
