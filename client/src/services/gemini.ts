import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.REACT_APP_VITE_GEMINI_API_KEY || '');

export const getAIResponse = async (prompt: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
};
