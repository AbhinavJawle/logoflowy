// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

const modelConfig = {
  // Controls randomness: Lower values are more deterministic,
  // higher values are more creative.
  temperature: 0.9,
  // Maximum number of output tokens
  maxOutputTokens: 2048,
};

const modelName = "gemini-1.5-flash"; // Or another model you prefer

const model = genAI.getGenerativeModel({
  model: modelName,
  generationConfig: modelConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
});

/**
 * Generates AI content based on the provided prompt.
 * @param prompt The user's input prompt.
 * @returns A promise that resolves with the AI's response text.
 */
export async function generateAIResponse(prompt: string): Promise<string> {
  const contents: Content[] = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  try {
    const result = await model.generateContent({
      contents: contents,
      config: { responseMimeType: "application/json" }, // If you need JSON
    });
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
}

// Example usage (can be removed or kept for testing):
// async function testGeneration() {
//   try {
//     const responseText = await generateAIResponse("Write a short story about a magic backpack.");
//     console.log("AI Response:", responseText);
//   } catch (error) {
//     console.error(error);
//   }
// }
// testGeneration();
