import { NextRequest, NextResponse } from "next/server";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export async function POST(req: NextRequest) {
  const { prompt, email, title, desc, userCredits } = await req.json();

  try {
    const AiPromptResult = await AIDesignLogoGenerate.sendMessage({
      message: prompt,
    });
    if (!AiPromptResult.text) {
      return NextResponse.json(
        { error: "AI response text is undefined" },
        { status: 500 }
      );
    }
    const AiPrompt = JSON.parse(AiPromptResult.text);

    const response = await axios.post(
      "https://fal.run/fal-ai/flux/schnell",
      // "https://fal.run/fal-ai/recraft-20b",
      // "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
      AiPrompt,
      {
        headers: {
          // Authorization: "Bearer " + process.env.HUGGING_FACE_API,
          // Authorization: "Key " + process.env.FAL_API_KEY,
          Authorization: "Bearer " + process.env.REPLICATE_API_TOKEN,

          "Content-Type": "application/json",
        },
      }
    );

    const imageAIUrl = response.data.images[0].url;
    // const imageAIUrl = response.data.output[0];

    try {
      const docRef = doc(db, "users", email);

      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: imageAIUrl,
        title: title,
        desc: desc,
      });

      await updateDoc(docRef, {
        credits: Number(userCredits) - 1,
      });
    } catch (error) {
      console.log(error);
    }
    // return NextResponse.json(AiPrompt);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return NextResponse.json(
      { error: "Failed to generate logo", details: errorMessage },
      { status: 500 }
    );
  }
}
