import { NextResponse } from "next/server";
import { AIDesignIdeaGenerate } from "@/configs/Aimodels";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await AIDesignIdeaGenerate.sendMessage({
      message: prompt,
    });
    return NextResponse.json(JSON.parse(result.text));
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
