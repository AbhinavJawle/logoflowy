import { NextResponse } from "next/server";
import { generateAIResponse } from "@/configs/Aimodels";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await generateAIResponse(prompt);
    return NextResponse.json(JSON.parse(result));
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
