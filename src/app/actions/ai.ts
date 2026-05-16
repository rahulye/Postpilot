"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function generateCaption(prompt: string, platform: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = `Generate a high-engaging social media caption for ${platform} based on this prompt: "${prompt}". 
    Make it punchy, include relevant emojis, and keep it within ${platform === 'x' ? '280' : '2000'} characters. 
    Do not include hashtags in the caption itself.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return { success: true, data: response.text().trim() };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { success: false, error: "Failed to generate caption" };
  }
}

export async function suggestHashtags(content: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const fullPrompt = `Suggest 10-15 relevant and trending hashtags for the following social media post: "${content}". 
    Return only the hashtags separated by spaces.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return { success: true, data: response.text().trim() };
  } catch (error) {
    console.error("Hashtag Suggestion Error:", error);
    return { success: false, error: "Failed to suggest hashtags" };
  }
}
