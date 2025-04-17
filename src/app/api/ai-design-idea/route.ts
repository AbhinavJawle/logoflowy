import { NextResponse } from "next/server";
import { AIDesignIdeaGenerate } from "@/configs/Aimodels";

import type { NextRequest } from "next/server";
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { prompt } = await req.json();

  try {
    const result = await AIDesignIdeaGenerate.sendMessage({
      message: prompt,
    });
    if (!result.text || typeof result.text !== "string") {
      return NextResponse.json({ error: "AI service did not return a valid result." }, { status: 500 });
    }
    return NextResponse.json(JSON.parse(result.text));
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
