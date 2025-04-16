import { NextRequest, NextResponse } from "next/server";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const AiPromptResult = await AIDesignLogoGenerate.sendMessage({
      message: prompt,
    });
    const AiPrompt = JSON.parse(AiPromptResult.text);

    const response = await axios.post(
      "https://fal.run/fal-ai/flux/schnell",
      AiPrompt,
      {
        headers: {
          // Authorization: "Bearer " + process.env.HUGGING_FACE_API,
          Authorization: "Key " + process.env.FAL_API_KEY,

          "Content-Type": "application/json",
          // "Content-Type": "text/plain",
        },
        responseType: "arraybuffer",
      }
    );

    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");

    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    console.log(base64ImageWithMime);
    // return NextResponse.json(AiPrompt);
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to generate logo", details: error.message },
      { status: 500 }
    );
  }
}
