import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "GOOGLE_API_KEY" });
export const AIDesignIdeaGenerate = ai.chats.create({
  model: "gemini-2.0-flash-exp-image-generation",
  config: {
    temperature: 1.45,
    responseModalities: ["image", "text", "json"],
    responseMimeType: "application/json",
  },

  history: [
    {
      role: "user",
      parts: [
        {
          text: "Based on Logo of type Minimalists And Elegants Logos Generate a text prompt to create Logo for Logo title/Brand name : Kaffee with decription: A coffee company and refering to prompt: Create a sophisticated and elegant logo design that is inspired by nature and vintage aesthetics. The logo should incorporate elements of symbolism, intricate details, and a touch of mystery. Use a combination of typography, line art, and subtle color palettes to create a timeless and visually striking design. The logo should convey a sense of luxury, tradition, and quality.. Give me 6/7 Suggestion of logo idea s(each idea with maximum 4-5 words), Result in JSON format only ideas field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
            "ideas": [
                "Elegant leaf coffee bean",
                "Vintage key with coffee steam",
                "Monogram with botanical detail",
                "Minimalist mountain coffee cup",
                "Intricate swirling bean design",
                "Subtle coffee plant silhouette",
                "Abstract coffee wave symbol"
            ]}`,
        },
      ],
    },
  ],
});
