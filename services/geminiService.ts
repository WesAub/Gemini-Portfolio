import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const generateProjectDescription = async (title: string, category: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "Gemini API key missing. Please provide a description manually.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a sophisticated, minimalist, 2-sentence description for a design portfolio project. 
      Title: "${title}". 
      Category: "${category}". 
      Style: Swiss Design, Objective, Clean.`,
    });
    
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating description.";
  }
};