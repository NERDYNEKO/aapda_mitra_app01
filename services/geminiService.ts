
import { GoogleGenAI } from "@google/genai";
// FIX: Import DisasterType to be used in the new generateSurvivalGuide function.
import { ChatMessage, DisasterType } from '../types';

// Initialize the Google Gemini API client.
// The API key is sourced from the environment variable `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-2.5-flash';

/**
 * Gets a response from the chatbot AI based on the conversation history and a new message.
 * @param history An array of previous chat messages.
 * @param newMessage The new message from the user.
 * @returns A promise that resolves to the chatbot's string response.
 */
export const getChatbotResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    const fullPrompt = [
        ...history.map(msg => `${msg.sender}: ${msg.text}`),
        `user: ${newMessage}`
    ].join('\n');

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: fullPrompt,
            config: {
                systemInstruction: "You are 'Aapda Mitra', an AI assistant focused on disaster preparedness and response. Your goal is to provide clear, concise, and helpful information. You must not provide medical advice. If asked for medical advice, you must direct the user to consult a medical professional or contact emergency services.",
                temperature: 0.7,
            }
        });
        return response.text;
    } catch (error) {
        console.error('Error getting chatbot response:', error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }
}

// FIX: Add generateSurvivalGuide function to fetch survival guides from the Gemini API.
/**
 * Generates a survival guide for a specific disaster type using the Gemini API.
 * @param disasterType The type of disaster to generate a guide for.
 * @returns A promise that resolves to the survival guide as a markdown-formatted string.
 */
export const generateSurvivalGuide = async (disasterType: DisasterType): Promise<string> => {
    const prompt = `Create a comprehensive survival guide for a ${disasterType}. 
    The guide should be practical, easy to understand, and provide actionable steps. 
    Format the response in markdown. 
    Use headings for different sections like 'Before the ${disasterType}', 'During the ${disasterType}', and 'After the ${disasterType}'. 
    Use bullet points for lists of items or actions. 
    Make sure the information is clear and concise.`;

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                systemInstruction: "You are an expert in disaster preparedness and safety. Your goal is to provide life-saving information in a clear and structured format.",
                temperature: 0.5,
            }
        });
        return response.text;
    } catch (error) {
        console.error(`Error generating survival guide for ${disasterType}:`, error);
        throw new Error('Failed to generate the survival guide. Please try again later.');
    }
};
