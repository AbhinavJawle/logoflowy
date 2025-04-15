import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export const AIDesignIdeaGenerate = ai.chats.create({
  model: "gemini-2.0-flash-exp-image-generation",
  config: {
    temperature: 1.45,
    responseModalities: ["image", "text"],
    responseMimeType: "text/plain",
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

export const AIDesignLogoGenerate = ai.chats.create({
  model: "gemini-2.0-flash-exp-image-generation",
  config: {
    temperature: 1.45,
    responseModalities: ["image", "text"],
    responseMimeType: "text/plain",
  },

  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a text prompt to create Logo for Logo Title/Brand name : sdg,with description: sdg, with Color combination of Sunset Warmth, also include the Retro banner with 'SDG' and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
            "prompt": "Generate a vintage-style logo for 'SDG'. The logo should feature a retro banner prominently displaying 'SDG' in bold, classic typography. Incorporate an icon design that evokes the warmth of a sunset, using a color combination of oranges, yellows, and soft reds. The overall aesthetic should be hand-drawn and artistic, with intricate details characteristic of vintage logo designs. The design should feel versatile and suitable for a variety of potential brand applications. Referencing vintage logo designs with both text and icon elements is crucial."
          }`,
        },
      ],
    },
  ],
});
