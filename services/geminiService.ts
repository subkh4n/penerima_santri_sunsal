import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY || "" });

export const generateAssistantResponse = async (
  prompt: string,
  history: { role: "user" | "model"; text: string }[]
) => {
  const model = "gemini-3-flash-preview";

  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `You are an AI assistant for Yayasan Sunniyah Salafiyah, an Islamic foundation in Pasuruan, Indonesia. 
      You help prospective students, parents, and existing members with information about enrollment, academic programs, and the foundation's history. 
      The current academic year is 2026-2027. 
      Be helpful, polite, and use a friendly tone (Indonesian language preferred).
      Foundation stats: 2,500+ Active Students, 50+ Years Established, 100+ Teachers, 12 Branches.
      If you don't know something specifically, suggest they contact the foundation directly via the contact buttons.`,
    },
  });

  // Since we use the newer SDK, we convert our simplified history to contents for first message if needed,
  // or use chat.sendMessage if we want to maintain history natively.
  // For simplicity and matching the SDK guidelines:
  try {
    const response = await chat.sendMessage({ message: prompt });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.";
  }
};
