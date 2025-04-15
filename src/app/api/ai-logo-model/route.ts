import { NextRequest, NextResponse } from "next/server";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const AiPromptResult = await AIDesignLogoGenerate.sendMessage({
      message: prompt,
    });
    const AiPrompt = JSON.parse(AiPromptResult.text).prompt;
    return NextResponse.json(AiPrompt);
  } catch (error) {}
}
