import { NextRequest, NextResponse } from "next/server";
import { AIDesignLogoGenerate } from "@/configs/Aimodels";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import Replicate from "replicate";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  const { prompt, email, title, desc, userCredits } = await req.json();

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

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

    const input = {
      prompt: AiPromptResult.text,
      go_fast: true,
      megapixels: "1",
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "png",
      output_quality: 80,
      num_inference_steps: 4,
    };

    const response: any = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input,
      }
    );

    console.log("Response", response);
    console.log("Response0", response[0]);

    console.log("URL011", response[0].url());

    console.log("URL011", response[0].url().href); //=> "http://example.com"
    //=> "http://example.com"

    const imageAIUrl = response[0].url().href;
    let cleanedImageUrl = imageAIUrl;
    try {
      const uploadResult = await cloudinary.uploader.upload(imageAIUrl, {
        transformation: [
          { effect: "upscale" },
          { effect: "background_removal" },
        ],
      });
      cleanedImageUrl = uploadResult.secure_url;
    } catch (err) {
      console.error("Cloudinary background removal error:", err);
    }
    // const imageAIUrl = response.data.output[0];

    try {
      const docRef = doc(db, "users", email);

      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: cleanedImageUrl,
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
    // return NextResponse.json(response);
    return NextResponse.json({ image: cleanedImageUrl });
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
